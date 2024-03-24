import { Skeleton } from "../../skeleton";

export default function CourseIdPageSkeleton() {
  return (
    <main className="overflow-clip">
      <div className="grid grid-cols-1 grid-rows-3 gap-6 overflow-x-clip bg-slate-50 md:grid-cols-2">
        <section className="relative col-span-1 row-start-1 h-[300px] w-screen shadow-inner md:col-span-2">
          <Skeleton className="h-full w-full" />
        </section>
        <div className="flex flex-col gap-y-4 bg-slate-50 pl-24">
          <div className="flex flex-col">
            <Skeleton className="h-8 w-2/5" />
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-3 w-12" />
          </div>

          <div className="md:col-start-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <div>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 space-y-3 bg-slate-50 pr-16 md:col-start-2">
          <Skeleton className="h-4 w-16" />
          <div className="flex flex-col gap-y-2 rounded-md border border-slate-200 bg-slate-100 p-2 text-sm shadow">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
