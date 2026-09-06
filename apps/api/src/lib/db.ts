import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { memoryStore } from "./memory-store";

const useMemory = process.env.USE_MEMORY_DB === "true";
const endpoint = process.env.DYNAMODB_ENDPOINT;

const client = useMemory
  ? null
  : new DynamoDBClient({
      region: process.env.AWS_REGION ?? "us-east-1",
      ...(endpoint
        ? {
            endpoint,
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "local",
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "local",
            },
          }
        : {}),
    });

export const docClient = useMemory
  ? (memoryStore as unknown as DynamoDBDocumentClient)
  : DynamoDBDocumentClient.from(client!, {
      marshallOptions: { removeUndefinedValues: true },
    });

const ENV = process.env.ENVIRONMENT ?? "dev";
const NAME_PREFIX = process.env.NAME_PREFIX ?? "occasionfun";

/** Per-domain tables (multi-table design). Each can be overridden by env var. */
export const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE ?? `${NAME_PREFIX}-products-${ENV}`;
export const ORDERS_TABLE = process.env.ORDERS_TABLE ?? `${NAME_PREFIX}-orders-${ENV}`;
export const CARTS_TABLE = process.env.CARTS_TABLE ?? `${NAME_PREFIX}-carts-${ENV}`;
export const CUSTOMERS_TABLE = process.env.CUSTOMERS_TABLE ?? `${NAME_PREFIX}-customers-${ENV}`;
export const EVENTS_TABLE = process.env.EVENTS_TABLE ?? `${NAME_PREFIX}-events-${ENV}`;
export const CONFIG_TABLE = process.env.CONFIG_TABLE ?? `${NAME_PREFIX}-config-${ENV}`;
export const EMAIL_CAMPAIGNS_TABLE =
  process.env.EMAIL_CAMPAIGNS_TABLE ?? `${NAME_PREFIX}-email-campaigns-${ENV}`;
export const REMINDER_EMAILS_TABLE =
  process.env.REMINDER_EMAILS_TABLE ?? `${NAME_PREFIX}-reminder-emails-${ENV}`;
export const PENDING_PAYMENT_UNSUB_TABLE =
  process.env.PENDING_PAYMENT_UNSUB_TABLE ?? `${NAME_PREFIX}-pending-payment-unsub-${ENV}`;

/** All table names, useful for setup/migration scripts. */
export const ALL_TABLES = {
  products: PRODUCTS_TABLE,
  orders: ORDERS_TABLE,
  carts: CARTS_TABLE,
  customers: CUSTOMERS_TABLE,
  events: EVENTS_TABLE,
  config: CONFIG_TABLE,
  emailCampaigns: EMAIL_CAMPAIGNS_TABLE,
  reminderEmails: REMINDER_EMAILS_TABLE,
  pendingPaymentUnsub: PENDING_PAYMENT_UNSUB_TABLE,
};

export function now(): string {
  return new Date().toISOString();
}

/** Epoch-seconds TTL value `days` in the future. */
export function ttlInDays(days: number): number {
  return Math.floor(Date.now() / 1000) + days * 24 * 60 * 60;
}

/** UTC day bucket (YYYY-MM-DD) for rollups/analytics. */
export function dayBucket(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
