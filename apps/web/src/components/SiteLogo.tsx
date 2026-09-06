import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const LOGO = {
  desktop: { width: 72, height: 72, className: "h-16 w-16 rounded-full object-contain" },
  mobile: { width: 64, height: 64, className: "h-14 w-14 rounded-full object-contain" },
} as const;

type SiteLogoProps = {
  size?: keyof typeof LOGO;
  priority?: boolean;
  className?: string;
  /** Footer uses a black mark so it reads on the dark background. */
  tone?: "header" | "footer";
};

export function SiteLogo({
  size = "desktop",
  priority = false,
  className = "",
  tone = "header",
}: SiteLogoProps) {
  const { width, height, className: sizeClass } = LOGO[size];
  const toneClass = tone === "footer" ? "brightness-0" : "";
  return (
    <Image
      src={site.logoSrc}
      alt={site.name}
      width={width}
      height={height}
      className={`${sizeClass} ${toneClass} ${className}`.trim()}
      priority={priority}
    />
  );
}

export function SiteLogoLink({
  size = "desktop",
  priority = false,
  className = "",
  onClick,
  tone = "header",
}: SiteLogoProps & { onClick?: () => void }) {
  const plateClass = tone === "footer" ? "rounded-full bg-white p-0.5" : "";
  return (
    <Link href="/" className={`inline-block shrink-0 ${plateClass} ${className}`.trim()} onClick={onClick}>
      <SiteLogo size={size} priority={priority} tone={tone} />
    </Link>
  );
}
