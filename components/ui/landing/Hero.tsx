import { heading } from "@/app/fonts";
import clsx from "clsx";
import heroIllustration from "@/public/static/hero_illu.svg";
import Image from "next/image";
import { SearchBar } from "../../Search";

import { Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import SearchBarSkeleton from "@/components/skeletons/SearchSkeleton";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

function Hero() {
  return (
    <section
      className={`grid w-fit grid-cols-1 p-16 md:grid-cols-2 md:grid-rows-[1fr,min-content,1fr] md:gap-4 md:px-32 md:py-8 md:pr-4`}
    >
      <h5
        className={`${space_grotesk.className} text-lg font-[500] md:col-start-1 md:row-start-1 md:self-end`}
      >
        Welcome to SikshaYatri,
      </h5>
      <h1
        className={clsx(
          "text-5xl font-[800] md:col-start-1 md:row-start-2 md:place-self-center",
          heading.className,
        )}
      >
        What would you like to learn{" "}
        <span className="bg-gradient-to-tr from-blue-600 via-pink-700 to-foreground bg-clip-text text-transparent">
          today?
        </span>
      </h1>

      <Image
        src={heroIllustration}
        width={100}
        height={100}
        alt="an illustration of a woman watching a video on a computer"
        draggable={false}
        className="hidden md:col-start-2 md:row-span-3 md:block md:w-max"
        priority
      />

      <div className="hidden content-center md:col-start-1 md:row-start-3 md:block">
        <Suspense fallback={<SearchBarSkeleton />}>
          <SearchBar
            type="search"
            placeholder="Search for courses..."
            hasButton={true}
          />
        </Suspense>
        <Link
          href="/courses"
          className="group ml-1 flex items-center text-xs text-muted-foreground hover:underline"
        >
          Browse all courses{" "}
          <ArrowRightIcon className="ml-1 h-3 w-3 transition-all group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

export default Hero;
