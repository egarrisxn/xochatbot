import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export function GoogleSignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <Button>Google</Button>
    </form>
  );
}

export function GitHubSignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/dashboard" });
      }}
    >
      <Button>GitHub</Button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button>Sign Out</Button>
    </form>
  );
}
