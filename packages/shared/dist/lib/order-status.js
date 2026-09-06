"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOrderPaymentSettled = isOrderPaymentSettled;
exports.isOrderAwaitingPayment = isOrderAwaitingPayment;
exports.formatOrderStatusLabel = formatOrderStatusLabel;
exports.orderConfirmationHeadline = orderConfirmationHeadline;
exports.orderConfirmationSubcopy = orderConfirmationSubcopy;
const constants_1 = require("../constants");
/** Statuses that mean payment succeeded (order is past checkout). */
const PAYMENT_SETTLED_STATUSES = new Set([
    constants_1.ORDER_STATUS.PAID,
    constants_1.ORDER_STATUS.ACCEPTED,
    constants_1.ORDER_STATUS.ON_HOLD,
    constants_1.ORDER_STATUS.PROCESSING,
    constants_1.ORDER_STATUS.SHIPPED,
    constants_1.ORDER_STATUS.DELIVERED,
    constants_1.ORDER_STATUS.COMPLETE,
    constants_1.ORDER_STATUS.REFUNDED,
]);
/** True when the customer has paid — includes shipped / delivered / complete, not only `paid`. */
function isOrderPaymentSettled(status) {
    return PAYMENT_SETTLED_STATUSES.has(status);
}
/** True when the customer still needs to complete checkout payment. */
function isOrderAwaitingPayment(status) {
    return status === constants_1.ORDER_STATUS.PENDING_PAYMENT;
}
/** Human-readable customer-facing status label. */
function formatOrderStatusLabel(status) {
    if (status === constants_1.ORDER_STATUS.ACCEPTED)
        return "Order Confirmed";
    return status.replace(/_/g, " ");
}
/** Short customer headline for the order confirmation page. */
function orderConfirmationHeadline(status) {
    switch (status) {
        case constants_1.ORDER_STATUS.SHIPPED:
            return "Your order has shipped!";
        case constants_1.ORDER_STATUS.DELIVERED:
            return "Your order was delivered!";
        case constants_1.ORDER_STATUS.COMPLETE:
            return "Your order is complete!";
        case constants_1.ORDER_STATUS.ACCEPTED:
            return "Your order is confirmed!";
        case constants_1.ORDER_STATUS.PROCESSING:
            return "Your order is being prepared!";
        case constants_1.ORDER_STATUS.ON_HOLD:
            return "Your order is on hold";
        case constants_1.ORDER_STATUS.REFUNDED:
            return "This order was refunded";
        case constants_1.ORDER_STATUS.CANCELLED:
            return "This order was cancelled";
        case constants_1.ORDER_STATUS.PENDING_PAYMENT:
            return "Awaiting payment";
        case constants_1.ORDER_STATUS.PAID:
        default:
            return isOrderPaymentSettled(status)
                ? "Thank you — your order is confirmed!"
                : "Awaiting payment";
    }
}
/** Supporting copy under the confirmation headline. */
function orderConfirmationSubcopy(status) {
    switch (status) {
        case constants_1.ORDER_STATUS.SHIPPED:
            return "Your Halloween order is on the way. Use the tracking details below to follow your shipment.";
        case constants_1.ORDER_STATUS.DELIVERED:
            return "Your gift has arrived. We hope your brother loves it — thank you for choosing OccasionFun.";
        case constants_1.ORDER_STATUS.COMPLETE:
            return "Thank you for shopping Halloween with OccasionFun.";
        case constants_1.ORDER_STATUS.ACCEPTED:
            return "We've confirmed your order and our team is preparing it for USA dispatch.";
        case constants_1.ORDER_STATUS.PROCESSING:
            return "We've received your payment and our team is preparing your order for USA dispatch.";
        case constants_1.ORDER_STATUS.ON_HOLD:
            return "Our team is reviewing your order. We'll email you with an update shortly.";
        case constants_1.ORDER_STATUS.REFUNDED:
            return "A refund has been issued for this order. Contact support if you have questions.";
        case constants_1.ORDER_STATUS.CANCELLED:
            return "This order was cancelled. You can place a new order anytime.";
        case constants_1.ORDER_STATUS.PENDING_PAYMENT:
            return "Complete payment to confirm your order. Delivering in 5–7 days.";
        default:
            return isOrderPaymentSettled(status)
                ? "Your Halloween order is on its way. We've sent a confirmation email and our team will dispatch your order soon."
                : "Complete payment to confirm your order. Delivering in 5–7 days.";
    }
}
