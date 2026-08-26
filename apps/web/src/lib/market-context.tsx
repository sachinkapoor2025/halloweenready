"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_MARKET_COUNTRY } from "@halloweenready/shared";
import { getApiUrl } from "./env";
import { useCurrency } from "./currency-context";

const COUNTRY_KEY = "hr_ecom_market_country";
const POSTAL_KEY = "hr_ecom_market_postal";
const MANUAL_KEY = "hr_ecom_market_manual";

export type PublicMarket = {
  countryCode: string;
  name: string;
  slug: string;
  locale: string;
  currency: string;
  checkoutCurrency: "USD" | "INR";
  flagEmoji: string;
  postalLabel: string;
  hreflang?: string;
  allowInternationalFallback: boolean;
  contact: {
    phone?: string;
    phoneNormalized?: string;
    whatsapp?: string;
    email?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    stateOrRegion?: string;
    postalCode?: string;
    countryCode?: string;
  };
};

type Serviceability = {
  deliverable: boolean;
  postalValid: boolean;
  postalMessage?: string;
  warehouse?: { warehouseId: string; name: string; city: string; countryCode: string; estimatedDeliveryDays?: number } | null;
  routingReason?: string;
  productAvailable?: boolean;
};

interface MarketContextValue {
  countryCode: string;
  postalCode: string;
  markets: PublicMarket[];
  market: PublicMarket | undefined;
  loading: boolean;
  setMarketLocation: (countryCode: string, postalCode?: string, source?: "manual" | "geo") => void;
  checkServiceability: (productSlug?: string) => Promise<Serviceability | null>;
  lastServiceability: Serviceability | null;
}

const MarketContext = createContext<MarketContextValue | null>(null);

function readStoredCountry(): string {
  if (typeof window === "undefined") return DEFAULT_MARKET_COUNTRY;
  return localStorage.getItem(COUNTRY_KEY) || DEFAULT_MARKET_COUNTRY;
}

export function MarketProvider({ children }: { children: ReactNode }) {
  const { setDisplayCurrency } = useCurrency();
  const [countryCode, setCountryCode] = useState<string>(DEFAULT_MARKET_COUNTRY);
  const [postalCode, setPostalCode] = useState("");
  const [markets, setMarkets] = useState<PublicMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastServiceability, setLastServiceability] = useState<Serviceability | null>(null);

  const market = useMemo(
    () => markets.find((m) => m.countryCode === countryCode) ?? markets.find((m) => m.countryCode === "US"),
    [markets, countryCode]
  );

  const applyCheckoutCurrency = useCallback(
    (code: string, list: PublicMarket[]) => {
      if (typeof window !== "undefined" && localStorage.getItem("hr_ecom_currency_manual") === "true") {
        return;
      }
      const found = list.find((m) => m.countryCode === code);
      if (found?.checkoutCurrency === "INR") setDisplayCurrency("INR");
      else if (found) setDisplayCurrency("USD");
    },
    [setDisplayCurrency]
  );

  const setMarketLocation = useCallback(
    (nextCountry: string, nextPostal?: string, source: "manual" | "geo" = "manual") => {
      const code = nextCountry.trim().toUpperCase() || DEFAULT_MARKET_COUNTRY;
      setCountryCode(code);
      if (typeof window !== "undefined") {
        localStorage.setItem(COUNTRY_KEY, code);
        if (source === "manual") localStorage.setItem(MANUAL_KEY, "true");
        if (nextPostal !== undefined) {
          setPostalCode(nextPostal);
          localStorage.setItem(POSTAL_KEY, nextPostal);
        }
      } else if (nextPostal !== undefined) {
        setPostalCode(nextPostal);
      }
      applyCheckoutCurrency(code, markets);
    },
    [applyCheckoutCurrency, markets]
  );

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(`${getApiUrl()}/markets`, { cache: "force-cache" });
        const data = res.ok ? ((await res.json()) as { markets?: PublicMarket[] }) : { markets: [] };
        const list = data.markets ?? [];
        setMarkets(list);

        const manual = typeof window !== "undefined" && localStorage.getItem(MANUAL_KEY) === "true";
        const stored = readStoredCountry();
        const storedPostal = typeof window !== "undefined" ? localStorage.getItem(POSTAL_KEY) ?? "" : "";
        if (storedPostal) setPostalCode(storedPostal);

        if (manual && stored) {
          setCountryCode(stored);
          applyCheckoutCurrency(stored, list);
          return;
        }

        try {
          const geo = await fetch("/api/geo", { cache: "no-store" });
          if (geo.ok) {
            const g = (await geo.json()) as { country?: string };
            const detected = (g.country ?? stored).toUpperCase();
            const allowed = list.some((m) => m.countryCode === detected) ? detected : DEFAULT_MARKET_COUNTRY;
            setCountryCode(allowed);
            localStorage.setItem(COUNTRY_KEY, allowed);
            applyCheckoutCurrency(allowed, list);
            return;
          }
        } catch {
          /* keep stored */
        }
        setCountryCode(stored);
        applyCheckoutCurrency(stored, list);
      } finally {
        setLoading(false);
      }
    };
    void init();
  }, [applyCheckoutCurrency]);

  const checkServiceability = useCallback(
    async (productSlug?: string) => {
      const params = new URLSearchParams({ countryCode, postalCode });
      if (productSlug) params.set("productSlug", productSlug);
      try {
        const res = await fetch(`${getApiUrl()}/markets/serviceability?${params}`, { cache: "no-store" });
        if (!res.ok) return null;
        const data = (await res.json()) as Serviceability;
        setLastServiceability(data);
        return data;
      } catch {
        return null;
      }
    },
    [countryCode, postalCode]
  );

  const value = useMemo(
    () => ({
      countryCode,
      postalCode,
      markets,
      market,
      loading,
      setMarketLocation,
      checkServiceability,
      lastServiceability,
    }),
    [countryCode, postalCode, markets, market, loading, setMarketLocation, checkServiceability, lastServiceability]
  );

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const ctx = useContext(MarketContext);
  if (!ctx) throw new Error("useMarket must be used within MarketProvider");
  return ctx;
}
