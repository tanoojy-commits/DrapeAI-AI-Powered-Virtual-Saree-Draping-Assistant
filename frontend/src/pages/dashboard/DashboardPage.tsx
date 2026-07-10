import { History, ImagePlus, Search, WandSparkles } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";

const actions = [
  { label: "Upload Image", icon: ImagePlus },
  { label: "Browse Sarees", icon: Search },
  { label: "AI Try-On", icon: WandSparkles },
  { label: "History", icon: History },
];

export function DashboardPage() {
  return (
    <PageContainer className="py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
        User dashboard
      </p>
      <h1 className="mt-3 text-3xl font-bold">Your virtual draping workspace</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              className="flex min-h-36 flex-col items-start justify-between rounded-2xl border border-brand/10 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-glow"
              type="button"
            >
              <Icon className="text-brand" size={26} />
              <span className="font-semibold">{action.label}</span>
            </button>
          );
        })}
      </div>
    </PageContainer>
  );
}

