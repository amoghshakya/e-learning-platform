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

import React, { Suspense } from "react";
import { ProfileImage } from "./ProfileImage";
import { Skeleton } from "../skeleton";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileImage />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
