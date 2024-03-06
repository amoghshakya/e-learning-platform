"use client";

import { UserIcon, KeyIcon } from "@heroicons/react/24/outline";
import { bricolage } from "../fonts";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../Button";
import { authenticateLogin } from "@/lib/actions";

export function LoginForm() {
  const initialState = { error: null, message: null };
  const [errorMessages, dispatch] = useFormState(
    authenticateLogin,
    initialState,
  );

  return (
    <form action={dispatch}>
      <div className="flex flex-1 flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`text-3xl ${bricolage.className}`}>
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
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
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
