import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto w-full min-h-screen max-w-2xl items-center grid grid-rows-2 lg:grid-rows-1 justify-center">
      <div className="flex flex-auto flex-col items-center justify-center px-4 text-center sm:flex-row">
        <h1 className="text-7xl font-extrabold tracking-tight sm:mr-5 sm:border-r sm:border-gray-900/10 sm:pr-5 sm:text-3xl text-primary sm:dark:border-gray-300/10">
          404
        </h1>
        <p className="mt-2 sm:mt-0">Page not be found.</p>
        <Link
          href="/"
          className="cursor-pointer font-medium text-blue-500 underline-offset-4 hover:text-blue-400 hover:underline sm:pl-1.5"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
