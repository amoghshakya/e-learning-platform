import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/join/login",
    newUser: "/join/signup"
  },
  providers: []
} satisfies NextAuthConfig