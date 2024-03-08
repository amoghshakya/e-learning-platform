import { LoginForm } from "@/app/ui/join/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
};

export default function Login() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoginForm />
    </div>
  );
}
