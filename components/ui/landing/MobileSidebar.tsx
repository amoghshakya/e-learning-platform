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
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Sheet>
      <SheetTrigger>
        <Bars2Icon className="w-6 h-6 md:hidden m-2" />
      </SheetTrigger>
      <SheetContent className="grid grid-cols-1 grid-rows-[1fr,min-content] pt-20 pb-10 text-sm text-gray-600">
        <ul className="place-self-end self-start col-start-1 row-start-1 flex flex-col justify-end items-end gap-2">
          {links.map((link) => {
            const ListIcon = link.icon;
            return (
              <li
                className={clsx(
                  "relative border border-transparent flex items-center gap-4 py-2 px-4",
                  {
                    "border-r-primary border-2 font-semibold text-black":
                      pathname === link.href,
                  }
                )}
                key={link.key}
              >
                <Link href={link.href}>{link.label}</Link>
                <ListIcon className="w-6 h-6" />
              </li>
            );
          })}
        </ul>
        <div className="col-start-1 row-start-2 self-end place-self-end flex gap-2">
          <NavButtons />
        </div>
      </SheetContent>
    </Sheet>
  );
}
