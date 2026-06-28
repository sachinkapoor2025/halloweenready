"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = route;
const response_1 = require("./lib/response");
const products = __importStar(require("./handlers/products"));
const categories = __importStar(require("./handlers/categories"));
const cart = __importStar(require("./handlers/cart"));
const orders = __importStar(require("./handlers/orders"));
const config = __importStar(require("./handlers/config"));
const uploads = __importStar(require("./handlers/uploads"));
const events = __importStar(require("./handlers/events"));
const analytics = __importStar(require("./handlers/analytics"));
const salesReport = __importStar(require("./handlers/sales-report"));
const adminCarts = __importStar(require("./handlers/admin-carts"));
const account = __importStar(require("./handlers/account"));
const coupons = __importStar(require("./handlers/coupons"));
const stripe_1 = require("./handlers/payments/stripe");
const razorpay_1 = require("./handlers/payments/razorpay");
const routes = [
    { method: "GET", pattern: /^\/health$/, handler: async () => (0, response_1.ok)({ status: "ok" }) },
    { method: "GET", pattern: /^\/products$/, handler: products.listProducts },
    { method: "GET", pattern: /^\/products\/([^/]+)$/, handler: products.getProduct, params: ["slug"] },
    { method: "POST", pattern: /^\/products$/, handler: products.createProduct },
    { method: "PUT", pattern: /^\/products\/([^/]+)$/, handler: products.updateProduct, params: ["slug"] },
    { method: "DELETE", pattern: /^\/products\/([^/]+)$/, handler: products.deleteProduct, params: ["slug"] },
    { method: "GET", pattern: /^\/admin\/products$/, handler: products.listAdminProducts },
    { method: "POST", pattern: /^\/products\/bulk$/, handler: products.bulkUploadProducts },
    { method: "GET", pattern: /^\/categories$/, handler: categories.listCategories },
    { method: "GET", pattern: /^\/categories\/([^/]+)$/, handler: categories.getCategory, params: ["slug"] },
    { method: "POST", pattern: /^\/categories$/, handler: categories.createCategory },
    { method: "PUT", pattern: /^\/categories\/([^/]+)$/, handler: categories.updateCategory, params: ["slug"] },
    { method: "DELETE", pattern: /^\/categories\/([^/]+)$/, handler: categories.deleteCategory, params: ["slug"] },
    { method: "GET", pattern: /^\/cart$/, handler: cart.getCartHandler },
    { method: "POST", pattern: /^\/cart\/items$/, handler: cart.addToCart },
    { method: "PUT", pattern: /^\/cart\/items\/([^/]+)$/, handler: cart.updateCartItem, params: ["productSlug"] },
    { method: "DELETE", pattern: /^\/cart\/items\/([^/]+)$/, handler: cart.removeFromCart, params: ["productSlug"] },
    { method: "DELETE", pattern: /^\/cart$/, handler: cart.clearCart },
    { method: "POST", pattern: /^\/checkout$/, handler: orders.checkout },
    { method: "GET", pattern: /^\/orders$/, handler: orders.listOrders },
    { method: "GET", pattern: /^\/orders\/([^/]+)$/, handler: orders.getOrder, params: ["orderId"] },
    { method: "POST", pattern: /^\/orders\/([^/]+)\/retry-payment$/, handler: orders.retryOrderPayment, params: ["orderId"] },
    { method: "GET", pattern: /^\/account$/, handler: account.getAccount },
    { method: "PUT", pattern: /^\/account\/profile$/, handler: account.updateAccountProfile },
    { method: "POST", pattern: /^\/account\/addresses$/, handler: account.createAccountAddress },
    { method: "PUT", pattern: /^\/account\/addresses\/([^/]+)$/, handler: account.updateAccountAddress, params: ["addressId"] },
    { method: "DELETE", pattern: /^\/account\/addresses\/([^/]+)$/, handler: account.deleteAccountAddress, params: ["addressId"] },
    { method: "GET", pattern: /^\/admin\/orders$/, handler: orders.listAdminOrders },
    { method: "GET", pattern: /^\/admin\/orders\/([^/]+)$/, handler: orders.getAdminOrder, params: ["orderId"] },
    { method: "PATCH", pattern: /^\/admin\/orders\/([^/]+)$/, handler: orders.updateOrderStatus, params: ["orderId"] },
    { method: "PUT", pattern: /^\/admin\/orders\/([^/]+)$/, handler: orders.updateOrderStatus, params: ["orderId"] },
    { method: "GET", pattern: /^\/admin\/leads$/, handler: orders.listLeads },
    { method: "PATCH", pattern: /^\/admin\/leads$/, handler: orders.updateLead },
    { method: "GET", pattern: /^\/admin\/analytics\/overview$/, handler: analytics.getAnalyticsOverview },
    { method: "GET", pattern: /^\/admin\/analytics\/sales$/, handler: salesReport.getSalesReport },
    { method: "GET", pattern: /^\/admin\/analytics\/products$/, handler: analytics.getTopProducts },
    { method: "GET", pattern: /^\/admin\/analytics\/searches$/, handler: analytics.getTopSearches },
    { method: "GET", pattern: /^\/admin\/analytics\/insights$/, handler: analytics.getAnalyticsInsights },
    { method: "GET", pattern: /^\/admin\/sessions$/, handler: analytics.listSessions },
    { method: "GET", pattern: /^\/admin\/sessions\/([^/]+)$/, handler: analytics.getSessionTimeline, params: ["sessionId"] },
    { method: "GET", pattern: /^\/admin\/carts\/abandoned$/, handler: adminCarts.getAbandonedCarts },
    { method: "POST", pattern: /^\/coupons\/validate$/, handler: coupons.validateCouponHandler },
    { method: "GET", pattern: /^\/admin\/welcome-coupons$/, handler: coupons.listWelcomeCoupons },
    { method: "POST", pattern: /^\/leads$/, handler: orders.captureLead },
    { method: "POST", pattern: /^\/events$/, handler: events.recordEvent },
    { method: "GET", pattern: /^\/config\/payments$/, handler: config.getPaymentConfig },
    { method: "GET", pattern: /^\/config\/usd-inr-rate$/, handler: config.getUsdInrRate },
    { method: "PUT", pattern: /^\/config\/payments$/, handler: config.updatePaymentConfig },
    { method: "POST", pattern: /^\/uploads\/presign$/, handler: uploads.getUploadUrl },
    { method: "POST", pattern: /^\/products\/([^/]+)\/images$/, handler: uploads.attachImageToProduct, params: ["slug"] },
    { method: "POST", pattern: /^\/webhooks\/stripe$/, handler: stripe_1.stripeWebhook },
    { method: "POST", pattern: /^\/webhooks\/razorpay$/, handler: razorpay_1.razorpayWebhook },
    { method: "POST", pattern: /^\/payments\/razorpay\/verify$/, handler: razorpay_1.verifyRazorpayPayment },
];
async function route(event) {
    let path = event.rawPath ?? event.requestContext.http.path ?? "/";
    const stage = event.requestContext.stage;
    // HTTP API includes stage in path (e.g. /prod/products) — strip it for routing
    if (stage && path.startsWith(`/${stage}/`)) {
        path = path.slice(stage.length + 1);
    }
    else if (stage && path === `/${stage}`) {
        path = "/";
    }
    const method = event.requestContext.http.method;
    if (method === "OPTIONS") {
        return (0, response_1.corsPreflight)();
    }
    for (const routeDef of routes) {
        if (routeDef.method !== method)
            continue;
        const match = path.match(routeDef.pattern);
        if (!match)
            continue;
        if (routeDef.params) {
            const params = {};
            routeDef.params.forEach((name, i) => {
                params[name] = match[i + 1];
            });
            event.pathParameters = { ...event.pathParameters, ...params };
        }
        return routeDef.handler(event);
    }
    return (0, response_1.notFound)(`Route not found: ${method} ${path}`);
}
