"use client";

import {
  UserIcon,
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { heading } from "../../../app/fonts";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { authenticateLogin } from "@/lib/login";
import Link from "next/link";
import { SocialLogins } from "./social-login";

export function LoginForm() {
  const initialState = { errorMessage: null, successMessage: null };
  const [messages, dispatch] = useFormState(authenticateLogin, initialState);

  return (
    <form
      action={dispatch}
      className="flex h-2/3 flex-col items-center justify-around drop-shadow *:transition-all"
    >
      <div className="flex flex-col gap-4 rounded-lg bg-gray-50 px-12 py-12 h-full">
        <h1 className={`text-3xl font-black text-center ${heading.className}`}>
          Log in to your account
        </h1>
        {/* Username */}
        <div>
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <Input
              className="peer pl-8"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
            />
            {/* an icon maybe */}
            <UserIcon className="w-4 top-[0.6rem] left-2 absolute peer-focus:text-black text-gray-500" />
          </div>
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              className="pl-8 peer"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
            {/* an icon maybe */}
            <KeyIcon className="w-4 top-[0.6rem] left-2 absolute peer-focus:text-black text-gray-500" />
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
        <SocialLogins />
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
