import { Button } from "@/app/ui/Button";
import { auth, signOut } from "@/auth";

async function SettingsPage() {
  const session = await auth();

  console.log(session?.user.user_id);

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
    </div>
  );
}

export default SettingsPage;
