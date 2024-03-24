import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "@/lib/actions";
import { type Session } from "@auth/core/types";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function NavButtons() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    if (session?.user.id) {
      setUser(true);
    }
  }, [user, session]);

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
