"use client";

import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS as links } from "@/constants";
import clsx from "clsx";
import { NavButtons } from "./LoginSignupButtons";
import { usePathname } from "next/navigation";
import { body } from "@/app/fonts";
import MobileSidebar from "./MobileSidebar";
import { SearchBar } from "@/components/Search";
import { useSession } from "next-auth/react";
import SearchBarSkeleton from "@/components/skeletons/SearchSkeleton";
import { Suspense } from "react";

export default function NavBar({
  showSearch,
  showLinks,
}: {
  showSearch?: boolean;
  showLinks?: boolean;
}) {
  const pathname = usePathname();

  const isCoursesIdPage = pathname.startsWith("/courses/cl");
  const isLanding = pathname === "/";

  return (
    <>
      <nav
        className={clsx(
          "z-30 grid h-16 w-full grid-cols-2 grid-rows-1 items-center gap-4 overflow-x-clip bg-slate-50 p-4 shadow md:h-fit md:grid-cols-[max-content,1fr,max-content] md:px-12",
          body.className,
        )}
      >
        <Link href="/" draggable="false">
          <Image
            src={"/static/logo.png"}
            className="ml-3 w-fit md:ml-0 md:w-fit md:px-6"
            width={100}
            height={100}
            alt="logo"
            draggable="false"
            priority
          />
        </Link>
        {showSearch && (
          <>
            <div className="hidden md:block">
              <Suspense fallback={<SearchBarSkeleton />}>
                <SearchBar
                  placeholder="Search courses..."
                  hasButton={isCoursesIdPage}
                />
              </Suspense>
            </div>
          </>
        )}{" "}
        {showLinks && (
          <ul className="md:cols-start-2 hidden h-full items-center gap-10 text-nowrap text-sm text-gray-600 md:flex">
            {links &&
              links.map((link) => (
                <Link
                  className={clsx(
                    "hover:text-text w-max font-medium transition-all",
                    { "text-text font-semibold  ": pathname === link.href },
                  )}
                  href={link.href}
                  key={link.key}
                >
                  {link.label}
                </Link>
              ))}
          </ul>
        )}
        <div className="hidden justify-end gap-1 md:col-start-3 md:flex">
          <NavButtons />
        </div>
        {/* hamburger button */}
        {!pathname.startsWith("/dashboard") && (
          <div className="col-start-3 place-self-start self-center md:hidden">
            <MobileSidebar />
          </div>
        )}
      </nav>
    </>
  );
}
