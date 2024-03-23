import { Skeleton } from "../../skeleton";

export default function SearchCourseCardSkeleton() {
  return (
    <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Skeleton className="h-16 w-full" />
      </div>
      <div className="flex flex-col pt-2">
        <div
          className={`line-clamp-2 text-lg font-medium transition group-hover:text-sky-700 md:text-base`}
        >
          <Skeleton className="h-5 w-full" />
        </div>
        <Skeleton className="h-3 w-1/3" />
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <Skeleton className="w-4 rounded-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
        <Skeleton className="h-2 w-full" />
      </div>
    </div>
  );
}
