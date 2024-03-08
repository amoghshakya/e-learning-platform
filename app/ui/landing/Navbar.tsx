"use client";

import Image from "next/image";
import { Button } from "../Button";
import Link from "next/link";
import { NAV_LINKS as links } from "@/constants";
import { useState } from "react";
import clsx from "clsx";
import { auth } from "@/auth";

async function Buttons() {
  const session = await auth();

  if (session?.user)
    return (
      <Link href="/dashboard">
        <Button>Go to dashboard</Button>
      </Link>
    );

  return (
    <>
      <Link href="/join/login">
        <Button className="!bg-transparent text-text hover:!bg-zinc-300">
          Log in
        </Button>
      </Link>
      <Link href="/join/signup">
        <Button>Sign up</Button>
      </Link>
    </>
  );
}

export default function NavBar() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <nav
      className={clsx(
        "z-30 grid h-fit w-screen grid-cols-2 grid-rows-1 items-center gap-4 overflow-clip p-4 shadow md:grid-cols-[max-content,1fr,max-content] md:px-12",
        {},
      )}
    >
      <Link href="/" draggable="false">
        <Image
          src={"/static/logo.svg"}
          className="ml-3 w-8 md:ml-0 md:w-fit md:px-6"
          width={100}
          height={100}
          alt="logo"
          draggable="false"
        />
      </Link>

      <ul className="md:cols-start-2 hidden h-full items-center gap-10 text-nowrap text-sm text-gray-600 md:flex">
        {links &&
          links.map((link) => (
            <Link
              className="w-max font-medium transition-all hover:text-text"
              href={link.href}
              key={link.key}
            >
              {link.label}
            </Link>
          ))}
      </ul>

      <div className="hidden justify-end gap-1 md:col-start-3 md:flex">
        <Buttons />
      </div>

      {/* hamburger button */}
      <div
        className={`menu col-start-3 px-1 transition-all md:hidden ${isClicked && "menu-expanded"}`}
        onClick={() => setIsClicked(!isClicked)}
      ></div>
    </nav>
  );
}
