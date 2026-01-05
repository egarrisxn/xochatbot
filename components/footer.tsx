import ThemeToggle from "@/components/theme-toggle";

export default function Footer() {
  return (
    <footer className='fixed right-0 bottom-0 left-0 w-full'>
      <div className='mx-auto flex w-full flex-row items-center justify-between p-2 sm:container'>
        <p className='flex items-center text-center text-muted-foreground'>
          <span className='text-xs leading-0 tracking-tight'>
            2026
          </span>
          <a
            href='https://github.com/egarrisxn/xochatbot'
            className='pb-0.5 pl-0.5 text-base leading-0 tracking-tight text-blue-500 hover:text-blue-400 hover:underline hover:underline-offset-4'
          >
            xochatbot
          </a>
        </p>
        <ThemeToggle />
      </div>
    </footer>
  );
}
