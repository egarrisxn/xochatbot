import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoogleSignIn, GitHubSignIn } from "@/components/auth-buttons";
import Logo from "@/components/logo";
import Footer from "@/components/footer";

export default function LoginPage() {
  return (
    <main className="mx-auto flex flex-col min-h-screen w-full items-center text-center justify-center">
      <nav className="absolute container flex flex-row justify-between items-center w-full top-0 p-2 sm:p-4 z-10">
        <Logo />
        <Button>
          <Link href="/">Back</Link>
        </Button>
      </nav>
      <h1 className="text-5xl tracking-tighter sm:text-7xl lg:text-8xl font-black">
        Login
      </h1>
      <div className="flex mt-2 md:mt-4 gap-2 md:flex-row md:gap-4">
        <GoogleSignIn />
        <GitHubSignIn />
      </div>
      <Footer />
    </main>
  );
}
