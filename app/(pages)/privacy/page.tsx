import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <section className="grid min-h-[100dvh] w-full grid-rows-[auto_1fr_auto]">
      <Navbar hrefLink="/dashboard" linkName="Dashboard" />
      <div className="flex container mx-auto md:items-center max-w-2xl">
        <div className="grid grid-rows-1 w-full">
          <div></div>
          <div className="px-4 lg:px-0">
            <h1 className="mb-4 lg:mb-2 text-2xl lg:text-3xl text-primary font-bold">
              Privacy Policy
            </h1>
            <p className="text-sm lg:text-base lg:leading-normal leading-tight text-justify">
              This site uses JSON Web Tokens and a Key-Value database for
              sessions. Data provided to this site is exclusively used to
              support signing in and is not passed to any third party services,
              other than via SMTP or OAuth for the purposes of authentication.
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
