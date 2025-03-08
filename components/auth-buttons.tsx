import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

interface SignInProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: string;
}

export function SignIn({ provider, ...props }: SignInProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
      className="absolute curser-pointer z-20 top-5 left-5"
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
}

export function SignOut(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="absolute cursor-pointer z-20 top-5 left-5"
    >
      <Button {...props}>Sign Out</Button>
    </form>
  );
}
