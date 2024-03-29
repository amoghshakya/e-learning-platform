"use client";

import {
  UserIcon,
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { heading } from "@/app/fonts";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { authenticateLogin } from "@/lib/login";
import Link from "next/link";
import { SocialLogins } from "./social-login";
import { LoadingCircleIcon } from "@/components/loading-spinner";
import { Separator } from "../separator";

export function LoginForm() {
  const initialState = { errorMessage: null, successMessage: null };
  const [messages, dispatch] = useFormState(authenticateLogin, initialState);

  return (
    <form
      action={dispatch}
      className="flex h-full w-full flex-col items-center justify-center md:border border-slate-200 bg-slate-100 *:transition-all md:h-full"
    >
      <div className="justify-items flex flex-col justify-center gap-4 rounded-lg p-12 md:shadow md:h-fit md:bg-slate-50">
        <h1 className={`text-center text-3xl font-black ${heading.className}`}>
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
            <UserIcon className="absolute left-2 top-[0.6rem] w-4 text-gray-500 peer-focus:text-black" />
          </div>
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              className="peer pl-8"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
            {/* an icon maybe */}
            <KeyIcon className="absolute left-2 top-[0.6rem] w-4 text-gray-500 peer-focus:text-black" />
          </div>
        </div>

        <p className="text-center text-sm opacity-90">
          Don&apos;t have an account?{" "}
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
        <Separator orientation="horizontal" />
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
      {pending ? (
        <LoadingCircleIcon className="h-4 w-4 animate-spin" />
      ) : (
        "Log in"
      )}
    </Button>
  );
}
