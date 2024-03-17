import { Button } from "@/components/ui/button";
import Link from "next/link";
import { inter } from "@/app/fonts";

export default function InstructorCoursesPage() {
  return (
    <div className={`${inter.className}`}>
      <Link href="/instructor/create">
        <Button>Create course</Button>
      </Link>
    </div>
  );
}
