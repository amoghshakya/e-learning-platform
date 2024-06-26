"use server";

import prisma from "./prisma";
import {User} from "@prisma/client";
import {auth} from "@/auth";

// for cases like logging in using USERNAME
export async function getUserByUsername(
  username: string,
): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return user || null;
  } catch (err) {
    throw err;
  }
}

// for cases like logging in using EMAIL
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user || null;
  } catch (err) {
    throw err;
  }
}

export async function getUserById(id?: string): Promise<User | null> {
  if (!id) return null;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user || null;
  } catch (err) {
    throw err;
  }
}

export async function getUserImage() {
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

    return !!instructor;

  } catch (err) {
    throw err;
  }
}

export async function getInstructorDetails(userId?: string) {
  if (!userId) return null;
  try {
    const isUserInstructor = await isInstructor(userId);

    if (isUserInstructor) {
      return await prisma.instructor.findUnique({
        where: {
          user_id: userId,
        },
      });
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
}

// for logged user
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

    return !!instructor;

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
      return await prisma.instructor.findUnique({
        where: {
          user_id: userId,
        },
      });
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
}

export async function setUserInstructor(userId?: string) {
  if (!userId) return null;
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isInstructor: true,
      },
    });

    if (user) return user;
    return null;
  } catch (err) {
    throw err;
  }
}

export async function getUserFullName(userId?: string) {
  if (!userId) return null;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
      },
    });

    if (user) return user.name;
    return null;
  } catch (err) {
    throw err;
  }
}
