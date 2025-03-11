import { Chatbot } from "@/components/chatbot";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function DashboardPage() {
  return (
    <section className="grid min-h-[100dvh] w-full grid-rows-[auto_1fr_auto]">
      <Navbar signOutButton />
      <div className="container mx-auto flex max-w-2xl md:items-center">
        <div className="grid w-full grid-rows-1 py-16 lg:py-0">
          <Chatbot />
        </div>
      </div>
      <Footer />
    </section>
  );
}
