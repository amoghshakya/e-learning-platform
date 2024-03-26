import { SignUpForm } from "@/components/ui/join/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};
export default function SignUp() {
  return (
    <div className="h-full flex-grow">
      <SignUpForm />
    </div>
  );
}
