import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value ?? "";
  const type = request.cookies.get("token_type")?.value ?? "";
  // return NextResponse.redirect(new URL("/auth/login", request.url));

  // Cookie.set('auth_token', access_token);
  // Cookie.set('token_type', token_type);
}

export const config = {
  matcher: "/dashboard/:path*",
};
