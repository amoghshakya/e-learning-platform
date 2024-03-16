"use client";

import clsx from "clsx";
import { useState } from "react";

export function ToggleSwitch({
  name,
  id,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <label htmlFor={name} className="cursor-pointer ">
      <div className="relative w-fit">
        <input
          type="checkbox"
          name={name}
          id={id}
          className="sr-only"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div
          className={clsx(
            "h-3 w-8 rounded-full bg-gray-300 shadow-inner transition-colors",
            {
              "bg-green-200": isChecked,
            }
          )}
        >
          <div
            className={clsx(
              "absolute -top-[2px] h-4 w-4 transform rounded-full bg-primary-700 shadow transition hover:bg-primary-700",
              { "translate-x-full": isChecked },
              { "translate-x-0": !isChecked }
            )}
          ></div>
        </div>
      </div>
    </label>
  );
}
