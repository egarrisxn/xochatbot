import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <section className="grid min-h-[100dvh] w-full grid-rows-[auto_1fr_auto]">
      <Navbar hrefLink="/dashboard" linkName="Dashboard" />
      <div className="container mx-auto flex max-w-2xl md:items-center">
        <div className="grid w-full grid-rows-1">
          <div></div>
          <div className="px-4 lg:px-0">
            <h1 className="text-primary mb-4 text-2xl font-bold lg:mb-2 lg:text-3xl">
              Privacy Policy
            </h1>
            <p className="text-justify text-sm leading-tight lg:text-base lg:leading-normal">
              This site uses JSON Web Tokens and a Key-Value database for sessions. Data provided to
              this site is exclusively used to support signing in and is not passed to any third
              party services, other than via SMTP or OAuth for the purposes of authentication.
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
