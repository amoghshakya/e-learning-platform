import NavBar from "@/components/ui/landing/Navbar";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
}
