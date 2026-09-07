import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import {
  configKeys,
  EPROLO_DEFAULT_API_BASE,
  eproloAuthHeaders,
  type EproloSignAlgorithm,
  VENDOR_EPROLO,
} from "@halloweenready/shared";
import { docClient, CONFIG_TABLE, now } from "./db";

export class EproloApiError extends Error {
  constructor(
    message: string,
    readonly statusCode?: number,
    readonly eproloCode?: number | string,
    readonly url?: string
  ) {
    super(message);
    this.name = "EproloApiError";
  }
}

type CredentialRecord = {
  openApiKey?: string;
  openApiSecret?: string;
  updatedAt?: string;
};

type EproloEnvelope = {
  code?: number | string;
  result?: boolean;
  success?: boolean;
  message?: string;
  msg?: string;
  data?: unknown;
};

const PING_PATHS = [
  "/open/product/list",
  "/product/list",
  "/open-api/product/list",
  "/v1/product/list",
  "/api/open/product/list",
];

function envKey(): string {
  return (process.env.EPROLO_OPEN_API_KEY ?? "").trim();
}

function envSecret(): string {
  return (process.env.EPROLO_OPEN_API_SECRET ?? "").trim();
}

function apiBase(): string {
  return (process.env.EPROLO_API_BASE ?? EPROLO_DEFAULT_API_BASE).replace(/\/$/, "");
}

function signAlgorithm(): EproloSignAlgorithm {
  const raw = (process.env.EPROLO_SIGN_ALG ?? "md5-key-secret-timestamp").trim();
  return raw === "hmac-sha256-key-timestamp" ? raw : "md5-key-secret-timestamp";
}

let credentialMemory: CredentialRecord | null = null;

async function loadCredentials(): Promise<CredentialRecord> {
  if (credentialMemory?.openApiKey && credentialMemory.openApiSecret) return credentialMemory;
  const result = await docClient.send(
    new GetCommand({
      TableName: CONFIG_TABLE,
      Key: { PK: configKeys.eprolo.pk, SK: configKeys.eprolo.sk },
    })
  );
  credentialMemory = (result.Item as CredentialRecord | undefined) ?? {};
  return credentialMemory;
}

async function saveCredentialRecord(patch: CredentialRecord): Promise<CredentialRecord> {
  const current = await loadCredentials();
  const next: CredentialRecord = { ...current, ...patch, updatedAt: now() };
  await docClient.send(
    new PutCommand({
      TableName: CONFIG_TABLE,
      Item: {
        PK: configKeys.eprolo.pk,
        SK: configKeys.eprolo.sk,
        ...next,
      },
    })
  );
  credentialMemory = next;
  return next;
}

function hint(value: string): string {
  return value.length > 8 ? `${value.slice(0, 4)}…${value.slice(-4)}` : "set";
}

export async function resolveEproloCredentials(): Promise<{
  openApiKey: string;
  openApiSecret: string;
} | null> {
  const stored = await loadCredentials();
  const openApiKey = stored.openApiKey || envKey();
  const openApiSecret = stored.openApiSecret || envSecret();
  if (!openApiKey || !openApiSecret) return null;
  return { openApiKey, openApiSecret };
}

export async function saveEproloCredentials(openApiKey: string, openApiSecret: string): Promise<void> {
  credentialMemory = null;
  await saveCredentialRecord({
    openApiKey: openApiKey.trim(),
    openApiSecret: openApiSecret.trim(),
  });
}

async function postJson(
  url: string,
  headers: Record<string, string>,
  body: unknown
): Promise<{ status: number; json: EproloEnvelope | null; text: string }> {
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8_000),
  });
  const text = await res.text();
  let json: EproloEnvelope | null = null;
  try {
    json = JSON.parse(text) as EproloEnvelope;
  } catch {
    json = null;
  }
  return { status: res.status, json, text };
}

function looksLikeApiJson(json: EproloEnvelope | null): boolean {
  if (!json || typeof json !== "object") return false;
  return (
    json.code !== undefined ||
    json.success !== undefined ||
    json.result !== undefined ||
    Boolean(json.message || json.msg)
  );
}

/**
 * POST a tiny product-list payload to the configured host (and a few common path aliases)
 * so we can confirm the key/secret/sign against Eprolo without importing catalog yet.
 */
export async function pingEproloApi(): Promise<{
  ok: boolean;
  url?: string;
  status?: number;
  message?: string;
}> {
  const creds = await resolveEproloCredentials();
  if (!creds) {
    return { ok: false, message: "Eprolo openApiKey / openApiSecret are not configured." };
  }
  const headers = eproloAuthHeaders(creds.openApiKey, creds.openApiSecret, signAlgorithm());
  const body = { page: 1, pageSize: 1 };
  const base = apiBase();
  const paths = process.env.EPROLO_PING_PATH?.trim()
    ? [process.env.EPROLO_PING_PATH.trim()]
    : PING_PATHS;

  let last: { url: string; status: number; message: string } | undefined;
  for (const path of paths) {
    const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
    try {
      const result = await postJson(url, headers, body);
      const message =
        result.json?.message ||
        result.json?.msg ||
        (result.json ? `HTTP ${result.status} code=${String(result.json.code ?? "")}` : result.text.slice(0, 180));
      last = { url, status: result.status, message };
      if (looksLikeApiJson(result.json)) {
        const failedAuth =
          result.status === 401 ||
          result.status === 403 ||
          /sign|auth|secret|key/i.test(message);
        return {
          ok: !failedAuth && result.status < 500,
          url,
          status: result.status,
          message,
        };
      }
    } catch (err) {
      last = {
        url,
        status: 0,
        message: err instanceof Error ? err.message : "request failed",
      };
    }
  }
  return {
    ok: false,
    url: last?.url,
    status: last?.status,
    message:
      last?.message ||
      `No JSON API response from ${base}. Ask Eprolo for the Open API document (base URL + product list path) and set EPROLO_API_BASE.`,
  };
}

export async function getEproloConnectionStatus(): Promise<{
  configured: boolean;
  connected: boolean;
  vendorSlug: typeof VENDOR_EPROLO;
  apiKeyHint?: string;
  apiBase?: string;
  pingUrl?: string;
  message?: string;
}> {
  const creds = await resolveEproloCredentials();
  if (!creds) {
    return {
      configured: false,
      connected: false,
      vendorSlug: VENDOR_EPROLO,
      apiBase: apiBase(),
      message:
        "Set GitHub secrets EPROLO_OPEN_API_KEY and EPROLO_OPEN_API_SECRET, or paste them in Admin → Eprolo.",
    };
  }
  const ping = await pingEproloApi();
  return {
    configured: true,
    connected: ping.ok,
    vendorSlug: VENDOR_EPROLO,
    apiKeyHint: hint(creds.openApiKey),
    apiBase: apiBase(),
    pingUrl: ping.url,
    message: ping.message,
  };
}
