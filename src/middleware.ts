// middleware.ts

import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";
export default function middleware(req: NextRequest) {
  return withAuth(req);
}
// Configure which routes you want to protect
export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to dashboard and subroutes
};
