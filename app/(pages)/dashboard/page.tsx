import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Chatbot } from "@/components/chatbot";

export default function DashboardPage() {
  return (
    <section className='grid min-h-dvh w-full grid-rows-[auto_1fr_auto] bg-linear-to-b from-background via-blue-200/50 to-accent dark:via-accent/50 dark:to-accent/20'>
      <Navbar signOutButton />
      <div className='container mx-auto flex max-w-2xl md:items-center'>
        <div className='grid w-full grid-rows-1 gap-2 py-16 lg:py-0'>
          <Chatbot />
        </div>
      </div>
      <Footer />
    </section>
  );
}
