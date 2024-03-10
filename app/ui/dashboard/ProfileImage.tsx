"use client";

import { getUserImage } from "@/lib/actions";
import Image from "next/image";
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
      {userImage ? (
        <Image
          className="hidden aspect-square w-min justify-end rounded-full bg-green-900 object-cover md:col-start-3 md:block"
          src={userImage}
          width={30}
          height={30}
          alt="Profile Image"
        />
      ) : (
        <Image
          className="hidden aspect-square justify-end rounded-full stroke-gray-500 md:col-start-3 md:block"
          src={"/static/default-profile.svg"}
          width={30}
          height={30}
          alt="Profile Image"
        />
      )}
    </>
  );
}
