"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export function GitHubLogin() {
  return (
    <button
      title="Sign in with GitHub"
      type="reset"
      className="w-full rounded border border-slate-200 p-3 shadow hover:bg-slate-200 hover:shadow-md"
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
    >
      <div className="flex items-center justify-evenly gap-2">
        <div>
          <Image
            src={"/static/github-mark.svg"}
            alt="GitHub Logo"
            width={50}
            height={50}
            className="w-5"
          />
          <span className="hidden">Sign in with GitHub</span>
        </div>
      </div>
    </button>
  );
}
