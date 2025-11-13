import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <section className="mx-auto grid min-h-screen w-full max-w-2xl grid-rows-2 items-center justify-center lg:grid-rows-1">
      <div className="px-4">
        <Loader />
      </div>
    </section>
  );
}
