import type { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <section className='flex h-dvh w-full flex-col justify-center bg-linear-to-b from-background via-blue-200/50 to-accent dark:via-accent/50 dark:to-accent/20'>
      <Navbar hrefLink='/dashboard' linkName='Dashboard' />
      {children}
      <Footer />
    </section>
  );
}
