import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import { XOChat } from "@/components/xo-chat";
import { SignOut } from "@/components/auth-buttons";

export default function XOPage() {
  return (
    <main className="mx-auto flex h-screen w-screen max-w-2xl items-center justify-center">
      <ThemeToggle />
      <SignOut />
      <div className="rounded-lg border-2 p-5 shadow-lg">
        <Logo />
        <XOChat />
      </div>
    </main>
  );
}
