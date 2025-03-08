import { SignIn } from "@/components/auth-buttons";

export default function Home() {
  const provider = "github"; 

  return (
    <main className="mx-auto flex h-screen w-screen max-w-2xl items-center text-center justify-center">
      <SignIn provider={provider} />
      <div className="flex flex-col gap-1">
      <h1 className="text-5xl tracking-tighter sm:text-7xl lg:text-8xl font-black">XO Chatbot</h1>
      <p className="text-lg sm:text-3xl">Sign in to begin!</p>
      </div>
    </main>
  );
}