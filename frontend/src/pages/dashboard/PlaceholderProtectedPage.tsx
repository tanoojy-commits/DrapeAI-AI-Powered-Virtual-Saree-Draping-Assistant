import { PageContainer } from "@/components/ui/PageContainer";

type PlaceholderProtectedPageProps = {
  title: string;
};

export function PlaceholderProtectedPage({ title }: PlaceholderProtectedPageProps) {
  return (
    <PageContainer className="py-10">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4 text-muted">This protected feature will be built in a later phase.</p>
    </PageContainer>
  );
}

