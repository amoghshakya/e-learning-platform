import {
  isLoggedInInstructor,
  isUserLoggedIn,
  setUserInstructor,
} from "@/lib/actions";
import { Button } from "../button";
import Link from "next/link";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "../use-toast";
import UpgradeInstructorButton from "./upgrade-instructor-button";

export default async function InstructorsButtons() {
  const session = await isUserLoggedIn();
  const userId = session?.user.id;
  const isUserInstructor = await isLoggedInInstructor();
  const upgradeToInstructors = async () => {
    if (isUserInstructor) {
      return;
    }
    const user = await setUserInstructor(userId);
  };
  return (
    <>
      {isUserInstructor ? (
        <Link href="/instructors/courses">
          <Button>Manage your courses</Button>
        </Link>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Become an instructor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for instructor</DialogTitle>
              <DialogDescription>
                Once you apply for instructor, you cannot revert it. You may
                have to wait a couple hours before trying to create a course.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <UpgradeInstructorButton userId={userId} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
