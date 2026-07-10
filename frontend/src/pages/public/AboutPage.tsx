import { PageContainer } from "@/components/ui/PageContainer";
import { Section } from "@/components/ui/Section";

export function AboutPage() {
  return (
    <Section>
      <PageContainer className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">About</p>
        <h1 className="mt-3 text-4xl font-bold">A premium virtual saree experience</h1>
        <p className="mt-5 leading-8 text-muted">
          DrapeAI is being designed as a full-stack AI try-on platform for ethnic
          fashion. This phase focuses on the frontend foundation only.
        </p>
      </PageContainer>
    </Section>
  );
}

