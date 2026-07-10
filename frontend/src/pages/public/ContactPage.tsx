import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { Section } from "@/components/ui/Section";

export function ContactPage() {
  return (
    <Section>
      <PageContainer className="max-w-3xl">
        <h1 className="text-4xl font-bold">Contact</h1>
        <Card className="mt-6">
          <p className="leading-8 text-muted">
            Contact workflows will be connected in a later phase. For now, this page
            confirms routing and layout behavior.
          </p>
        </Card>
      </PageContainer>
    </Section>
  );
}

