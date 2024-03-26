import Image from "next/image";
import { heading } from "../fonts";

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen md:flex" id="join-main">
      <div
        className="hidden md:flex items-center  justify-center bg-sky-300 md:relative md:h-full md:w-2/5 md:flex-col"
        id="join_banner"
      >
        <Image
          src="/static/logo.svg"
          alt="studying illustration"
          className="object-cover mix-blend-darken md:block md:p-0 p-4"
          width={100}
          height={100}
          priority
        />
      </div>
      {children}
    </main>
  );
}
