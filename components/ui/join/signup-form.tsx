"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "../input";
import { Label } from "../label";
import { Switch } from "../switch";
import { bricolage } from "../../../app/fonts";
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
        "sign-up-form"
      ) as HTMLFormElement | null;

      if (form) {
        form.reset();
      }

      setTimeout(() => {
        router.push("/join/login");
      }, 1500);
    }
  }, [messages.successMessage]);

  return (
    <form
      id="sign-up-form"
      action={dispatch}
      className="flex h-2/3 flex-col items-center justify-around drop-shadow *:transition-all md:w-full"
    >
      <div className="flex w-fit flex-col gap-4 rounded-lg bg-gray-50 p-12">
        <h1
          className={`text-3xl ${bricolage.className} text-center font-black`}
        >
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
              className="pl-8 peer"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              aria-describedby="email-error"
              required
            />
            {/* an icon maybe */}
            <AtSymbolIcon className="w-4 top-[0.6rem] left-2 absolute peer-focus:text-black text-gray-500" />
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
              className="pl-8 peer"
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
            {/* an icon maybe */}
            <IdentificationIcon className="w-4 top-[0.6rem] left-2 absolute peer-focus:text-black text-gray-500" />
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
              className="pl-8 peer"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              aria-describedby="username-error"
              required
            />
            {/* an icon maybe */}
            <UserIcon className="w-4 top-[0.6rem] left-2 absolute peer-focus:text-black text-gray-500" />
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
              className="pl-8 peer"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
            />
            {/* an icon maybe */}
            <KeyIcon className="w-4 top-[0.6rem] left-2 absolute peer-focus:text-black text-gray-500" />
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
      className="m-auto w-fit items-center justify-center"
    >
      Sign up
    </Button>
  );
}
