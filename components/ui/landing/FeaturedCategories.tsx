"use client";

import { body, heading } from "@/app/fonts";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import FeaturedCategoryList from "./FeaturedCategoryList";
import { useRef } from "react";

export default function FeaturedCategories() {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const handleLeftScroll = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollLeft -= 200;
    }
  };
  const handleRightScroll = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollLeft += 200;
    }
  };
  return (
    <div className={`${body.className} my-4 space-y-4 p-16 md:px-32 md:py-10`}>
      <div className="flex items-center justify-between">
        <h2 className={`${heading.className} font-bold md:text-2xl`}>
          Categories
        </h2>
        <div className="inline-flex *:cursor-pointer *:text-slate-500 hover:*:text-primary">
          <ChevronLeftIcon
            className="mr-2 h-5 w-5"
            onClick={handleLeftScroll}
          />
          <ChevronRightIcon
            className="mr-2 h-5 w-5"
            onClick={handleRightScroll}
          />
        </div>
      </div>
      <div
        id="category-scroll"
        className="flex snap-x gap-x-4 overflow-scroll scroll-smooth *:select-none md:gap-x-4"
        ref={categoriesRef}
      >
        <FeaturedCategoryList />
      </div>
    </div>
  );
}
