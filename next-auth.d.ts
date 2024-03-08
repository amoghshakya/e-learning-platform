import { $Enums } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  user_id: string;
  role: $Enums.Role;
  isInstructor: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
