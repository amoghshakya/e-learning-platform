"use server";

import { z } from "zod";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";

const SignUpSchema = z.object({
  email: z.string().email("Please enter a valid email").toLowerCase(),
  name: z.coerce.string(),
  username: z
    .string()
    .toLowerCase()
    .min(6, "Please choose a username 6-20 characters long")
    .max(20, "Please choose a username 6-20 characters long"),
  password: z
    .string()
    .min(8, "Your password must be a minimum length of 8 characters."),
  isInstructor: z.boolean(),
});

export type State = {
  fieldErrors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
  successMessage?: string | null;
  failureMessage?: string | null;
};

export async function createUser(
  prevData: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = SignUpSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    username: formData.get("username"),
    password: formData.get("password"),
    isInstructor: Boolean(formData.get("instructor")),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      failureMessage: "Invalid fields.",
    };
  }

  const rawFormData = validatedFields.data;

  try {
    // hashing the password
    const hashedPassword = await bcrypt.hash(rawFormData.password, 10);

    // check if the email is already in use
    const emailExists = await getUserByEmail(rawFormData.email);

    if (emailExists) {
      return {
        fieldErrors: {
          email: ["Email already in use."],
        },
      };
    }

    // check if the username is already in use
    const usernameExists = await getUserByUsername(rawFormData.username);

    if (usernameExists) {
      return {
        fieldErrors: {
          username: ["Username already in use."],
        },
      };
    }

    // create the user
    const user = await prisma.user.create({
      data: {
        email: rawFormData.email,
        name: rawFormData.name,
        username: rawFormData.username,
        password: hashedPassword,
        isInstructor: rawFormData.isInstructor,
      },
    });

    // is instructor is selected, also create a record in the instructor table
    if (rawFormData.isInstructor) {
      await prisma.instructor.create({
        data: {
          user: { connect: { user_id: user.user_id } },
        },
      });
    }

    return {
      successMessage: "Account created succesfully. Please log in.",
    };
  } catch (err) {
    console.log(err);
    return {
      failureMessage: "Failed to create an account.",
    };
  }
}

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

const loginSchema = z.object({
  username: z.string().min(6, "Username must be greater than 6 characters."),
  password: z.string().min(8, "Passwords must be greater than 8 characters."),
});

export type LoginState = {
  errorMessage?: string | null;
  successMessage?: string | null;
};

// login authentication
export async function authenticateLogin(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const validatedFields = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errorMessage: "Invalid credentials.",
    };
  }

  const userCredentials = validatedFields.data;

  try {
    const user = await signIn("credentials", userCredentials);

    return {
      successMessage: "Logged in successfully.",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errorMessage: "Invalid credentials.",
          };
        default:
          return {
            errorMessage: "Something went wrong.",
          };
      }
    }

    throw error;
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });

    return user ? user : undefined;
  } catch (err) {
    throw err;
  }
}
