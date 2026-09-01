"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ORANGE_COUNTY_LIST_MARKUP, ORANGE_COUNTY_SALE_MARKUP, isCjDropshippingProduct, type Product } from "@halloweenready/shared";
import { useApiClient } from "@/lib/auth-context";
import { formatMoney } from "@/lib/admin-utils";

/** Stay under API Gateway's ~29s limit (CJ is 1 request/second). */
const IMPORT_BATCH_SIZE = 4;

function humanizeError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  try {
    const parsed = JSON.parse(raw) as Array<{ message?: string }>;
    if (Array.isArray(parsed) && parsed.some((item) => item?.message)) {
      return parsed.map((item) => item.message).filter(Boolean).join("; ");
    }
  } catch {
    /* not JSON */
  }
  return raw;
}

function chunkPids(pids: string[], size: number) {
  const batches: string[][] = [];
  for (let i = 0; i < pids.length; i += size) batches.push(pids.slice(i, i + size));
  return batches;
}

type Tab = "catalog" | "import" | "pricing" | "orders" | "settings";

type ConnectionStatus = {
  configured: boolean;
  connected: boolean;
  apiKeyHint?: string;
  accessTokenExpiryDate?: string;
  message?: string;
};

type CatalogRow = {
  pid?: string;
  name?: string;
  sku?: string;
  image?: string;
  price?: number;
  compareAtPrice?: number;
  vendorCost?: number;
  inventory?: number;
  categorySlug?: string;
  categoryName?: string;
};

export default function AdminCjDropshippingPage() {
  const api = useApiClient();
  const [tab, setTab] = useState<Tab>("catalog");
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [keyword, setKeyword] = useState("halloween");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<CatalogRow[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [hideUnpriced, setHideUnpriced] = useState(false);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState<unknown>(null);
  const [cjOrders, setCjOrders] = useState<unknown>(null);
  const [fulfillOrderId, setFulfillOrderId] = useState("");
  const [costRows, setCostRows] = useState<Product[]>([]);

  const loadStatus = useCallback(async () => {
    try {
      const data = await api<ConnectionStatus>("/admin/cj/status");
      setStatus(data);
    } catch (err) {
      setStatus({
        configured: false,
        connected: false,
        message: err instanceof Error ? err.message : "Could not load CJ status",
      });
    }
  }, [api]);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  const visibleProducts = useMemo(
    () => (hideUnpriced ? products.filter((p) => typeof p.price === "number") : products),
    [hideUnpriced, products]
  );
  const pagePids = useMemo(
    () => visibleProducts.map((p) => p.pid).filter((pid): pid is string => Boolean(pid)),
    [visibleProducts]
  );
  const selectedPids = useMemo(
    () => Object.entries(selected).filter(([, on]) => on).map(([pid]) => pid),
    [selected]
  );
  const allPageSelected = pagePids.length > 0 && pagePids.every((pid) => selected[pid]);

  const search = async (nextPage = 1, keepSelection = false) => {
    setBusy("search");
    setMessage("");
    try {
      const data = await api<{
        products: CatalogRow[];
        page: number;
        totalPages: number;
        totalRecords: number;
      }>(
        `/admin/cj/products?keyWord=${encodeURIComponent(keyword)}&page=${nextPage}&size=20`
      );
      setProducts(data.products);
      setPage(data.page);
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalRecords);
      if (!keepSelection) setSelected({});
    } catch (err) {
      setMessage(humanizeError(err) || "Search failed");
    } finally {
      setBusy("");
    }
  };

  const toggleSelectAllPage = () => {
    setSelected((current) => {
      const next = { ...current };
      const select = !allPageSelected;
      for (const pid of pagePids) next[pid] = select;
      return next;
    });
  };

  const importSelected = async () => {
    const pids = selectedPids;
    if (!pids.length) {
      setMessage("Select at least one product");
      return;
    }
    setBusy("import");
    setMessage("");
    const batches = chunkPids(pids, IMPORT_BATCH_SIZE);
    let imported = 0;
    const failures: string[] = [];
    try {
      for (let i = 0; i < batches.length; i++) {
        setMessage(`Importing batch ${i + 1} of ${batches.length} (${pids.length} selected)…`);
        const data = await api<{
          imported: unknown[];
          errors: Array<{ pid: string; error: string }>;
        }>("/admin/cj/products/import", {
          method: "POST",
          body: JSON.stringify({ pids: batches[i], published: true, addToMyProduct: false }),
        });
        imported += data.imported.length;
        for (const row of data.errors) {
          failures.push(`${row.pid}: ${row.error}`);
        }
      }
      setSelected((current) => {
        const next = { ...current };
        for (const pid of pids) next[pid] = false;
        return next;
      });
      setMessage(
        `Imported ${imported} product(s)${
          failures.length ? `; ${failures.length} failed. ${failures.slice(0, 3).join("; ")}` : "."
        }`
      );
    } catch (err) {
      setMessage(
        imported
          ? `Imported ${imported} then stopped: ${humanizeError(err)}`
          : humanizeError(err) || "Import failed"
      );
    } finally {
      setBusy("");
    }
  };

  const importHalloweenPage = async (nextPage = 1) => {
    setBusy("halloween");
    setMessage("");
    try {
      const data = await api<{
        imported: unknown[];
        errors: Array<{ pid: string; error: string }>;
        page: number;
        totalPages: number;
        searched: number;
      }>("/admin/cj/products/import-halloween", {
        method: "POST",
        body: JSON.stringify({
          page: nextPage,
          size: 8,
          keyWord: keyword || "halloween",
          published: true,
          addToMyProduct: false,
        }),
      });
      setPage(data.page);
      setTotalPages(data.totalPages);
      setMessage(
        `Imported ${data.imported.length} of ${data.searched} Halloween products from page ${data.page}. ${data.errors.length ? `${data.errors.length} failed. ` : ""}Run again with the next page to continue.`
      );
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Halloween import failed");
    } finally {
      setBusy("");
    }
  };

  const saveKey = async () => {
    setBusy("key");
    setMessage("");
    try {
      const data = await api<ConnectionStatus & { saved?: boolean }>("/admin/cj/api-key", {
        method: "PUT",
        body: JSON.stringify({ apiKey }),
      });
      setApiKey("");
      setStatus(data);
      setMessage(data.connected ? "API key saved and connected." : data.message || "Saved, but not connected yet.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not save API key");
    } finally {
      setBusy("");
    }
  };

  const loadOps = async () => {
    setBusy("ops");
    try {
      const [bal, orders] = await Promise.all([
        api<{ balance: unknown }>("/admin/cj/balance").catch(() => ({ balance: null })),
        api<{ data: unknown }>("/admin/cj/orders").catch(() => ({ data: null })),
      ]);
      setBalance(bal.balance);
      setCjOrders(orders.data);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not load CJ orders");
    } finally {
      setBusy("");
    }
  };

  const fulfill = async () => {
    if (!fulfillOrderId.trim()) return;
    setBusy("fulfill");
    setMessage("");
    try {
      const data = await api<{ ok: boolean; message: string; cjPayUrl?: string }>(
        `/admin/cj/orders/${encodeURIComponent(fulfillOrderId.trim())}/fulfill`,
        { method: "POST", body: JSON.stringify({ payType: 3 }) }
      );
      setMessage(data.message + (data.cjPayUrl ? ` Pay URL: ${data.cjPayUrl}` : ""));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Fulfill failed");
    } finally {
      setBusy("");
    }
  };

  const loadCosts = useCallback(async () => {
    setBusy("pricing");
    try {
      const purged = await api<{ deleted: number }>("/admin/products/purge-samples", { method: "POST" }).catch(
        () => ({ deleted: 0 })
      );
      const data = await api<{ products: Product[] }>("/admin/products");
      setCostRows(data.products.filter(isCjDropshippingProduct));
      if (purged.deleted > 0) {
        setMessage(`Removed ${purged.deleted} sample product(s). Storefront now shows CJ imports only.`);
      }
    } catch (err) {
      setMessage(humanizeError(err) || "Could not load CJ cost data");
    } finally {
      setBusy("");
    }
  }, [api]);

  const costSummary = useMemo(() => {
    const withCost = costRows.filter((p) => typeof p.vendorCost === "number" && p.vendorCost > 0);
    const cjCost = withCost.reduce((sum, p) => sum + (p.vendorCost ?? 0), 0);
    const sale = withCost.reduce((sum, p) => sum + p.price, 0);
    return {
      count: costRows.length,
      priced: withCost.length,
      cjCost,
      sale,
      added: sale - cjCost,
      marginPct: sale > 0 ? ((sale - cjCost) / sale) * 100 : 0,
    };
  }, [costRows]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "catalog", label: "CJ catalog" },
    { id: "import", label: "Import Halloween" },
    { id: "pricing", label: "Cost & pricing" },
    { id: "orders", label: "Orders & freight" },
    { id: "settings", label: "API connection" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">CJ Dropshipping</h1>
          <p className="text-sm text-slate-600 mt-1">
            Search CJ’s catalog, import Halloween products to the storefront, and fulfill paid orders through CJ.
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
            status?.connected
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
          }`}
        >
          {status?.connected ? "Connected" : status?.configured ? "Key set, not connected" : "API key required"}
        </span>
      </div>

      {status?.message && !status.connected && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {status.message}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTab(t.id);
              if (t.id === "orders") void loadOps();
              if (t.id === "pricing") void loadCosts();
            }}
            className={`text-sm px-3 py-2 rounded-lg border ${
              tab === t.id ? "bg-nav text-white border-nav" : "border-slate-300 hover:bg-slate-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {message && <p className="mb-4 text-sm text-slate-700">{message}</p>}

      {tab === "settings" && (
        <section className="max-w-xl space-y-4">
          <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-2">
            <li>Log in at cjdropshipping.com (email/password is only for the website, not the API).</li>
            <li>Left nav → Apps → Install App → Others → install <strong>API</strong>.</li>
            <li>My CJ → Authorization → API → Add API → type <strong>API Key</strong>.</li>
            <li>Copy the key and paste it below. We exchange it for an access token automatically.</li>
          </ol>
          {status?.apiKeyHint && (
            <p className="text-sm text-slate-500">Current key: {status.apiKeyHint}</p>
          )}
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste CJ API Key"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => void saveKey()}
            disabled={!apiKey || busy === "key"}
            className="btn-cart px-4 py-2 text-sm disabled:opacity-50"
          >
            {busy === "key" ? "Saving…" : "Save API key"}
          </button>
        </section>
      )}

      {tab === "catalog" && (
        <section>
          <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 space-y-1">
            <p>
              <strong>Pricing:</strong> CJ wholesale × {ORANGE_COUNTY_SALE_MARKUP} = your sale price (~50%
              product margin). Compare-at (strikethrough) is × {ORANGE_COUNTY_LIST_MARKUP}. Shipping is
              extra — CJ freight is quoted at checkout.
            </p>
            <p className="text-slate-600">
              Do not import all 6,000 SKUs. Select costumes and décor you want to sell; skip $100+ items
              until you open the CJ listing (those are often large inflatables). Cards with no price still
              import — we pull the variant sell price from CJ’s product API.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm min-w-[16rem]"
              placeholder="Search CJ (try halloween)"
            />
            <button
              type="button"
              onClick={() => void search(1)}
              disabled={busy === "search"}
              className="btn-cart px-4 py-2 text-sm"
            >
              {busy === "search" ? "Searching…" : "Search"}
            </button>
            <button
              type="button"
              onClick={toggleSelectAllPage}
              disabled={!pagePids.length || Boolean(busy)}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50"
            >
              {allPageSelected ? "Clear this page" : "Select all on this page"}
            </button>
            <button
              type="button"
              onClick={() => setSelected({})}
              disabled={!selectedPids.length || Boolean(busy)}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50"
            >
              Clear selection
            </button>
            <button
              type="button"
              onClick={() => void importSelected()}
              disabled={busy === "import" || !selectedPids.length}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-50"
            >
              {busy === "import"
                ? "Importing…"
                : `Import selected${selectedPids.length ? ` (${selectedPids.length})` : ""}`}
            </button>
            <label className="flex items-center gap-2 text-sm text-slate-600 ml-1">
              <input
                type="checkbox"
                checked={hideUnpriced}
                onChange={(e) => setHideUnpriced(e.target.checked)}
              />
              Hide items without a listed price
            </label>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            {totalRecords
              ? `${totalRecords} results · page ${page} of ${totalPages} · ${selectedPids.length} selected (kept when you change pages)`
              : "Search the CJ catalog, then import into HalloweenReady."}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {visibleProducts.map((p) => {
              const pid = p.pid || "";
              return (
                <label
                  key={pid}
                  className={`border rounded-lg p-2 text-sm cursor-pointer ${
                    selected[pid] ? "border-nav ring-1 ring-nav" : "border-slate-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mb-2"
                    checked={Boolean(selected[pid])}
                    onChange={(e) => setSelected((s) => ({ ...s, [pid]: e.target.checked }))}
                  />
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt="" className="w-full h-32 object-cover rounded mb-2" />
                  ) : (
                    <div className="h-32 bg-slate-100 rounded mb-2" />
                  )}
                  <p className="font-medium line-clamp-2">{p.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{p.categoryName || p.categorySlug}</p>
                  {typeof p.price === "number" ? (
                    <div className="mt-1">
                      <p className="text-sm font-semibold">{formatMoney(p.price, "USD")} sale</p>
                      {typeof p.vendorCost === "number" && (
                        <p className="text-xs text-slate-500">
                          CJ {formatMoney(p.vendorCost, "USD")}
                          {typeof p.compareAtPrice === "number"
                            ? ` · list ${formatMoney(p.compareAtPrice, "USD")}`
                            : ""}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-amber-700 mt-1">Price on import</p>
                  )}
                </label>
              );
            })}
          </div>
          {totalPages > 1 && (
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                disabled={page <= 1 || Boolean(busy)}
                onClick={() => void search(page - 1, true)}
                className="px-3 py-1.5 text-sm border rounded-lg"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages || Boolean(busy)}
                onClick={() => void search(page + 1, true)}
                className="px-3 py-1.5 text-sm border rounded-lg"
              >
                Next
              </button>
            </div>
          )}
        </section>
      )}

      {tab === "import" && (
        <section className="max-w-xl space-y-3">
          <p className="text-sm text-slate-600">
            Imports one page of CJ Halloween products into your live catalog (about 8 SKUs per run because CJ
            allows 1 request/second). Repeat to pull the next page. Prefer <strong>Select all on this page</strong> on
            the CJ catalog tab when you want to review prices first.
          </p>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => void importHalloweenPage(page)}
            disabled={busy === "halloween"}
            className="btn-cart px-4 py-2 text-sm"
          >
            {busy === "halloween" ? "Importing…" : `Import Halloween page ${page}`}
          </button>
          {totalPages > 1 && (
            <button
              type="button"
              className="block text-sm underline"
              onClick={() => void importHalloweenPage(page + 1)}
            >
              Import next page
            </button>
          )}
        </section>
      )}

      )}

      {tab === "pricing" && (
        <section className="space-y-4">
          <p className="text-sm text-slate-600">
            What CJ charges you (wholesale) versus what customers pay on HalloweenReady. Sale price is{" "}
            {ORANGE_COUNTY_SALE_MARKUP}× CJ cost (~50% product margin). List/compare-at is {ORANGE_COUNTY_LIST_MARKUP}×.
            Shipping is extra.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="border rounded-lg p-4 bg-slate-50">
              <p className="text-xs text-slate-500 uppercase tracking-wide">CJ products on site</p>
              <p className="text-2xl font-bold mt-1">{costSummary.count}</p>
            </div>
            <div className="border rounded-lg p-4 bg-slate-50">
              <p className="text-xs text-slate-500 uppercase tracking-wide">CJ cost (1 of each)</p>
              <p className="text-2xl font-bold mt-1">{formatMoney(costSummary.cjCost, "USD")}</p>
            </div>
            <div className="border rounded-lg p-4 bg-slate-50">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Customer sale total</p>
              <p className="text-2xl font-bold mt-1">{formatMoney(costSummary.sale, "USD")}</p>
            </div>
            <div className="border rounded-lg p-4 bg-emerald-50 border-emerald-200">
              <p className="text-xs text-emerald-800 uppercase tracking-wide">Markup added</p>
              <p className="text-2xl font-bold mt-1 text-emerald-900">{formatMoney(costSummary.added, "USD")}</p>
              <p className="text-xs text-emerald-800 mt-1">{costSummary.marginPct.toFixed(0)}% margin on sale</p>
            </div>
          </div>
          {busy === "pricing" ? (
            <p className="text-sm text-slate-500">Loading cost sheet…</p>
          ) : (
            <div className="bg-white border rounded-lg overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="py-2 px-3">Product</th>
                    <th className="py-2 px-3">CJ cost (you pay)</th>
                    <th className="py-2 px-3">Sale price (customer)</th>
                    <th className="py-2 px-3">Amount added</th>
                    <th className="py-2 px-3">Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((p) => {
                    const cost = typeof p.vendorCost === "number" ? p.vendorCost : undefined;
                    const added = cost != null ? p.price - cost : undefined;
                    const margin = cost != null && p.price > 0 ? ((p.price - cost) / p.price) * 100 : undefined;
                    return (
                      <tr key={p.slug} className="border-t">
                        <td className="py-2 px-3">
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-slate-400">{p.slug}</div>
                        </td>
                        <td className="py-2 px-3">{cost != null ? formatMoney(cost, "USD") : "—"}</td>
                        <td className="py-2 px-3">
                          {formatMoney(p.price, p.currency)}
                          {p.compareAtPrice ? (
                            <div className="text-xs text-slate-400 line-through">
                              list {formatMoney(p.compareAtPrice, p.currency)}
                            </div>
                          ) : null}
                        </td>
                        <td className="py-2 px-3 font-medium">
                          {added != null ? formatMoney(added, "USD") : "—"}
                        </td>
                        <td className="py-2 px-3">{margin != null ? `${margin.toFixed(0)}%` : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {costRows.length === 0 && (
                <p className="text-sm text-slate-500 p-4">No CJ products imported yet.</p>
              )}
            </div>
          )}
        </section>
      )}

      {tab === "orders" && (
        <section className="space-y-4">
          <div className="flex flex-wrap gap-2 items-end">
            <label className="text-sm">
              HalloweenReady order ID
              <input
                value={fulfillOrderId}
                onChange={(e) => setFulfillOrderId(e.target.value)}
                className="block border rounded-lg px-3 py-2 text-sm min-w-[16rem] mt-1"
                placeholder="UUID or order number"
              />
            </label>
            <button
              type="button"
              onClick={() => void fulfill()}
              disabled={busy === "fulfill"}
              className="btn-cart px-4 py-2 text-sm"
            >
              {busy === "fulfill" ? "Creating…" : "Create CJ order"}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Paid carts with CJ products also create a CJ order automatically (create-only; you still pay from the CJ
            wallet or the returned pay URL).
          </p>
          {balance != null && (
            <pre className="text-xs bg-slate-50 border rounded-lg p-3 overflow-auto">
              {JSON.stringify(balance, null, 2)}
            </pre>
          )}
          {cjOrders != null && (
            <pre className="text-xs bg-slate-50 border rounded-lg p-3 overflow-auto max-h-96">
              {JSON.stringify(cjOrders, null, 2)}
            </pre>
          )}
        </section>
      )}
    </div>
  );
}
