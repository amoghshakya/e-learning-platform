export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen" id="join-main">
      {children}
    </main>
  );
}
