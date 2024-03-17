"use client";

import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS as links } from "@/constants";
import clsx from "clsx";
import { NavButtons } from "./LoginSignupButtons";
import { usePathname } from "next/navigation";
import { inter } from "@/app/fonts";
import MobileSidebar from "./MobileSidebar";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        "z-30 grid h-16 md:h-fit w-screen grid-cols-2 grid-rows-1 items-center gap-4 overflow-clip p-4 shadow md:grid-cols-[max-content,1fr,max-content] md:px-12",
        inter.className
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

      {pathname && (
        <ul className="md:cols-start-2 hidden h-full items-center gap-10 text-nowrap text-sm text-gray-600 md:flex">
          {links &&
            links.map((link) => (
              <Link
                className={clsx(
                  "w-max font-medium transition-all hover:text-text",
                  { "text-text font-semibold  ": pathname === link.href }
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
        <div className="col-start-3 md:hidden self-center place-self-start">
          <MobileSidebar />
        </div>
      )}
    </nav>
  );
}
