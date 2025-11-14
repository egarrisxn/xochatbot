import Link from "next/link";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <section className='flex h-dvh w-full flex-col justify-center bg-linear-to-b from-background via-blue-200/50 to-accent dark:via-accent/50 dark:to-accent/20'>
      <Navbar hrefLink='/dashboard' linkName='Dashboard' />
      <section className='container mx-auto flex max-w-3xl flex-col items-center justify-center px-4 text-center'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='bg-linear-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl lg:text-8xl'
        >
          xochatbot
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='mt-4 text-lg text-muted-foreground sm:text-2xl'
        >
          Visit the dashboard to begin chatting with your AI.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='mt-6'
        >
          <Button
            asChild
            size='lg'
            className='border-2 border-slate-300 shadow-lg hover:border-white'
          >
            <Link href='/dashboard'>Go to Dashboard</Link>
          </Button>
        </motion.div>
      </section>
      <Footer />
    </section>
  );
}
