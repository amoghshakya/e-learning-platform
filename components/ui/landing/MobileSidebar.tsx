import clsx from "clsx";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";
import { useState } from "react";
import { Bars2Icon } from "@heroicons/react/24/outline";
import { NAV_LINKS as links } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavButtons } from "./LoginSignupButtons";

export default function MobileSidebar() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <Bars2Icon className="m-2 h-6 w-6 md:hidden" />
      </SheetTrigger>
      <SheetContent className="grid grid-cols-1 grid-rows-[1fr,min-content] pb-10 pt-20 text-sm text-gray-600">
        <ul className="col-start-1 row-start-1 flex flex-col items-end justify-end gap-2 place-self-end self-start">
          {links.map((link) => {
            const ListIcon = link.icon;
            return (
              <li
                className={clsx(
                  "relative flex items-center gap-4 border border-transparent px-4 py-2",
                  {
                    "border-2 border-r-primary font-semibold text-black":
                      pathname.startsWith(link.href),
                  },
                )}
                key={link.key}
              >
                <Link href={link.href}>{link.label}</Link>
                <ListIcon className="h-6 w-6" />
              </li>
            );
          })}
        </ul>
        <div className="col-start-1 row-start-2 flex gap-2 place-self-end self-end">
          <NavButtons />
        </div>
      </SheetContent>
    </Sheet>
  );
}
