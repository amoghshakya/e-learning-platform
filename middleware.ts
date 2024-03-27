import { NextRequest, NextResponse } from "next/server";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { auth } from "./auth";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

export default async function middleware(req: NextRequest) {
  await NextAuth(authConfig);
  const session = await auth();
  const isLoggedIn = !!session?.user.id;

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

// export const { auth: middleware } = NextAuth(authConfig);
