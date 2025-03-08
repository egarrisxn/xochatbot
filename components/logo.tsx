import Image from "next/image";

const Logo = () => {
  return (
    <div className="mx-auto flex items-center justify-center p-2">
      <Image
        src="/svgs/logo.svg"
        alt="XOChatbot Logo"
        width={60}
        height={60}
        className="rounded-full border-2 shadow-lg"
      />
    </div>
  );
};

export default Logo;
