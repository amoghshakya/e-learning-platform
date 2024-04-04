"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import {
  ArrowLeftStartOnRectangleIcon,
  BuildingLibraryIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import React, { Suspense, useEffect, useState } from "react";
import { ProfileImage } from "./ProfileImage";
import { Skeleton } from "../skeleton";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { getUserFullName } from "@/lib/actions";

export default function AvatarDropdown() {
  const [userName, setUserName] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    const getUserName = async () => {
      const userId = session?.user.id;
      if (!userId) return;

      const name = await getUserFullName(userId);
      if (name) setUserName(name);
      return null;
    };

    getUserName();
  }, [userName, session]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileImage />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full space-y-1" sideOffset={1}>
        <DropdownMenuLabel>{userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <MagnifyingGlassIcon className="mr-2 h-5 w-5" />
          <Link href="/courses/search">Courses</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <BuildingLibraryIcon className="mr-2 h-5 w-5" />
          <Link href="/instructors">Instructors Page</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer bg-red-100 shadow"
          onClick={() => signOut()}
        >
          <ArrowLeftStartOnRectangleIcon className="mr-2 h-5 w-5" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
