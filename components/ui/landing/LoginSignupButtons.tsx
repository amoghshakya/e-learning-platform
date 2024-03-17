import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import { useEffect, useState } from "react";
import { Session } from "@auth/core/types";
import { useSession } from "next-auth/react";
import { isUserLoggedIn } from "@/lib/actions";

export function NavButtons() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const fetchSession = async () => {
      const userLoggedIn = await isUserLoggedIn();
      setUser(userLoggedIn);
    };

    fetchSession();
  }, []);

  return user ? (
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
