import { Button } from "@/components/ui/button";
import Link from "next/link";
import { body } from "@/app/fonts";

export default function InstructorCoursesPage() {
  return (
    <div className={`${body.className}`}>
      <Link href="/instructors/create">
        <Button>Create course</Button>
      </Link>
    </div>
  );
}
