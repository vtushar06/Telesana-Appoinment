// Clerk authentication middleware - protects routes
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/doctors(.*)",      // Doctor listings and profiles
  "/onboarding(.*)",   // User onboarding flow
  "/doctor(.*)",       // Doctor dashboard
  "/admin(.*)",        // Admin panel
  "/video-call(.*)",   // Video consultation
  "/appointments(.*)", // Appointment management
]);

// Middleware runs on every request
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect to sign-in if not authenticated on protected routes
  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
