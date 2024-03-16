"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getUserImage } from "@/lib/actions";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";

export function ProfileImage() {
  const [userImage, setUserImage] = useState<string | undefined | null>("");

  useEffect(() => {
    const fetchUserImage = async () => {
      const image = await getUserImage();
      setUserImage(image);
    };

    fetchUserImage();
  });

  return (
    <>
      <Avatar className="aspect-square rounded-full object-cover md:col-start-3 md:block place-self-end self-center max-sm:h-7 max-sm:w-7">
        <AvatarImage src={userImage ?? "/static/default-profile.svg"} />
      </Avatar>
    </>
  );
}
