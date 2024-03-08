"use client";

import {
  UserIcon,
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { bricolage } from "../fonts";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../Button";
import { authenticateLogin } from "@/lib/actions";
import Link from "next/link";

export function LoginForm() {
  const initialState = { errorMessage: null, successMessage: null };
  const [messages, dispatch] = useFormState(authenticateLogin, initialState);

  return (
    <form
      action={dispatch}
      className="flex h-2/3 flex-col items-center justify-around drop-shadow *:transition-all"
    >
      <div className="flex flex-col gap-4 rounded-lg bg-gray-50 px-12 py-12">
        <h1 className={`text-3xl font-[900] ${bricolage.className}`}>
          Log in to your account
        </h1>
        {/* Username */}
        <div>
          <label htmlFor="username">Username</label>
          <div className="relative">
            <input
              className="join-input peer"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              required
            />
            {/* an icon maybe */}
            <UserIcon className="join-icon" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              className="join-input peer"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
            />
            {/* an icon maybe */}
            <KeyIcon className="join-icon" />
          </div>
        </div>

        <p className="text-center text-sm opacity-90">
          Don't have an account?{" "}
          <Link href="/join/signup" className="text-blue-700 hover:underline">
            Sign up here
          </Link>
        </p>
        {messages.errorMessage ? (
          <div className="flex items-center justify-start gap-2 rounded border border-red-300 bg-red-200 p-3">
            <XCircleIcon className="h-auto w-5 text-red-600" />
            <p className="text-center text-xs text-red-600">
              {messages.errorMessage}
            </p>
          </div>
        ) : (
          messages.successMessage && (
            <div className="flex items-center justify-start gap-2 rounded border border-green-300 bg-green-200 p-3">
              <CheckCircleIcon className="h-auto w-5 text-green-600" />
              <p className="text-center text-xs text-green-600">
                {messages.successMessage}
              </p>
            </div>
          )
        )}
        <LogInButton />
      </div>
    </form>
  );
}

function LogInButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      disabled={pending}
      className="m-auto w-fit items-center justify-center"
    >
      Log in
    </Button>
  );
}
