import { NextRequest, NextResponse } from "next/server";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { auth } from "./auth";
import { isUserLoggedIn } from "./lib/actions";

export default async function middleware(req: NextRequest) {
  const isLoggedIn = await isUserLoggedIn();

  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  if (isApiAuthRoute) return null;
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }
    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/join/login", req.url));
  }
  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
