"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .toLowerCase()
    .trim()
    .min(6, "Username must be greater than 6 characters."),
  password: z.string().min(8, "Passwords must be greater than 8 characters."),
});

type LoginState = {
  errorMessage?: string | null;
  successMessage?: string | null;
};
// login authentication

export async function authenticateLogin(
  prevState: LoginState,
  formData: FormData,
  callbackURL?: string | null
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

    if (user)
      return {
        successMessage: "Logged in successfully.",
      };

    return { errorMessage: "Something went wrong." };
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
