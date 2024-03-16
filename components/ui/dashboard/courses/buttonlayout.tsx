"use client";

import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export function MyCoursesButtons() {
  const pathname = usePathname();
  return (
    <div className={clsx("*:*:rounded-full flex gap-1")}>
      <Link href="/dashboard/courses/inprogress">
        <Button
          variant={`${pathname === "/dashboard/courses/inprogress" ? "default" : "secondary"}`}
        >
          <ClockIcon className="h-4 w-4 mr-2" />
          In Progress
        </Button>
      </Link>
      <Link href="/dashboard/courses/completed">
        <Button
          variant={`${pathname === "/dashboard/courses/completed" ? "default" : "secondary"}`}
        >
          <CheckCircleIcon className="h-4 w-4 mr-2" />
          Completed
        </Button>
      </Link>
    </div>
  );
}
