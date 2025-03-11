import ThemeToggle from "./theme-toggle";

export default function Footer() {
  return (
    <footer className="mx-auto flex w-full flex-row items-center justify-between border-t p-4 sm:container sm:p-6">
      <p className="text-muted-foreground flex items-center text-center text-sm">
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
