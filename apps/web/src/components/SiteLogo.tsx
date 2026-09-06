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
};

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
