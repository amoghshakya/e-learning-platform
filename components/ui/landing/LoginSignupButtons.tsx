import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "@/lib/actions";

export function NavButtons() {
  const [isLoggedIn, setUser] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const userLoggedIn = await isUserLoggedIn();
        setUser(!!userLoggedIn?.user.id);
      } catch (err) {
        console.log("Fetch Session Auth Error: ", err);
      }
    };
    fetchSession();
  }, []);

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
