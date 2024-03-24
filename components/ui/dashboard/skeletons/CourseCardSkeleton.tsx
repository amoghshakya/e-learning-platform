"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../card";
import { Skeleton } from "../../skeleton";
import { usePathname } from "next/navigation";

export default function CourseCardSkeleton() {
  const pathname = usePathname();
  const isDashboardRoute = pathname === "/dashboard";
  return (
    <Card className="mt-2 items-center justify-start gap-x-2 md:grid md:w-[55vw] md:grid-cols-[100px,1fr,min-content] md:grid-rows-[fit-content,min-content]">
      <Skeleton className="mx-4 h-fit w-full rounded md:col-start-1 md:row-span-2 md:row-start-1 md:h-max">
        <Skeleton className="aspect-video h-auto w-[100px] md:aspect-square" />
      </Skeleton>
      <CardHeader className="flex-grow overflow-hidden md:col-start-2 md:row-span-1">
        <CardTitle className="peer hover:text-sky-800 hover:underline">
          <Skeleton className="h-4 w-full" />
        </CardTitle>
        <CardDescription className="line-clamp-2 peer-hover:underline">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </CardDescription>
        <Skeleton className="h-3 w-28" />
      </CardHeader>
      {isDashboardRoute && (
        <CardContent className="group my-8 hidden border-l border-l-slate-400 *:text-gray-700 md:col-start-3 md:row-span-2 md:block md:w-40">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      )}
      <CardFooter className="flex items-center justify-center gap-1 md:col-start-2 md:row-start-2">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4" />
      </CardFooter>
    </Card>
  );
}
