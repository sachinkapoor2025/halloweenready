"use client";

import { site, whatsappChatUrl } from "@/lib/site";
import { useMarket } from "@/lib/market-context";

export function MarketContactBlock() {
  const { market } = useMarket();
  const email = market?.contact.email || site.supportEmail;
  const phone = market?.contact.phone || site.phone;
  const whatsappDigits = market?.contact.whatsapp || site.whatsapp;
  const address = [
    market?.contact.addressLine1,
    market?.contact.addressLine2,
    [market?.contact.city, market?.contact.stateOrRegion, market?.contact.postalCode].filter(Boolean).join(", "),
    market?.name,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="space-y-2 text-white/90">
      {address && (
        <p>
          <span className="text-white/60 text-xs uppercase tracking-wide block mb-0.5">Warehouse</span>
          <span className="font-medium">{address}</span>
        </p>
      )}
      <p>
        <span className="text-white/60 text-xs uppercase tracking-wide block mb-0.5">Email</span>
        <a href={`mailto:${email}`} className="font-medium hover:text-white hover:underline">
          {email || "Add email in admin market settings"}
        </a>
      </p>
      <p>
        <span className="text-white/60 text-xs uppercase tracking-wide block mb-0.5">Phone</span>
        <a href={`tel:${market?.contact.phoneNormalized || phone}`} className="font-medium hover:underline">
          {phone}
        </a>
      </p>
      {whatsappDigits && (
        <p>
          <span className="text-white/60 text-xs uppercase tracking-wide block mb-0.5">WhatsApp</span>
          <a
            href={whatsappChatUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            {market?.contact.phone || site.whatsappDisplay}
          </a>
        </p>
      )}
    </div>
  );
}
