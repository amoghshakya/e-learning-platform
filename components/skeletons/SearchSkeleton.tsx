import { Skeleton } from "../ui/skeleton";

export default function SearchBarSkeleton() {
  return (
    <div className={"relative md:flex md:gap-2"}>
      <Skeleton className="peer block rounded-md bg-gray-100 py-[9px] pl-10 text-sm outline-none outline-2 placeholder:text-gray-500 hover:bg-slate-200 focus:bg-sky-100 md:w-[400px]" />
      <Skeleton className="h-10 w-16" />
    </div>
  );
}
