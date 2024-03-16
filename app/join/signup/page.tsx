import { SignUpForm } from "@/components/ui/join/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};
export default function SignUp() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <SignUpForm />
    </div>
  );
}
