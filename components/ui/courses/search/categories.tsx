"use client";

import { Category } from "@prisma/client";

import {
  HiOutlineCodeBracket,
  HiOutlineBriefcase,
  HiOutlinePaintBrush,
  HiOutlineLanguage,
  HiOutlineFaceSmile,
  HiOutlineHeart,
  HiOutlineBeaker,
  HiOutlineCalculator,
  HiOutlineBuildingStorefront,
} from "react-icons/hi2";
import { IconType } from "react-icons";
import CategoryItem from "./category-item";

const iconMap: Record<Category["name"], IconType> = {
  "Programming & Development": HiOutlineCodeBracket,
  "Business & Entrepreneuship": HiOutlineBuildingStorefront,
  "Creative Arts & Design": HiOutlinePaintBrush,
  "Language Learning": HiOutlineLanguage,
  "Personal Development": HiOutlineFaceSmile,
  "Health & Wellness": HiOutlineHeart,
  "STEM (Science, Technology, Engineering, Mathematics)": HiOutlineBeaker,
  "Test Preparation": HiOutlineCalculator,
  "Career-Specific Skills": HiOutlineBriefcase,
};

interface CategoriesProps {
  items: Category[];
}

export default function Categories({ items }: CategoriesProps) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
}
