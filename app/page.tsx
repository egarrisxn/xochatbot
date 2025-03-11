import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main className="grid min-h-[100dvh] w-full grid-rows-[auto_1fr_auto]">
      <Navbar hrefLink="/dashboard" linkName="Dashboard" />
      <div className="container mx-auto flex max-w-2xl md:items-center">
        <div className="grid w-full grid-rows-3 text-center lg:grid-rows-1">
          <div></div>
          <div>
            <h1 className="text-5xl font-black tracking-tighter sm:text-7xl lg:text-8xl">
              XO Chatbot
            </h1>
            <p className="text-lg sm:text-3xl">Login to Begin!</p>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
