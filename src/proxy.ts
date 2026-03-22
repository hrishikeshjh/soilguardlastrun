import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If accessing admin routes, check for Admin role
    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "Admin") {
        // Redirect non-admin users away from admin panel
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // User must be logged in (have a valid token) to proceed
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/reports/:path*",
    "/api/users/:path*",
  ],
};
