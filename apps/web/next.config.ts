import type { NextConfig } from "next";
import { legacyRedirectRules } from "./src/lib/legacy-urls";

const nextConfig: NextConfig = {
  transpilePackages: ["/shared"],
  // Geo/city SSG used to hang on `/cj/products`; keep a buffer if a page is still slow.
  staticPageGenerationTimeout: 120,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
  },
  async redirects() {
    // Keep legacy CMS / singular /product/:slug paths working as permanent redirects.
    return legacyRedirectRules().map((rule) => ({
      source: rule.source,
      destination: rule.destination,
      permanent: rule.statusCode === 301,
    }));
  },
};

export default nextConfig;
