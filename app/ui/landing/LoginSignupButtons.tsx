import { Button } from "../Button";
import Link from "next/link";
import { auth } from "@/auth";

export async function NavButtons() {
  const session = await auth();

  if (session?.user)
    return (
      <Link href="/dashboard">
        <Button>Go to dashboard</Button>
      </Link>
    );

  return (
    <>
      <Link href="/join/login">
        <Button className="!bg-transparent text-text hover:!bg-zinc-200">
          Log in
        </Button>
      </Link>
      <Link href="/join/signup">
        <Button>Sign up</Button>
      </Link>
    </>
  );
}
