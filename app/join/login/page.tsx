import { LoginForm } from "@/app/ui/join/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
};

export default function Login() {
  return (
    <div>
      <h1>Log in</h1>
      <LoginForm />
    </div>
  );
}
