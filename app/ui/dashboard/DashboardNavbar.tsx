"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import DashboardLinks from "./Links";
import { SearchBar } from "../Search";
import { ProfileImage } from "./ProfileImage";

export function DNavbar() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <nav
      className={clsx(
        "z-30 grid h-fit w-full grid-cols-2 grid-rows-2 items-center gap-1 overflow-clip px-4 pt-2 shadow md:grid-cols-[max-content,1fr,max-content] md:px-12",
        {}
      )}
    >
      <Link href="/" draggable="false">
        <Image
          src="/static/logo.png"
          className="ml-3 w-8 md:ml-0 md:w-fit md:px-6"
          width={100}
          height={100}
          alt="logo"
          draggable="false"
        />
      </Link>

      <div className="hidden md:block md:w-1/2">
        <SearchBar hasButton={true} placeholder="Search for courses..." />
      </div>

      <ProfileImage />

      <div className="col-span-3 row-start-2 flex place-items-center md:flex-row md:gap-1 md:pl-6">
        <DashboardLinks />
      </div>

      {/* hamburger button */}
      <div
        className={`menu col-start-3 px-1 transition-all md:hidden ${isClicked && "menu-expanded"}`}
        onClick={() => setIsClicked(!isClicked)}
      ></div>
    </nav>
  );
}
