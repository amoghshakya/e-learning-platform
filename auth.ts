import NextAuth, { DefaultSession } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { authConfig } from "./auth.config";
import { $Enums, User } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

type ExtendedUser = User & {
  emailVerified: boolean; // Add the missing property
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.user_id = token.sub;
        session.user.id = session.user.user_id;
      }

      if (token.role && session.user) {
        session.user.role = token.role as $Enums.Role;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user && "user_id" in user) {
        // Assuming 'user_id' is a property on the User type
        token.sub = (user as User).user_id;
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

      console.log(token);
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
