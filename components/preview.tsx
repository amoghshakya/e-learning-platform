"use client";

import { body } from "@/app/fonts";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export function Preview({ value }: PreviewProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  return (
    <div className={`${body.className} rounded-md bg-white`}>
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  );
}
