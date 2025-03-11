import { GoogleSignIn, GitHubSignIn } from "@/components/auth-buttons";

export default function LoginCard() {
  return (
    <div className="flex flex-col rounded-lg mx-auto items-center p-8 sm:p-12 border-2 gap-4 border-border shadow-lg">
      <h1 className="tracking-tighter text-6xl sm:text-7xl font-extrabold">
        Login
      </h1>
      <div className="flex fex-row gap-2 sm:gap-4">
        <GoogleSignIn />
        <GitHubSignIn />
      </div>
    </div>
  );
}
