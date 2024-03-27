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
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

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
      <DropdownMenuContent>
        <DropdownMenuLabel>{userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/instructors">Instructors Page</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
