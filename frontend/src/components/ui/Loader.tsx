import { LoaderCircle } from "lucide-react";

export function Loader() {
  return (
    <div className="grid min-h-40 place-items-center text-brand" role="status">
      <LoaderCircle className="animate-spin" size={32} />
      <span className="sr-only">Loading</span>
    </div>
  );
}

