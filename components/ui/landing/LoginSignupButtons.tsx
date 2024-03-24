import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import { useEffect, useState } from "react";

export function NavButtons() {
  const [isLoggedIn, setUser] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await auth();
        console.log(session?.user.id);
        setUser(!!session?.user.id);
      } catch (err) {
        console.log("Fetch Session Auth Error: ", err);
      }
    };
    fetchSession();
  }, []);
  console.log("User logged in: ", isLoggedIn);

  return isLoggedIn ? (
    <Link href="/dashboard">
      <Button>Go to dashboard</Button>
    </Link>
  ) : (
    <>
      <Link href="/join/login">
        <Button variant="ghost">Log in</Button>
      </Link>
      <Link href="/join/signup">
        <Button>Sign up</Button>
      </Link>
    </>
  );
}
