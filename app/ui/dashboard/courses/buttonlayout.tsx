"use client";

import clsx from "clsx";
import { Button } from "../../Button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function MyCoursesButtons() {
  const pathname = usePathname();
  return (
    <div className={clsx("*:*:rounded-full flex gap-1")}>
      <Link href="/dashboard/courses/inprogress">
        <Button
          className={clsx(
            "bg-gray-200 text-text hover:bg-slate-300 active:bg-slate-400",
            {
              "bg-neutral-300":
                pathname === "/dashboard/courses/inprogress",
            }
          )}
        >
          In Progress
        </Button>
      </Link>
      <Link href="/dashboard/courses/completed">
        <Button
          className={clsx(
            "bg-gray-200 text-text hover:bg-slate-300 active:bg-slate-400",
            {
              "bg-neutral-300":
                pathname === "/dashboard/courses/completed",
            }
          )}
        >
          Completed
        </Button>
      </Link>
    </div>
  );
}
