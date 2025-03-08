import { XOChat } from "@/components/xo-chat";

export default function Home() {
  return (
    <main className="mx-auto flex h-screen w-screen max-w-2xl items-center justify-center">
      <div className="rounded-lg border p-5">
        <XOChat />
      </div>
    </main>
  );
}
