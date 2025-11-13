"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <section className='mx-auto grid min-h-screen w-full max-w-2xl grid-rows-2 items-center justify-center lg:grid-rows-1'>
          <div className='flex flex-auto flex-col items-center justify-center px-4 text-center sm:flex-row'>
            <h1 className='text-7xl font-extrabold tracking-tight text-primary sm:mr-5 sm:border-r sm:border-gray-900/10 sm:pr-5 sm:text-3xl sm:dark:border-gray-300/10'>
              Error
            </h1>
            <p className='mt-2 sm:mt-0'>There seems to be a problem.</p>
            <button
              onClick={() => reset()}
              className='cursor-pointer font-medium text-blue-500 underline-offset-4 hover:text-blue-400 hover:underline sm:pl-1.5'
            >
              Try Again
            </button>
          </div>
          <div></div>
        </section>
      </body>
    </html>
  );
}
