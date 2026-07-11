import { PageContainer } from "@/components/ui/PageContainer";

export function AdminDashboardPage() {
  return (
    <PageContainer className="py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
        Admin
      </p>
      <h1 className="mt-3 text-3xl font-bold">Admin workspace</h1>
      <p className="mt-4 text-muted">
        Admin-only product, category, and user tools will be added in later phases.
      </p>
    </PageContainer>
  );
}

