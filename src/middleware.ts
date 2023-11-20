import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import Auth from "./service/auth/auth";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_access")?.value ?? "";

  if (!authToken)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  if (Auth.isTokenExpired(authToken))
    return NextResponse.redirect(new URL("/auth/login", request.url));

  const typeUserDashboard = request.url.split("/").at(4);
  const typeUserCorrect = Auth.getCorrectRedirect(authToken);

  if (typeUserDashboard !== typeUserCorrect)
    return NextResponse.redirect(
      new URL(`/dashboard/${typeUserCorrect}`, request.url)
    );
}

export const config = {
  matcher: "/dashboard/:path*",
};
