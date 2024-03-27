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
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account }) {
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

    async jwt({ token, user }) {
      console.log(token);
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // if (user && "id" in user) {
      //   // Assuming 'user_id' is a property on the User type
      //   token.sub = (user as User).id;
      // }

      // if (user && "role" in user) {
      //   // Assuming 'role' is a property on the User type
      //   token.role = (user as User).role as "ADMIN" | "USER";
      // }

      // if (user && "name" in user) {
      //   // Assuming 'name' is a property on the User type
      //   token.name = (user as User).name;
      // }

      // if (user && "email" in user) {
      //   // Assuming 'email' is a property on the User type
      //   token.email = (user as User).email;
      // }

      return token;
    },
  },
  ...authConfig,
});
