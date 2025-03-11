import Link from "next/link";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

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

interface NavbarProps {
  hrefLink?: string;
  linkName?: string;
  showButton?: boolean;
  signOutButton?: boolean;
}

export default function Navbar({
  hrefLink = "/",
  linkName = "Home",
  showButton = true,
  signOutButton = false,
}: NavbarProps) {
  return (
    <nav className="sm:container w-full mx-auto flex flex-row justify-between items-center p-2 sm:p-4 z-10">
      <Link href="/">
        <Logo />
      </Link>
      {showButton &&
        (signOutButton ? (
          <SignOut />
        ) : (
          <Button asChild>
            <Link href={hrefLink}>{linkName}</Link>
          </Button>
        ))}
    </nav>
  );
}
