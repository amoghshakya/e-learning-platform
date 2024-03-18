"use server";

import prisma from "./prisma";
import { Category, User } from "@prisma/client";
import { auth } from "@/auth";
import { unstable_noStore as noStore } from "next/cache";

// for cases like logging in using USERNAME
export async function getUserByUsername(
  username: string
): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return user ? user : undefined;
  } catch (err) {
    throw err;
  }
}

// for cases like logging in using EMAIL
export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user ? user : undefined;
  } catch (err) {
    throw err;
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user ? user : undefined;
  } catch (err) {
    throw err;
  }
}

export async function getUserImage() {
  noStore();
  const session = await auth();
  if (session) {
    return session.user.image;
  }

  return "";
}

export async function isUserLoggedIn() {
  const session = await auth();
  if (session?.user) return true;
  return false;
}
