"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../Button";
import { bricolage } from "../fonts";
import { ToggleSwitch } from "./toggle-switch";
import {
  AtSymbolIcon,
  KeyIcon,
  IdentificationIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { createUser } from "@/lib/actions";

export function SignUpForm() {
  const initialState = {
    errors: {},
    message: null,
  };
  const [errorMessage, dispatch] = useFormState(createUser, initialState);

  return (
    <form action={dispatch}>
      {errorMessage.message}
      <div className="flex flex-1 flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`text-3xl ${bricolage.className}`}>Create an account</h1>

        {/* Email */}
        <div>
          <label htmlFor="email">
            Email
            <span className="text-xs text-gray-600" aria-disabled>
              *
            </span>
          </label>
          <div className="relative">
            <input
              className="join-input peer"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              aria-describedby="email-error"
              required
            />
            {/* an icon maybe */}
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {errorMessage.errors?.email &&
              errorMessage.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div>
          {/* First name */}
          <div>
            <label htmlFor="first_name">
              First name
              <span className="text-xs text-gray-600" aria-disabled>
                *
              </span>
            </label>
            <div className="relative">
              <input
                className="join-input peer"
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First name"
                required
              />
              {/* an icon maybe */}
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {/* Last name */}
          <div>
            <label htmlFor="last_name">Last name</label>
            <div className="relative">
              <input
                className="join-input peer"
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last name"
              />
              {/* an icon maybe */}
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username">
            Username
            <span className="text-xs text-gray-600" aria-disabled>
              *
            </span>
          </label>
          <div className="relative">
            <input
              className="join-input peer"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              aria-describedby="username-error"
              required
            />
            {/* an icon maybe */}
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id="username-error" aria-live="polite" aria-atomic="true">
            {errorMessage.errors?.username &&
              errorMessage.errors.username.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">
            Password
            <span className="text-xs text-gray-600" aria-disabled>
              *
            </span>
          </label>
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
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {errorMessage.errors?.password &&
              errorMessage.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Also sign up as an instructor option */}
        <div>
          <ToggleSwitch name="instructor" id="instructor" />
          <label htmlFor="instructor">Sign up as instructor</label>
        </div>

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
