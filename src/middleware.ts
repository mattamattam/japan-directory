import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if maintenance mode is enabled
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  // Allow access to maintenance page, override page, and API routes even in maintenance mode
  const isMaintenancePage = request.nextUrl.pathname === "/maintenance";
  const isOverridePage = request.nextUrl.pathname === "/override";
  const isApiRoute = request.nextUrl.pathname.startsWith("/api");
  const isStaticFile =
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/favicon") ||
    request.nextUrl.pathname.startsWith("/images") ||
    request.nextUrl.pathname.includes(".");

  // Check for maintenance override secret (from URL parameter or cookie)
  const maintenanceOverride = request.nextUrl.searchParams.get(
    "maintenance_override"
  );
  const maintenanceOverrideCookie = request.cookies.get(
    "maintenance_override"
  )?.value;
  const isOverrideValid =
    maintenanceOverride === process.env.MAINTENANCE_OVERRIDE_SECRET ||
    maintenanceOverrideCookie === process.env.MAINTENANCE_OVERRIDE_SECRET;

  // If maintenance mode is enabled and not accessing allowed routes
  if (
    isMaintenanceMode &&
    !isMaintenancePage &&
    !isOverridePage &&
    !isApiRoute &&
    !isStaticFile
  ) {
    // Allow access if override secret is provided
    if (isOverrideValid) {
      return NextResponse.next();
    }

    // Redirect to maintenance page
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // If maintenance mode is disabled and user is on maintenance page, redirect to home
  if (!isMaintenanceMode && isMaintenancePage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
