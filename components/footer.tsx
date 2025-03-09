import ThemeToggle from "./theme-toggle";

export default function Footer() {
  return (
    <footer className="w-full text-muted-foreground container mx-auto flex flex-col items-center z-10 absolute bottom-0 justify-center gap-4 py-8 text-center text-sm md:flex-row md:justify-between md:p-6">
      <p className="flex items-center">
        &copy; {new Date().getFullYear()} XOChatbot by{" "}
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
