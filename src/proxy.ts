import { withAuth } from "next-auth/middleware";

export default withAuth;

// Define which routes should be protected by the middleware
export const config = {
  matcher: [
    "/dashboard/:path*", // All dashboard routes
    "/admin/:path*",     // All admin routes
    "/api/reports/:path*", // Protect reports API from direct access without token
    "/api/users/:path*",   // Protect user API
  ],
};
