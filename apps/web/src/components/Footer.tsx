import Link from "next/link";
import { site, navItems, cityLinks } from "@/lib/site";
import { PaymentMethodIcons } from "@/components/PaymentMethodIcons";
import { SiteLogoLink } from "@/components/SiteLogo";
import { MarketContactBlock } from "@/components/MarketContactBlock";
import { countrySeoPages } from "@/lib/content/country-pages";

const FACEBOOK_URL = "https://www.facebook.com/halloweenreadyofficial/";
const INSTAGRAM_URL = "https://www.instagram.com/halloweenreadyofficial/";
const PINTEREST_URL = "https://www.pinterest.com/halloweenready/";
const TWITTER_URL = "https://x.com/halloweenready";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 text-sm">
          {/* Brand + contact — full width on mobile, one column on desktop */}
          <div className="col-span-2 lg:col-span-1">
            <SiteLogoLink size="desktop" className="mb-5" />
            <p className="text-white/80 leading-relaxed mb-4 max-w-xs">
              Halloween costumes, decor, and party supplies. Check product pages for destination shipping quotes.
            </p>
            <div className="space-y-2 text-white/90">
              <MarketContactBlock />
            </div>
            <div className="mt-5">
              <p className="text-xs uppercase tracking-wide text-white/60 mb-2">Follow us</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HalloweenReady on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] hover:scale-105 transition-transform"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#fff" aria-hidden>
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0013.843 3c-2.386 0-4.027 1.455-4.027 4.061v2.431H7.574v3.209h2.242v8.196h3.581z" />
                  </svg>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HalloweenReady on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-[22%] hover:scale-105 transition-transform"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                  }}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="#fff" strokeWidth="2" />
                    <circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="2" />
                    <circle cx="17.4" cy="6.6" r="1.2" fill="#fff" />
                  </svg>
                </a>
                <a
                  href={PINTEREST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HalloweenReady on Pinterest"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E60023] hover:scale-105 transition-transform"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#fff" aria-hidden>
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                  </svg>
                </a>
                <a
                  href={TWITTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HalloweenReady on X"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black hover:scale-105 transition-transform"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#fff" aria-hidden>
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div className="min-w-0">
            <p className="font-semibold text-white mb-3 sm:mb-4">Shop Halloween</p>
            <ul className="space-y-2 text-white/80">
              {navItems
                .filter((n) => "category" in n)
                .map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="hover:text-white hover:underline">
                      {n.category === "halloween-hampers" ? "Halloween Hampers" : n.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/products" className="hover:text-white hover:underline">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="min-w-0">
            <p className="font-semibold text-white mb-3 sm:mb-4">Help &amp; Info</p>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/halloween" className="hover:text-white hover:underline">Halloween by location</Link></li>
              <li><Link href="/halloween-guide" className="hover:text-white hover:underline">Halloween Guide 2026</Link></li>
              <li><Link href="/blog" className="hover:text-white hover:underline">Blog &amp; Guides</Link></li>
              <li><Link href="/shipping" className="hover:text-white hover:underline">Shipping &amp; Delivery</Link></li>
              <li><Link href="/faq" className="hover:text-white hover:underline">FAQ</Link></li>
              <li><Link href="/reviews" className="hover:text-white hover:underline">Customer Reviews</Link></li>
              <li><Link href="/about" className="hover:text-white hover:underline">About Us</Link></li>
              <li><Link href="/returns" className="hover:text-white hover:underline">Returns &amp; Guarantee</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Deliver to — full width, 3-column city grid keeps footer compact */}
        <div className="mt-8 pt-8 border-t border-white/15 text-sm">
          <p className="font-semibold text-white mb-3 sm:mb-4">Shop by country</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-white/80 mb-6">
            {countrySeoPages.map((c) => (
              <li key={c.slug}>
                <Link href={`/countries/${c.slug}`} className="hover:text-white hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="font-semibold text-white mb-3 sm:mb-4">Deliver to</p>
          <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-2 text-white/80">
            {cityLinks.map((c) => (
              <li key={c.slug}>
                <Link href={`/cities/${c.slug}`} className="hover:text-white hover:underline">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Payments row */}
        <div className="mt-10 pt-8 border-t border-white/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/60 mb-2">Accepted payments</p>
            <PaymentMethodIcons />
          </div>
          <p className="text-xs text-white/50 max-w-md">
            Secure checkout. Prices can display in local currency; payment is charged in USD (Stripe) or INR (Razorpay).
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-primary/95">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {site.name}.com. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/terms" className="hover:text-white underline underline-offset-2">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white underline underline-offset-2">
              Privacy
            </Link>
            <Link href="/press" className="hover:text-white underline underline-offset-2">
              Press
            </Link>
            <Link href="/llms.txt" className="hover:text-white underline underline-offset-2">
              LLMs.txt
            </Link>
            <Link href="/humans.txt" className="hover:text-white underline underline-offset-2">
              Humans.txt
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
