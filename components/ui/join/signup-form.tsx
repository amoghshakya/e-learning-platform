"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "../input";
import { Label } from "../label";
import { Switch } from "../switch";
import { heading } from "../../../app/fonts";
import { ToggleSwitch } from "./toggle-switch";
import {
  AtSymbolIcon,
  KeyIcon,
  IdentificationIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { createUser } from "@/lib/signup";
import Link from "next/link";
import React, { useEffect } from "react";

import { redirect, useRouter } from "next/navigation";
import { SocialLogins } from "./social-login";
import { LoadingCircleIcon } from "@/components/loading-spinner";
import { Separator } from "../separator";

export function SignUpForm() {
  const router = useRouter();
  const initialState = {
    fieldErrors: {},
    successMessage: null,
    failureMessage: null,
  };
  const [messages, dispatch] = useFormState(createUser, initialState);

  useEffect(() => {
    if (messages.successMessage) {
      const form = document.getElementById(
        "sign-up-form",
      ) as HTMLFormElement | null;

      if (form) {
        form.reset();
      }

      setTimeout(() => {
        router.push("/join/login");
      }, 1500);
    }
  }, [messages.successMessage, router]);

  return (
    <form
      id="sign-up-form"
      action={dispatch}
      className="flex h-full flex-col items-center justify-around border-slate-200 bg-slate-100 *:transition-all md:w-full md:border"
    >
      <div className="flex w-fit flex-col gap-4 rounded-lg p-12 md:bg-slate-50 md:shadow">
        <h1 className={`text-3xl ${heading.className} text-center font-black`}>
          Create an account
        </h1>

        {/* Email */}
        <div>
          <Label htmlFor="email">
            Email
            <span className="text-xs text-gray-600" aria-disabled>
              *
            </span>
          </Label>
          <div className="relative">
            <Input
              className="peer pl-8"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              aria-describedby="email-error"
              required
            />
            {/* an icon maybe */}
            <AtSymbolIcon className="absolute left-2 top-[0.6rem] w-4 text-gray-500 peer-focus:text-black" />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {messages.fieldErrors?.email &&
              messages.fieldErrors.email.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* name */}
        <div>
          <Label htmlFor="name">
            Name
            <span className="text-xs text-gray-600" aria-disabled>
              *
            </span>
          </Label>
          <div className="relative">
            <Input
              className="peer pl-8"
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
            {/* an icon maybe */}
            <IdentificationIcon className="absolute left-2 top-[0.6rem] w-4 text-gray-500 peer-focus:text-black" />
          </div>
        </div>

        {/* Username */}
        <div>
          <Label htmlFor="username">
            Username
            <span className="text-xs text-gray-600" aria-disabled>
              *
            </span>
          </Label>
          <div className="relative">
            <Input
              className="peer pl-8"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              aria-describedby="username-error"
              required
            />
            {/* an icon maybe */}
            <UserIcon className="absolute left-2 top-[0.6rem] w-4 text-gray-500 peer-focus:text-black" />
          </div>
          <div id="username-error" aria-live="polite" aria-atomic="true">
            {messages.fieldErrors?.username &&
              messages.fieldErrors.username.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">
            Password
            <span className="text-xs text-gray-600" aria-disabled>
              *
            </span>
          </Label>
          <div className="relative">
            <Input
              className="peer pl-8"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
            />
            {/* an icon maybe */}
            <KeyIcon className="absolute left-2 top-[0.6rem] w-4 text-gray-500 peer-focus:text-black" />
          </div>
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {messages.fieldErrors?.password &&
              messages.fieldErrors.password.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Also sign up as an instructor option */}
        <div className="flex items-center gap-2">
          <Switch name="instructor" id="instructor" />
          <Label htmlFor="instructor" className="text-sm">
            Sign up as instructor
          </Label>
        </div>

        <p className="text-center text-sm opacity-90">
          Already have an account?{" "}
          <Link href="/join/login" className="text-blue-700 hover:underline">
            Log in here
          </Link>
        </p>
        {messages.failureMessage ? (
          <div className="flex items-center justify-start gap-2 rounded border border-red-300 bg-red-200 p-3">
            <XCircleIcon className="h-auto w-5 text-red-600" />
            <p className="text-center text-xs text-red-600">
              {messages.failureMessage}
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
        <SignUpButton />
      </div>
    </form>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      aria-disabled={pending}
      className="m-auto w-max items-center justify-center"
    >
      {pending ? (
        <LoadingCircleIcon className="h-4 w-4 animate-spin" />
      ) : (
        "Sign up"
      )}
    </Button>
  );
}
