import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const host = request.headers.get("host") || "";
  const fullUrl = `${protocol}://${host}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-host-url", fullUrl);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/:path*",
};
