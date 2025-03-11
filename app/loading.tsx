import Loader from "@/components/loader";

export default function Loading() {
  return (
    <section className="mx-auto w-full min-h-screen max-w-2xl items-center grid grid-rows-2 lg:grid-rows-1 justify-center">
      <div className="px-4">
        <Loader />
      </div>
    </section>
  );
}
