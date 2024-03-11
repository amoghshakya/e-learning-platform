"use server";

import { z } from "zod";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserByUsername } from "./actions";

const SignUpSchema = z.object({
  email: z.string().email("Please enter a valid email").toLowerCase(),
  name: z.coerce.string().trim(),
  username: z
    .string()
    .toLowerCase()
    .trim()
    .min(3, "Please choose a username with more than 3 characters.")
    .max(20, "Please choose a username 6-20 characters long.")
    .refine(
      (value) => /^[a-zA-Z0-9_]+$/.test(value),
      "Username may only contain alphabets, numbers, and underscores.",
    ),
  password: z
    .string()
    .min(8, "Your password must be a minimum length of 8 characters."),
  isInstructor: z.boolean(),
});

type SignUpState = {
  fieldErrors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
  successMessage?: string | null;
  failureMessage?: string | null;
};

export async function createUser(
  prevData: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
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
        isInstructor: rawFormData.isInstructor || false,
      },
    });

    // is instructor is selected, also create a record in the instructor table
    if (rawFormData.isInstructor) {
      await prisma.instructor.create({
        data: {
          user: { connect: { id: user.id } },
        },
      });
    }

    return {
      successMessage: "Account created succesfully. Please log in.",
    };
  } catch (err) {
    return {
      failureMessage: "Failed to create an account.",
    };
  }
}
