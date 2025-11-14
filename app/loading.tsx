import { SpinnerIcon } from "@/components/icons/spinner";

export default function Loading() {
  return (
    <section className='mx-auto grid min-h-screen w-full max-w-2xl grid-rows-2 items-center justify-center lg:grid-rows-1'>
      <div className='flex flex-row items-center justify-center space-x-2 px-4 py-6 text-lg font-semibold'>
        <div className='animate-spin'>
          <SpinnerIcon size={32} />
        </div>
        <span>Loading..</span>
      </div>
    </section>
  );
}
