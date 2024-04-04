import { NAV_LINKS } from "@/constants";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-500 p-8 md:grid md:grid-cols-3 md:grid-rows-2">
      <div className="flex items-center justify-center">
        <Image
          src="/static/logosvg.svg"
          alt=""
          height={500}
          width={500}
          className=""
        />
      </div>
      <div role="navigation" className="flex flex-col">
        <span className="text-sm text-slate-300">Links</span>
        <div className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="w-fit text-xs text-slate-400 underline-offset-1 hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="w-fit text-xs text-slate-400 underline-offset-1 hover:underline"
          >
            User Dashboard
          </Link>
          <Link
            href="/instructors/courses"
            className="w-fit text-xs text-slate-400 underline-offset-1 hover:underline"
          >
            Instructors Dashboard
          </Link>
        </div>
      </div>
      <div>
        <div className="flex flex-col text-xs text-slate-400">
          <span className="text-sm text-slate-300">Contact</span>
          <div>
            <div className="flex items-center gap-x-2 hover:*:text-slate-300">
              <EnvelopeIcon className="h-3 w-3" />
              <a
                href="mailto:iamamoghshakya@gmail.com"
                className="underline-offset-1 hover:underline"
              >
                iamamoghshakya@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-x-2 hover:*:text-slate-300">
              <PhoneIcon className="h-3 w-3" />
              <a href="tel:+977" className="underline-offset-1 hover:underline">
                +977 - 9800000000
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="place-self-center text-slate-300 md:col-span-3 md:row-start-2">
        <span className="text-sm text-slate-300">&copy; 2024</span>
      </div>
    </footer>
  );
}
