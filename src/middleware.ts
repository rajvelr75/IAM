import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "./lib/better-auth/auth-types";

async function getMiddlewareSession(req: NextRequest) {
  try {
    const { data: session } = await axios.get<Session>(
      `${req.nextUrl.origin}/api/auth/get-session`,
      {
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      }
    );
    console.log("Session Data:", session);
    return session;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Session Fetch Error:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    return null;
  }
}


export default async function authMiddleware(req: NextRequest) {
  console.log("Middleware request to:", req.nextUrl.pathname);

  const session = await getMiddlewareSession(req);
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/sign-") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/2fa-verification")
  ) {
    if (!session) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/apps", url));
  }

  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
