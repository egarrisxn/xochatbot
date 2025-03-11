import ThemeToggle from "./theme-toggle";

export default function Footer() {
  return (
    <footer className="border-t w-full sm:container mx-auto flex flex-row items-center justify-between p-4 sm:p-6">
      <p className="flex items-center text-sm  text-muted-foreground text-center">
        &copy; {new Date().getFullYear()} XO by{" "}
        <a
          href="https://egxo.dev"
          className="pl-0.5 text-blue-500 hover:text-blue-400 hover:underline hover:underline-offset-4"
        >
          egxo.dev
        </a>
      </p>
      <ThemeToggle />
    </footer>
  );
}
