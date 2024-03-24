"use client";

import Link from "next/link";
import clsx from "clsx";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export const links = [
  {
    label: "Home",
    href: "/dashboard",
    key: "dashboard_home",
    icon: HomeIcon,
  },
  {
    label: "My lists",
    href: "/dashboard/lists",
    key: "progress",
    icon: ClipboardDocumentListIcon,
  },
  {
    label: "My courses",
    href: "/dashboard/courses",
    key: "courses",
    icon: BookOpenIcon,
  },
  // {
  //   label: "Settings",
  //   href: "/dashboard/settings",
  //   key: "settings",
  //   icon: Cog6ToothIcon,
  // },
];

export default function DashboardLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const ListIcon = link.icon;
        return (
          <Link
            key={link.key}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 border-b-2 border-transparent text-sm font-medium transition-all hover:border-b-primary hover:bg-slate-200 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "border-b-primary":
                  pathname.startsWith(link.href) && link.href !== "/dashboard",
              },
              {
                "border-b-primary": pathname === link.href,
              },
            )}
          >
            <ListIcon className="peer w-6" />
            <p className="hidden md:block">{link.label}</p>
          </Link>
        );
      })}
    </>
  );
}
