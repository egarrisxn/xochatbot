import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-row items-center justify-center space-x-2 py-6">
      <Loader2 className="text-primary size-8 animate-spin" />
      <span className="text-lg font-semibold">Loading..</span>
    </div>
  );
}
