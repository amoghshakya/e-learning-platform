import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUserByUsername } from "./lib/actions";
import bcrypt from "bcryptjs";

export const authConfig = {
  pages: {
    signIn: "/join/login",
    newUser: "/join/signup",
  },
  providers: [
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
