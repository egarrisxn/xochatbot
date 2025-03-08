import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import { XOChat } from "@/components/xo-chat";

export default function Home() {
  return (
    <main className="mx-auto flex h-screen w-screen max-w-2xl items-center justify-center">
      <ThemeToggle />
      <div className="rounded-lg border-2 p-5 shadow-lg">
        <Logo />
        <XOChat />
      </div>
    </main>
  );
}
