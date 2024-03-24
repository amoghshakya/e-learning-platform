"use client";

import { Button } from "../button";
import { useToast } from "../use-toast";
import {
  isLoggedInInstructor,
  isUserLoggedIn,
  setUserInstructor,
} from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function UpgradeInstructorButton({
  userId,
}: {
  userId?: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const onApply = async () => {
    const session = await isUserLoggedIn();
    if (!session?.user.id) {
      toast({
        title: "Please log in first!",
      });
      return router.push("/join/login");
    }
    const isUserInstructor = await isLoggedInInstructor();
    if (isUserInstructor) {
      toast({
        title: "User already an instructor.",
      });
    }
    const user = await setUserInstructor(userId);
    if (user) {
      toast({
        title: "Upgraded user to instructor",
        description: "Share your knowledge to the owrjlkjdlskdajf",
      });
    } else {
      toast({
        title: "Error",
        description: "Something went wrong. Try again later!",
        variant: "destructive",
      });
    }
  };
  return <Button onClick={onApply}>Apply</Button>;
}
