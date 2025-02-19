import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { Session } from "./lib/better-auth/auth-types"; 

async function getMiddlewareSession(req: NextRequest) {
    try {
      const response = await axios.get<Session>(`${req.nextUrl.origin}/api/auth/get-session`, {
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
      });
  
      console.log("[DEBUG] Session data:", response.data);
      return response.data;
    } catch (error) {
      console.error("[ERROR] Failed to fetch session:", error);
      return null; // Return null instead of crashing the middleware
    }
  }
  

export async function middleware(req: NextRequest) {
  const session = await getMiddlewareSession(req);
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};