import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/svgs/logo.svg"
      alt="XOChatbot Logo"
      width={40}
      height={40}
      className="rounded-full shadow-lg"
    />
  );
}
