import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const LOGO = {
  desktop: { width: 280, height: 72, className: "h-16 w-auto max-w-[280px] object-contain" },
  mobile: { width: 220, height: 56, className: "h-14 w-auto max-w-[220px] object-contain" },
} as const;

type SiteLogoProps = {
  size?: keyof typeof LOGO;
  priority?: boolean;
  className?: string;
};

/** Same logo rendering in header and footer — no blend modes. */
export function SiteLogo({ size = "desktop", priority = false, className = "" }: SiteLogoProps) {
  const { width, height, className: sizeClass } = LOGO[size];
  return (
    <Image
      src={site.logoSrc}
      alt={site.name}
      width={width}
      height={height}
      className={`${sizeClass} ${className}`.trim()}
      priority={priority}
    />
  );
}

export function SiteLogoLink({
  size = "desktop",
  priority = false,
  className = "",
  onClick,
}: SiteLogoProps & { onClick?: () => void }) {
  return (
    <Link href="/" className={`inline-block shrink-0 ${className}`.trim()} onClick={onClick}>
      <SiteLogo size={size} priority={priority} />
    </Link>
  );
}
