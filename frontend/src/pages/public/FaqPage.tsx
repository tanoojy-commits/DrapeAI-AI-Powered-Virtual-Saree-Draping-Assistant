import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { Section } from "@/components/ui/Section";

const faqs = [
  {
    question: "Is AI generation implemented yet?",
    answer: "No. Phase 2 only creates the frontend foundation.",
  },
  {
    question: "Is authentication connected?",
    answer: "No. Login and registration UI are placeholders until Phase 5.",
  },
];

export function FaqPage() {
  return (
    <Section>
      <PageContainer className="max-w-3xl">
        <h1 className="text-4xl font-bold">FAQ</h1>
        <div className="mt-6 grid gap-4">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <h2 className="font-semibold">{faq.question}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}

