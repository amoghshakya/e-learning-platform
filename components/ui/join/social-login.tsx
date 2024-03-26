import { signIn } from "next-auth/react";
import { GitHubLogin } from "./provider-logins/github-login";
import { GoogleLogin } from "./provider-logins/google-login";

export function SocialLogins() {
  return (
    <div className="flex w-full items-center justify-center gap-2 *:transition-all">
      <GoogleLogin />
      <GitHubLogin />
    </div>
  );
}
