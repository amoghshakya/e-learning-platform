"use client";

import { body } from "@/app/fonts";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export function Editor({ onChange, value }: EditorProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  return (
    <div className={`bg-white ${body.className} rounded-md shadow`}>
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
}
