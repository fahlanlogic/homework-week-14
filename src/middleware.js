import { NextResponse } from "next/server";

export function middleware(request) {
  const loginPath = ["/sign-in", "/api/sign-in", "/api/sign-up"];
  if (loginPath.some(v => v === request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    const accessToken = request.cookies.get("access_token");
    if (accessToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/sign-in",
    "/api/:function*",
    "/newbook/:function*",
    "/editbook/:function*",
    "/api/newbook/uploads",
  ],
};
