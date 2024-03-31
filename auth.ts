import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { $Enums, User } from "@prisma/client";
import { getUserById } from "./lib/actions";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async redirect({ url, baseUrl }) {
      const { pathname, searchParams } = new URL(url);
      if (searchParams.get("error") === "OAuthAccountNotLinked") {
        return `${baseUrl}/join/login`;
      }
      return url;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      if (!user) return token;
      token.email = user.email;
      token.name = user.name;
      if (user && "isInstructor" in user)
        token.isInstructor = user.isInstructor;
      if (user && "role" in user) token.role = user.role;
      return token;
    },
    async signIn({ account }) {
      if (account?.provider !== "credentials") return true;

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as $Enums.Role;
      }

      return session;
    },
  },
  ...authConfig,
});
