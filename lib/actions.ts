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
  if (session?.user.id) return session;
  return null;
}

export async function isInstructor(userId: string) {
  if (!userId) return false;
  try {
    const instructor = await prisma.instructor.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (instructor) return true;
    return false;
  } catch (err) {
    throw err;
  }
}

export async function getInstructorDetails(userId?: string) {
  if (!userId) return null;
  try {
    const isUserInstructor = await isInstructor(userId);

    if (isUserInstructor) {
      const instructor = await prisma.instructor.findUnique({
        where: {
          user_id: userId,
        },
      });

      return instructor;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
}

// for loggedin user
export async function isLoggedInInstructor() {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return false;

  try {
    const instructor = await prisma.instructor.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (instructor) return true;
    return false;
  } catch (err) {
    throw err;
  }
}

export async function getLoggedInInstructor() {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return null;

  try {
    const isUserInstructor = await isLoggedInInstructor();

    if (isUserInstructor) {
      const instructor = await prisma.instructor.findUnique({
        where: {
          user_id: userId,
        },
      });

      return instructor;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
}
