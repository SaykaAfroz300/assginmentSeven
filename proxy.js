import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// protects product details and profile pages
export function proxy(request) {
  const cookie = getSessionCookie(request);

  if (!cookie) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    url.searchParams.set("error", "login-required");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
