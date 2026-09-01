import type { APIGatewayProxyEventV2 } from "aws-lambda";
import {
  cjFulfillOrderSchema,
  cjFreightQuoteSchema,
  cjImportHalloweenSchema,
  cjImportProductsSchema,
  cjSaveApiKeySchema,
  cjSearchQuerySchema,
  VENDOR_CJ_DROPSHIPPING,
} from "@halloweenready/shared";
import { requireAdmin } from "../lib/auth";
import { badGateway, badRequest, forbidden, ok, serverError } from "../lib/response";
import {
  CjApiError,
  cjFreightCalculate,
  cjGetBalance,
  cjGetCategories,
  cjGetProduct,
  cjListMyProducts,
  cjListOrders,
  cjListProductsV2,
  cjSetWebhook,
  cjTrackInfo,
  cjWarehouseList,
  flattenListV2,
  getCjConnectionStatus,
  saveCjApiKey,
} from "../lib/cj-dropshipping";
import { catalogPreviewFromList, importCjProducts } from "../lib/cj-import";
import { fulfillOrderWithCj } from "../lib/cj-fulfill";

function handleCjError(err: unknown) {
  if (err instanceof CjApiError) {
    return badGateway(err.message);
  }
  return serverError(err instanceof Error ? err.message : "CJ request failed");
}

export async function getCjStatus(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  try {
    const status = await getCjConnectionStatus();
    return ok({ ...status, vendorSlug: VENDOR_CJ_DROPSHIPPING });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function saveCjKey(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  const parsed = cjSaveApiKeySchema.safeParse(JSON.parse(event.body ?? "{}"));
  if (!parsed.success) return badRequest(parsed.error.message);
  try {
    await saveCjApiKey(parsed.data.apiKey);
    const status = await getCjConnectionStatus();
    return ok({ saved: true, ...status });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function listCjCategories(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  try {
    const data = await cjGetCategories();
    return ok({ categories: data });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function searchCjProducts(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  const parsed = cjSearchQuerySchema.safeParse(event.queryStringParameters ?? {});
  if (!parsed.success) return badRequest(parsed.error.message);
  try {
    const data = await cjListProductsV2({
      keyWord: parsed.data.keyWord || "halloween",
      page: parsed.data.page,
      size: parsed.data.size,
      categoryId: parsed.data.categoryId,
      countryCode: parsed.data.countryCode,
    });
    const products = flattenListV2(data).map(catalogPreviewFromList);
    return ok({
      products,
      page: data.pageNumber ?? parsed.data.page ?? 1,
      pageSize: data.pageSize ?? parsed.data.size ?? 20,
      totalRecords: data.totalRecords ?? products.length,
      totalPages: data.totalPages ?? 1,
    });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function getCjProduct(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  const pid = event.pathParameters?.pid;
  if (!pid) return badRequest("pid required");
  try {
    const product = await cjGetProduct(pid);
    return ok({ product });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function importCjCatalog(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  const parsed = cjImportProductsSchema.safeParse(JSON.parse(event.body ?? "{}"));
  if (!parsed.success) return badRequest(parsed.error.message);
  try {
    const result = await importCjProducts(parsed.data.pids, {
      categorySlug: parsed.data.categorySlug,
      published: parsed.data.published,
      addToMyProduct: parsed.data.addToMyProduct,
    });
    return ok(result);
  } catch (err) {
    return handleCjError(err);
  }
}

export async function importHalloweenCatalog(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  const parsed = cjImportHalloweenSchema.safeParse(JSON.parse(event.body ?? "{}"));
  if (!parsed.success) return badRequest(parsed.error.message);
  try {
    const data = await cjListProductsV2({
      keyWord: parsed.data.keyWord || "halloween",
      page: parsed.data.page,
      size: parsed.data.size,
    });
    const pids = flattenListV2(data)
      .map((row) => row.id)
      .filter((id): id is string => Boolean(id));
    const result = await importCjProducts(pids, {
      categorySlug: parsed.data.categorySlug,
      published: parsed.data.published,
      addToMyProduct: parsed.data.addToMyProduct,
    });
    return ok({
      ...result,
      page: data.pageNumber ?? parsed.data.page,
      totalPages: data.totalPages ?? 1,
      totalRecords: data.totalRecords ?? pids.length,
      searched: pids.length,
    });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function listCjMyProducts(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  try {
    const q = event.queryStringParameters ?? {};
    const data = await cjListMyProducts({
      pageNum: q.page ? Number(q.page) : 1,
      pageSize: q.size ? Number(q.size) : 20,
      keyword: q.keyword,
    });
    return ok({ data });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function listCjWarehouses(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  try {
    const data = await cjWarehouseList();
    return ok({ warehouses: data });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function getCjBalance(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  try {
    const data = await cjGetBalance();
    return ok({ balance: data });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function quoteCjFreight(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  const parsed = cjFreightQuoteSchema.safeParse(JSON.parse(event.body ?? "{}"));
  if (!parsed.success) return badRequest(parsed.error.message);
  try {
    const data = await cjFreightCalculate(parsed.data);
    return ok({ quotes: data });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function listCjOrders(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  try {
    const q = event.queryStringParameters ?? {};
    const data = await cjListOrders({
      pageNum: q.page ? Number(q.page) : 1,
      pageSize: q.size ? Number(q.size) : 20,
    });
    return ok({ data });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function fulfillCjOrder(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  const parsed = cjFulfillOrderSchema.safeParse({
    ...JSON.parse(event.body ?? "{}"),
    orderId: event.pathParameters?.orderId,
  });
  if (!parsed.success) return badRequest(parsed.error.message);
  try {
    const result = await fulfillOrderWithCj(parsed.data.orderId, {
      payType: parsed.data.payType,
      logisticName: parsed.data.logisticName,
      fromCountryCode: parsed.data.fromCountryCode,
    });
    return ok(result);
  } catch (err) {
    return handleCjError(err);
  }
}

export async function getCjTracking(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  const trackNumber = event.queryStringParameters?.trackNumber;
  if (!trackNumber) return badRequest("trackNumber required");
  try {
    const data = await cjTrackInfo(trackNumber);
    return ok({ tracking: data });
  } catch (err) {
    return handleCjError(err);
  }
}

export async function enableCjWebhook(event: APIGatewayProxyEventV2) {
  if (!requireAdmin(event)) return forbidden();
  const site = (process.env.SITE_URL || "https://www.halloweenready.com").replace(/\/$/, "");
  const apiBase = (process.env.PUBLIC_API_URL || process.env.LOCAL_API_URL || "").replace(/\/$/, "");
  const callback =
    JSON.parse(event.body ?? "{}").callbackUrl ||
    (apiBase ? `${apiBase}/webhooks/cj` : `${site}/api/webhooks/cj`);
  try {
    await cjSetWebhook(callback);
    return ok({ enabled: true, callbackUrl: callback });
  } catch (err) {
    return handleCjError(err);
  }
}

/** Public CJ webhook — product/stock/order/logistics notifications. */
export async function cjWebhook(event: APIGatewayProxyEventV2) {
  try {
    const payload = JSON.parse(event.body ?? "{}") as Record<string, unknown>;
    console.info("CJ webhook", {
      type: payload.type ?? payload.businessType ?? payload.msgType,
      orderId: payload.orderId,
      pid: payload.pid ?? payload.productId,
    });
  } catch {
    console.warn("CJ webhook: invalid JSON");
  }
  return ok({ received: true });
}
