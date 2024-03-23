"use client";

import clsx from "clsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import qs from "query-string";
import SearchBarSkeleton from "./skeletons/SearchSkeleton";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasButton?: boolean | undefined;
}

export function SearchBar({ hasButton, className, ...rest }: SearchProps) {
  const [value, setValue] = useState(useSearchParams().get("title" || ""));
  const [debouncedValue, setDebouncedValue] = useDebounce(value, 400);

  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");

  const searchBarRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (pathname == "/courses/search") {
      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: {
            categoryId: currentCategoryId,
            title: debouncedValue,
          },
        },
        { skipEmptyString: true, skipNull: true },
      );
      router.push(url);
    }
  }, [debouncedValue, currentCategoryId, router, pathname]);

  const handleButtonClick = () => {
    if (!pathname.startsWith("/courses/search")) {
      if (value === null) return;
      router.push(`/courses/search?title=${value}`);
    }
  };

  return (
    <div className={clsx("relative md:flex md:gap-2", className)}>
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value ?? ""}
        {...rest}
        className="peer block rounded-md bg-gray-100 py-[9px] pl-10 text-sm outline-none outline-2 placeholder:text-gray-500 hover:bg-slate-200 focus:bg-sky-100 md:w-[400px]"
        ref={searchBarRef}
      />
      <Button
        className={clsx({ hidden: !hasButton }, { block: hasButton })}
        onClick={handleButtonClick}
        type="submit"
      >
        Search
      </Button>

      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
