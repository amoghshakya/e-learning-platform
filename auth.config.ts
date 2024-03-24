import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import z from "zod";
import { getUserByUsername } from "./lib/actions";

export default {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: "/join/login",
    newUser: "/join/signup",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = z
          .object({
            username: z.string().min(6),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;
          const user = await getUserByUsername(username);

          if (!user || !user.password) {
            return null;
          }

          const bcrypt = require("bcrypt");

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
