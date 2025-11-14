import { SpinnerIcon } from "@/components/icons/spinner";

export default function DashboardLoading() {
  return (
    <div className='flex flex-row items-center justify-center space-x-2 px-4 py-6 text-lg font-semibold'>
      <div className='animate-spin'>
        <SpinnerIcon size={32} />
      </div>
      <span>Loading..</span>
    </div>
  );
}
