import { GoogleSignIn, GitHubSignIn } from "@/components/auth-buttons";

export default function LoginCard() {
  return (
    <div className="border-border mx-auto flex flex-col items-center gap-4 rounded-lg border-2 p-8 shadow-lg sm:p-12">
      <h1 className="text-6xl font-extrabold tracking-tighter sm:text-7xl">Login</h1>
      <div className="fex-row flex gap-2 sm:gap-4">
        <GoogleSignIn />
        <GitHubSignIn />
      </div>
    </div>
  );
}
