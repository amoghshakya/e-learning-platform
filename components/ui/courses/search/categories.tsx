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
  HiOutlineCpuChip,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { GiSkills } from "react-icons/gi";

import { IconType } from "react-icons";
import CategoryItem from "./category-item";

const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": HiOutlineCpuChip,
  "Programming & Development": HiOutlineCodeBracket,
  "Business & Entrepreneuship": HiOutlineBuildingStorefront,
  "Creative Arts & Design": HiOutlinePaintBrush,
  "Language Learning": HiOutlineLanguage,
  "Personal Development": HiOutlineFaceSmile,
  "Health & Wellness": HiOutlineHeart,
  "STEM (Science, Technology, Engineering, Mathematics)": HiOutlineBeaker,
  "Test Preparation": HiOutlineCalculator,
  "Career-Specific Skills": HiOutlineBriefcase,
  "Data & Analytics": HiOutlineChartBar,
  "Humanities & Social Sciences": LiaPeopleCarrySolid,
  "Life Skills": GiSkills,
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
