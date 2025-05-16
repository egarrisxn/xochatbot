import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/svgs/logo.svg"
      alt="XO Chatbot Logo"
      width={40}
      height={40}
      className="size-9 rounded-full border-2 border-slate-300 shadow-lg hover:border-white sm:size-10"
    />
  );
}
