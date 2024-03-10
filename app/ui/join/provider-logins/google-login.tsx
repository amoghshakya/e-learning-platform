"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export function GoogleLogin() {
  return (
    <button
      title="Sign in with Google"
      type="reset"
      className="w-full rounded border border-gray-200 p-3 shadow hover:bg-gray-200 hover:shadow-md"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      <div className="flex items-center justify-evenly gap-2">
        <div className="">
          <Image
            src={"/static/google-logo.svg"}
            alt="Google logo"
            width={50}
            height={50}
            className="w-5"
          />
        </div>
        <span className={`hidden`}>Sign in with Google</span>
      </div>
    </button>
  );
}
