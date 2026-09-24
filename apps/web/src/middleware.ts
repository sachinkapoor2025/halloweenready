import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { canonicalStorePath } from "@/lib/location-urls";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const canonical = canonicalStorePath(pathname);
  if (canonical === pathname) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = canonical;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
