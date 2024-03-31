import {
  AcademicCapIcon,
  UserGroupIcon,
  InformationCircleIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export const NAV_LINKS = [
  {
    label: "Courses",
    href: "/courses",
    key: "courses",
    icon: AcademicCapIcon,
  },
  {
    label: "Instructors",
    href: "/instructors",
    key: "instructors",
    icon: UserGroupIcon,
  },
  {
    label: "About us",
    href: "#about",
    key: "about_us",
    icon: InformationCircleIcon,
  },
  {
    label: "Contact",
    href: "/contact",
    key: "contact",
    icon: PhoneIcon,
  },
  {
    label: "FAQ",
    href: "#faq",
    key: "faq",
    icon: QuestionMarkCircleIcon,
  },
];
