"use strict";
/**
 * Order Confirmed transactional email + WhatsApp copy.
 * Table + inline CSS for Gmail / Outlook / Apple Mail. No emoji.
 * All customer/order values come from the order — nothing is hardcoded.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldSendOrderConfirmedNotification = shouldSendOrderConfirmedNotification;
exports.isOrderConfirmedStatus = isOrderConfirmedStatus;
exports.siteBaseUrl = siteBaseUrl;
exports.formatOrderMoney = formatOrderMoney;
exports.customerFirstName = customerFirstName;
exports.customerFullName = customerFullName;
exports.lineUnitPrice = lineUnitPrice;
exports.lineTotal = lineTotal;
exports.plainProductDescription = plainProductDescription;
exports.orderConfirmedSubject = orderConfirmedSubject;
exports.orderConfirmedPreheader = orderConfirmedPreheader;
exports.buildOrderConfirmedEmailHtml = buildOrderConfirmedEmailHtml;
exports.buildOrderConfirmedEmailText = buildOrderConfirmedEmailText;
exports.buildOrderConfirmedWhatsAppMessage = buildOrderConfirmedWhatsAppMessage;
const order_number_1 = require("./order-number");
const constants_1 = require("../constants");
const image_variants_1 = require("./image-variants");
const image_url_1 = require("./image-url");
const SITE_NAME = "HalloweenReady";
const DEFAULT_SITE = "https://www.halloweenready.com";
const PAGE_BG = "#f3eee6";
const HERO_BG = "#1a0a2e";
const ORANGE = "#ff6b00";
const GOLD = "#f0a500";
const CREAM = "#fff8ef";
const GREEN = "#1f8a4c";
const TEXT = "#2b1d12";
const MUTED = "#6b5e4e";
const LINE = "#efe6d6";
const WHITE = "#ffffff";
const FB_URL = "https://www.facebook.com/halloweenreadyofficial/";
const IG_URL = "https://www.instagram.com/halloweenreadyofficial/";
const PINTEREST_URL = "https://www.pinterest.com/halloweenready/";
const X_URL = "https://x.com/halloweenready";
const SUPPORT_EMAIL = "support@halloweenready.com";
const SUPPORT_PHONE = "+1 (669) 260-3819";
const ORDER_EMAIL = "order@halloweenready.com";
const LOGO = `${DEFAULT_SITE}/logo.png`;
const HERO_DECOR = `${DEFAULT_SITE}/banners/bannerpage1.png`;
/** True when admin moved the order into Confirmed (stored as `accepted`). */
function shouldSendOrderConfirmedNotification(previousStatus, nextStatus) {
    return nextStatus === constants_1.ORDER_STATUS.ACCEPTED && previousStatus !== constants_1.ORDER_STATUS.ACCEPTED;
}
function isOrderConfirmedStatus(status) {
    return status === constants_1.ORDER_STATUS.ACCEPTED;
}
function siteBaseUrl() {
    return (process.env.SITE_URL ?? DEFAULT_SITE).replace(/\/$/, "");
}
function formatOrderMoney(amount, currency) {
    const value = Number.isFinite(amount) ? amount : 0;
    const code = currency === "INR" ? "INR" : "USD";
    try {
        return new Intl.NumberFormat(code === "INR" ? "en-IN" : "en-US", {
            style: "currency",
            currency: code,
            minimumFractionDigits: 2,
        }).format(value);
    }
    catch {
        return code === "USD" ? `$${value.toFixed(2)}` : `${code} ${value.toFixed(2)}`;
    }
}
function customerFirstName(order) {
    const name = order.shippingAddress?.name?.trim();
    if (!name)
        return "there";
    return name.split(/\s+/)[0] ?? "there";
}
function customerFullName(order) {
    return order.shippingAddress?.name?.trim() || "Valued customer";
}
function lineUnitPrice(item) {
    const addon = (item.addons ?? []).reduce((sum, a) => sum + a.price * a.quantity, 0);
    return item.price + addon;
}
function lineTotal(item) {
    return lineUnitPrice(item) * item.quantity;
}
/** Strip HTML and collapse whitespace; optional max length for email snippets. */
function plainProductDescription(raw, max = 160) {
    if (!raw)
        return undefined;
    const text = raw
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/\s+/g, " ")
        .trim();
    if (!text)
        return undefined;
    if (text.length <= max)
        return text;
    const sliced = text.slice(0, max).replace(/\s+\S*$/, "");
    return `${sliced}...`;
}
function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
function escAttr(value) {
    return escapeHtml(value);
}
function absoluteImageUrl(url, site) {
    if (!url?.trim())
        return "";
    const resolved = (0, image_url_1.resolveProductImageUrl)(url.trim());
    if (!resolved)
        return "";
    const withHost = /^https?:\/\//i.test(resolved)
        ? resolved
        : `${site}${resolved.startsWith("/") ? "" : "/"}${resolved}`;
    try {
        return (0, image_variants_1.productImageVariantUrl)(withHost, "thumb");
    }
    catch {
        return withHost;
    }
}
function orderConfirmedSubject(order) {
    const ref = (0, order_number_1.displayOrderRef)(order);
    return `Your Order is Confirmed — ${ref} | ${SITE_NAME}`;
}
function orderConfirmedPreheader(order) {
    const ref = (0, order_number_1.displayOrderRef)(order);
    return `Your ${SITE_NAME} order ${ref} is confirmed. We are preparing it for fulfillment.`;
}
function totals(order) {
    return {
        subtotal: order.subtotal ?? 0,
        shipping: order.shipping ?? 0,
        tax: order.tax ?? 0,
        discount: order.discount ?? 0,
        total: order.total ?? 0,
    };
}
function productRowsHtml(order, site) {
    const currency = order.currency;
    if (!order.items.length) {
        return `
                    <tr>
                      <td style="padding:14px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${MUTED};">
                        Order items will appear on your order page.
                      </td>
                    </tr>`;
    }
    return order.items
        .map((item) => {
        const name = escapeHtml(item.name);
        const desc = item.description ? escapeHtml(item.description) : "";
        const qty = String(item.quantity);
        const unit = formatOrderMoney(lineUnitPrice(item), currency);
        const rowTotal = formatOrderMoney(lineTotal(item), currency);
        const img = absoluteImageUrl(item.image, site);
        const href = item.productSlug ? `${site}/products/${encodeURIComponent(item.productSlug)}` : site;
        const imgCell = img
            ? `<a href="${escAttr(href)}" target="_blank" style="text-decoration:none;">
             <img src="${escAttr(img)}" width="72" height="72" alt="${name}" style="display:block;width:72px;height:72px;object-fit:cover;border:1px solid ${LINE};border-radius:8px;background-color:${CREAM};" />
           </a>`
            : `<div style="width:72px;height:72px;background-color:${CREAM};border:1px solid ${LINE};border-radius:8px;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:72px;color:${ORANGE};text-align:center;">${escapeHtml(item.name.slice(0, 1).toUpperCase())}</div>`;
        const addonLines = (item.addons ?? [])
            .map((a) => {
            const qtyLabel = a.quantity > 1 ? `${a.quantity} x ` : "";
            return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${MUTED};">+ ${escapeHtml(qtyLabel + a.name)}</div>`;
        })
            .join("");
        return `
                    <tr>
                      <td valign="top" style="padding:14px 0;border-bottom:1px solid ${LINE};">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                          <tr>
                            <td valign="top" width="88" style="width:88px;padding-right:14px;">
                              ${imgCell}
                            </td>
                            <td valign="top">
                              <div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:20px;font-weight:bold;color:${TEXT};">${name}</div>
                              ${desc
            ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${MUTED};padding-top:4px;">${desc}</div>`
            : ""}
                              ${addonLines}
                              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:${MUTED};padding-top:8px;">
                                Qty: ${qty} &nbsp;&middot;&nbsp; ${escapeHtml(unit)} each
                              </div>
                            </td>
                            <td valign="top" align="right" width="90" style="width:90px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:20px;font-weight:bold;color:${TEXT};white-space:nowrap;">
                              ${escapeHtml(rowTotal)}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>`;
    })
        .join("");
}
function totalRow(label, value, opts) {
    const color = opts?.accent ? ORANGE : TEXT;
    const weight = opts?.strong ? "bold" : "normal";
    const size = opts?.strong ? "16px" : "14px";
    const padTop = opts?.strong ? "10px" : "4px";
    return `
                    <tr>
                      <td style="padding:${padTop} 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:${size};line-height:20px;font-weight:${weight};color:${opts?.strong ? TEXT : MUTED};">${escapeHtml(label)}</td>
                      <td align="right" style="padding:${padTop} 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:${size};line-height:20px;font-weight:${weight};color:${color};white-space:nowrap;">${escapeHtml(value)}</td>
                    </tr>`;
}
function viewOrderButton(href) {
    const safeHref = escAttr(href);
    return `
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${safeHref}" style="height:48px;v-text-anchor:middle;width:220px;" arcsize="13%" stroke="f" fillcolor="${ORANGE}">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;">View your order</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-- -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 auto;">
                      <tr>
                        <td align="center" bgcolor="${ORANGE}" style="background-color:${ORANGE};border-radius:6px;">
                          <a href="${safeHref}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:20px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px;">
                            View your order
                          </a>
                        </td>
                      </tr>
                    </table>
                    <!--<![endif]-->`;
}
function socialBadge(href, label, bg) {
    return `
                        <td style="padding:0 6px;">
                          <a href="${escAttr(href)}" target="_blank" aria-label="${escapeHtml(label)}" style="text-decoration:none;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                              <tr>
                                <td align="center" valign="middle" bgcolor="${bg}" width="36" height="36" style="width:36px;height:36px;background-color:${bg};border-radius:18px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:36px;font-weight:bold;color:#ffffff;text-align:center;">
                                  ${escapeHtml(label)}
                                </td>
                              </tr>
                            </table>
                          </a>
                        </td>`;
}
function trustCell(title, subtitle) {
    return `
                  <td class="stack-col-25" width="25%" valign="top" style="width:25%;padding:4px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:#24143c;border-radius:8px;">
                      <tr>
                        <td align="center" style="padding:12px 8px;border-top:3px solid ${ORANGE};">
                          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:15px;font-weight:bold;color:#ffffff;padding-bottom:4px;">${escapeHtml(title)}</div>
                          <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:14px;color:#d7dde8;">${escapeHtml(subtitle)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>`;
}
function buildOrderConfirmedEmailHtml(order) {
    const site = siteBaseUrl();
    const ref = (0, order_number_1.displayOrderRef)(order);
    const first = customerFirstName(order);
    const money = (n) => formatOrderMoney(n, order.currency);
    const t = totals(order);
    const orderUrl = `${site}/orders/${encodeURIComponent(order.orderId)}`;
    const discountRow = t.discount > 0
        ? totalRow(order.couponCode ? `Discount (${order.couponCode})` : "Discount", `-${money(t.discount)}`)
        : "";
    const taxRow = t.tax > 0 ? totalRow("Tax", money(t.tax)) : totalRow("Tax", money(t.tax));
    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
  <title>${escapeHtml(orderConfirmedSubject(order))}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style type="text/css">
    table { border-collapse: collapse; }
    td, th, div, p, a, h1, h2, h3, span { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
  <style type="text/css">
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .fluid { width: 100% !important; max-width: 100% !important; height: auto !important; }
      .stack-col { display: block !important; width: 100% !important; max-width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; }
      .stack-col-25 { display: inline-block !important; width: 50% !important; max-width: 50% !important; box-sizing: border-box !important; }
      .mobile-pad { padding-left: 18px !important; padding-right: 18px !important; }
      .hero-title { font-size: 26px !important; line-height: 32px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${PAGE_BG};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
    ${escapeHtml(orderConfirmedPreheader(order))}
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:${PAGE_BG};">
    <tr>
      <td align="center" style="padding:16px 8px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="email-container" style="border-collapse:collapse;width:600px;max-width:600px;background-color:${WHITE};border-radius:16px;overflow:hidden;">

          <!-- Hero: Halloween decorations + branding + thank you -->
          <tr>
            <td align="center" style="padding:0;line-height:0;font-size:0;background-color:${HERO_BG};">
              <a href="${escAttr(site)}" target="_blank" style="text-decoration:none;">
                <img class="fluid" src="${escAttr(HERO_DECOR)}" width="600" alt="HalloweenReady Halloween decorations, costumes, and party supplies" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
              </a>
            </td>
          </tr>
          <tr>
            <td class="mobile-pad" align="center" bgcolor="${HERO_BG}" style="padding:28px 24px 32px 24px;background-color:${HERO_BG};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 auto;">
                <tr>
                  <td align="center" bgcolor="${WHITE}" style="background-color:${WHITE};border-radius:10px;padding:10px 16px;">
                    <a href="${escAttr(site)}" target="_blank" style="text-decoration:none;">
                      <img src="${escAttr(LOGO)}" width="168" alt="HalloweenReady" style="display:block;width:168px;max-width:70%;height:auto;border:0;margin:0 auto;" />
                    </a>
                  </td>
                </tr>
              </table>
              <div style="height:16px;line-height:16px;font-size:0;">&nbsp;</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};font-weight:bold;padding-bottom:10px;">
                HalloweenReady
              </div>
              <div class="hero-title" style="font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:38px;font-weight:bold;color:${WHITE};letter-spacing:0.5px;">
                THANK YOU FOR YOUR ORDER!
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#f0d78c;padding-top:10px;">
                Halloween decorations, costumes, and party supplies
              </div>
            </td>
          </tr>
          <tr>
            <td height="5" style="height:5px;line-height:5px;font-size:0;background-color:${ORANGE};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td width="70%" height="5" bgcolor="${ORANGE}" style="background-color:${ORANGE};font-size:0;line-height:5px;">&nbsp;</td>
                  <td width="30%" height="5" bgcolor="${GOLD}" style="background-color:${GOLD};font-size:0;line-height:5px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confirmation -->
          <tr>
            <td class="mobile-pad" align="center" style="padding:36px 28px 8px 28px;background-color:${WHITE};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 auto;">
                <tr>
                  <td align="center" valign="middle" bgcolor="${GREEN}" width="56" height="56" style="width:56px;height:56px;background-color:${GREEN};border-radius:28px;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:56px;color:${WHITE};font-weight:bold;">
                    &#10003;
                  </td>
                </tr>
              </table>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:32px;font-weight:bold;color:${HERO_BG};padding:16px 0 8px 0;">
                Your Order is Confirmed!
              </div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:24px;color:${TEXT};padding-bottom:10px;">
                Hi ${escapeHtml(first)},
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:${MUTED};max-width:480px;margin:0 auto;">
                Thank you for shopping with HalloweenReady. We have confirmed your order and our team is preparing it for fulfillment and USA dispatch.
              </div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:20px auto 8px auto;">
                <tr>
                  <td align="center" bgcolor="${CREAM}" style="background-color:${CREAM};border:2px solid ${ORANGE};border-radius:8px;padding:12px 22px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:14px;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED};padding-bottom:4px;">Order ID</div>
                    <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:26px;font-weight:bold;color:${ORANGE};">${escapeHtml(ref)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order details -->
          <tr>
            <td class="mobile-pad" style="padding:16px 28px 8px 28px;background-color:${WHITE};">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;letter-spacing:2px;text-transform:uppercase;color:${ORANGE};font-weight:bold;padding-bottom:10px;border-bottom:2px solid ${HERO_BG};">
                Order details
              </div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                ${productRowsHtml(order, site)}
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin-top:8px;">
                <tr>
                  <td width="45%"></td>
                  <td width="55%">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                      ${totalRow("Subtotal", money(t.subtotal))}
                      ${totalRow("Shipping charges", money(t.shipping))}
                      ${taxRow}
                      ${discountRow}
                      <tr>
                        <td colspan="2" style="padding:8px 0 0 0;border-top:2px solid ${HERO_BG};font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                      ${totalRow("Total amount", money(t.total), { strong: true, accent: true })}
                    </table>
                  </td>
                </tr>
              </table>
              <div style="padding:24px 0 8px 0;text-align:center;">
                ${viewOrderButton(orderUrl)}
              </div>
            </td>
          </tr>

          <!-- Thank you -->
          <tr>
            <td class="mobile-pad" align="center" bgcolor="${CREAM}" style="padding:28px 28px 32px 28px;background-color:${CREAM};border-top:1px solid ${LINE};">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:28px;font-weight:bold;color:${HERO_BG};padding-bottom:10px;">
                Thank you for shopping with us
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:${MUTED};max-width:460px;margin:0 auto;">
                We appreciate your HalloweenReady order, ${escapeHtml(customerFullName(order))}. You will receive another update when packing starts and when your package ships. If you have any questions, our support team is here to help.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="mobile-pad" align="center" bgcolor="${HERO_BG}" style="padding:32px 24px 20px 24px;background-color:${HERO_BG};">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#9aa8c0;padding-bottom:12px;">
                Follow us
              </div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 auto;">
                <tr>
                  ${socialBadge(FB_URL, "f", "#1877F2")}
                  ${socialBadge(IG_URL, "IG", "#E1306C")}
                  ${socialBadge(PINTEREST_URL, "P", "#E60023")}
                  ${socialBadge(X_URL, "X", "#000000")}
                </tr>
              </table>
              <div style="height:18px;line-height:18px;font-size:0;">&nbsp;</div>
              <a href="${escAttr(site)}" target="_blank" style="text-decoration:none;">
                <img src="${escAttr(LOGO)}" width="140" alt="HalloweenReady" style="display:block;width:140px;max-width:55%;height:auto;border:0;margin:0 auto;background-color:${WHITE};border-radius:8px;padding:8px;" />
              </a>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:20px;color:#f0d78c;padding:14px 0 10px 0;">
                Halloween decorations, costumes, and party supplies
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#d7dde8;">
                Website:
                <a href="${escAttr(site)}" target="_blank" style="color:#f0d78c;text-decoration:underline;">www.halloweenready.com</a>
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#d7dde8;">
                Support:
                <a href="mailto:${SUPPORT_EMAIL}" style="color:#f0d78c;text-decoration:underline;">${SUPPORT_EMAIL}</a>
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#d7dde8;padding-bottom:6px;">
                Phone / WhatsApp: ${escapeHtml(SUPPORT_PHONE)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#d7dde8;padding-bottom:18px;">
                Orders:
                <a href="mailto:${ORDER_EMAIL}" style="color:#f0d78c;text-decoration:underline;">${ORDER_EMAIL}</a>
              </div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  ${trustCell("100% Secure Payment", "Stripe and Razorpay checkout")}
                  ${trustCell("Quality Party Supplies", "Premium Halloween products")}
                  ${trustCell("USA Shipping", "Delivery to all 50 states")}
                  ${trustCell("Easy Returns & Exchanges", "Satisfaction guarantee")}
                </tr>
              </table>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#9aa8c0;padding-top:18px;">
                &copy; 2026 HalloweenReady. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
function buildOrderConfirmedEmailText(order) {
    const site = siteBaseUrl();
    const ref = (0, order_number_1.displayOrderRef)(order);
    const first = customerFirstName(order);
    const money = (n) => formatOrderMoney(n, order.currency);
    const t = totals(order);
    const itemLines = order.items
        .map((item) => {
        const addons = (item.addons ?? [])
            .map((a) => {
            const qtyLabel = a.quantity > 1 ? `${a.quantity}x ` : "";
            return `    + ${qtyLabel}${a.name}`;
        })
            .join("\n");
        const desc = item.description ? `\n  ${item.description}` : "";
        const line = `- ${item.name} x ${item.quantity} — ${money(lineTotal(item))}${desc}`;
        return addons ? `${line}\n${addons}` : line;
    })
        .join("\n");
    const discountLine = t.discount > 0
        ? `Discount${order.couponCode ? ` (${order.couponCode})` : ""}: -${money(t.discount)}\n`
        : "";
    return `Hi ${first},

Your order is confirmed!

Thank you for shopping with ${SITE_NAME}. We have confirmed order ${ref} and our team is preparing it for fulfillment and USA dispatch.

Order ID: ${ref}

ORDER DETAILS
${itemLines}

Subtotal: ${money(t.subtotal)}
Shipping charges: ${money(t.shipping)}
Tax: ${money(t.tax)}
${discountLine}Total amount: ${money(t.total)}

View your order: ${site}/orders/${order.orderId}

Thank you for shopping with us. You will receive another update when packing starts and when your package ships.

Questions? Reply to this email or contact ${SUPPORT_EMAIL} / ${SUPPORT_PHONE}.

— ${SITE_NAME} Team
${site}`;
}
function buildOrderConfirmedWhatsAppMessage(order) {
    const site = siteBaseUrl();
    const ref = (0, order_number_1.displayOrderRef)(order);
    const first = customerFirstName(order);
    const money = (n) => formatOrderMoney(n, order.currency);
    const t = totals(order);
    const itemLines = order.items
        .map((item) => {
        const addons = (item.addons ?? [])
            .map((a) => `  + ${a.quantity > 1 ? `${a.quantity}x ` : ""}${a.name}`)
            .join("\n");
        const line = `- ${item.name} x ${item.quantity} — ${money(lineTotal(item))}`;
        return addons ? `${line}\n${addons}` : line;
    })
        .join("\n");
    const discountLine = t.discount > 0
        ? `Discount${order.couponCode ? ` (${order.couponCode})` : ""}: -${money(t.discount)}\n`
        : "";
    return `Hi ${first},

Your HalloweenReady order is confirmed.

Order ID: ${ref}

Items:
${itemLines}

Subtotal: ${money(t.subtotal)}
Shipping: ${money(t.shipping)}
Tax: ${money(t.tax)}
${discountLine}Total: ${money(t.total)}

We are preparing your order for USA dispatch.
View order: ${site}/orders/${order.orderId}

Thank you for shopping with HalloweenReady.`;
}
