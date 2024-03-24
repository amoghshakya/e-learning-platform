import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "@/lib/actions";
import { type Session } from "@auth/core/types";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function NavButtons() {
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await auth();
        if (session?.user.id) {
          setUser(true);
        }
      } catch (err) {
        console.log("Fetch Session Auth Error: ", err);
      }

      fetchSession();
    };
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
