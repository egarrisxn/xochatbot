import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/signout-button";

export interface NavProps {
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
}: NavProps) {
  return (
    <header className='fixed top-0 right-0 left-0 w-full'>
      <nav className='z-10 mx-auto flex w-full flex-row items-center justify-between p-2 sm:container sm:p-4'>
        <Link href='/'>
          <Image
            src='/svgs/logo.svg'
            alt='xochatbot Logo'
            width={40}
            height={40}
            className='size-9 rounded-full border-2 border-slate-300 shadow-lg hover:border-white sm:size-10'
          />
        </Link>
        {showButton &&
          (signOutButton ? (
            <SignOutButton />
          ) : (
            <Button
              asChild
              size='sm'
              className='border-2 border-slate-300 shadow-lg hover:border-white'
            >
              <Link href={hrefLink}>{linkName}</Link>
            </Button>
          ))}
      </nav>
    </header>
  );
}
