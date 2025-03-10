import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen flex-col w-full items-center text-center justify-center">
      <nav className="absolute container flex flex-row justify-between items-center w-full top-0 p-2 sm:p-4 z-10">
        <Logo />
        <Button>
          <Link href="/login">Login</Link>
        </Button>
      </nav>
      <h1 className="text-5xl tracking-tighter sm:text-7xl lg:text-8xl font-black">
        XO Chatbot
      </h1>
      <p className="text-lg sm:text-3xl">Login to Begin!</p>
      <Footer />
    </main>
  );
}
