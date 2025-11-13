import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { SignOut } from "./signout-button";
import Logo from "./logo";
import type { NavProps } from "@/types";

export default function Navbar({
  hrefLink = "/",
  linkName = "Home",
  showButton = true,
  signOutButton = false,
}: NavProps) {
  return (
    <nav className='z-10 mx-auto flex w-full flex-row items-center justify-between p-2 sm:container sm:p-4'>
      <Link href='/'>
        <Logo />
      </Link>
      {showButton &&
        (signOutButton ? (
          <div>Sign Out Button</div>
        ) : (
          // <SignOut />
          <Button
            asChild
            size='sm'
            className='border-2 border-slate-300 shadow-lg hover:border-white'
          >
            <Link href={hrefLink}>{linkName}</Link>
          </Button>
        ))}
    </nav>
  );
}
