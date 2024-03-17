import clsx from "clsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasButton?: boolean | undefined;
}

export function SearchBar({ hasButton, className, ...rest }: SearchProps) {
  return (
    <div className={clsx("relative md:flex md:gap-2", className)}>
      <input
        {...rest}
        className="peer block w-full rounded-md bg-gray-100 py-[9px] pl-10 text-sm outline-none outline-2 placeholder:text-gray-500 hover:bg-slate-200 focus:bg-sky-100"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      <Button className={clsx({ hidden: !hasButton }, { block: hasButton })}>
        Search
      </Button>
    </div>
  );
}
