import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "../../button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCourse from "@/app/instructors/create/create-course-form";

export default function CreateCourseButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What would you like to name your course?</DialogTitle>
          <DialogDescription>
            You can always change the title and description later in the Course
            Edit page. Your course will not be immediately published when you
            click on the create button.
          </DialogDescription>
        </DialogHeader>
        <CreateCourse />
      </DialogContent>
    </Dialog>
  );
}
