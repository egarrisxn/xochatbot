import { SignOut } from "@/components/auth-buttons";
import { XOChat } from "@/components/xo-chat";
import Logo from "@/components/logo";
import Footer from "@/components/footer";

export default function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full items-center text-center justify-center">
      <nav className="absolute flex flex-row justify-between items-center w-full top-0 p-2 sm:p-4 z-10">
        <Logo />
        <SignOut />
      </nav>
      <div className="rounded-lg border-2 p-5 shadow-lg max-w-2xl mx-auto w-full">
        <XOChat />
      </div>
      <Footer />
    </main>
  );
}
