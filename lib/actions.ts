"use server";

import { z } from "zod";
import prisma from "./prisma";
import { User } from "@prisma/client";
import { auth } from "@/auth";

// for cases like logging in using USERNAME
export async function getUserByUsername(
  username: string,
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
  const session = await auth();
  if (session) {
    console.log(session.user.image);
    return session.user.image;
  }

  return "";
}
