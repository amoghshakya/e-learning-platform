import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { $Enums, User } from "@prisma/client";

import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false;
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL("/dashboard", nextUrl));
    //   }
    //   return true;
    // },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as $Enums.Role;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user && "id" in user) {
        // Assuming 'user_id' is a property on the User type
        token.sub = (user as User).id;
      }

      if (user && "role" in user) {
        // Assuming 'role' is a property on the User type
        token.role = (user as User).role as "ADMIN" | "USER";
      }

      if (user && "name" in user) {
        // Assuming 'name' is a property on the User type
        token.name = (user as User).name;
      }

      if (user && "email" in user) {
        // Assuming 'email' is a property on the User type
        token.email = (user as User).email;
      }

      return token;
    },
  },
  ...authConfig,
});
