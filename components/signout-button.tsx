import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button size='sm'>Sign Out</Button>
    </form>
  );
}
