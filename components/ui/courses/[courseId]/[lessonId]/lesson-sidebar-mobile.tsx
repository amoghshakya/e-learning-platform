import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bars2Icon } from "@heroicons/react/24/outline";
import MobileLessonContent from "./mobile-sidebar-content";
import AttachmentList from "./attachments-list";

export default async function MobileLessonSidebar({
  courseId,
  lessonId,
}: {
  courseId: string;
  lessonId: string;
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <Bars2Icon className="mr-2 h-6 w-6 " />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <MobileLessonContent courseId={courseId} lessonId={lessonId} />
        <div className="m-2 bg-slate-200 p-4">
          <AttachmentList courseId={courseId} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
