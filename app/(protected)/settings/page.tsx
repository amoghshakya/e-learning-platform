import { Button } from "@/app/ui/Button";
import { auth, signOut } from "@/auth";
import Image from "next/image";

async function SettingsPage() {
  const session = await auth();
  const image = session?.user.image ?? "";

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
      <Image src={image} width={50} height={50} alt="pfp" />
    </div>
  );
}

export default SettingsPage;
