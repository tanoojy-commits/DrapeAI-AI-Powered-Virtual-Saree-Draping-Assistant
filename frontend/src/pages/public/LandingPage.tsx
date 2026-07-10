import { motion } from "framer-motion";
import { ArrowRight, ImageUp, Shirt, WandSparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { Section } from "@/components/ui/Section";

const steps = [
  { title: "Upload", text: "Add your photo securely.", icon: ImageUp },
  { title: "Choose", text: "Browse sarees by color, fabric, and style.", icon: Shirt },
  { title: "Generate", text: "Preview the look with an AI try-on result.", icon: WandSparkles },
];

export function LandingPage() {
  return (
    <>
      <Section className="relative overflow-hidden py-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,213,79,0.35),transparent_32%),linear-gradient(135deg,rgba(194,24,91,0.13),rgba(255,255,255,0)_48%)]" />
        <PageContainer className="relative grid min-h-[calc(100vh-73px)] items-center gap-12 py-12 lg:grid-cols-[1fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              AI powered virtual saree draping
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Experience Every Saree Before You Wear It
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              DrapeAI helps shoppers preview sarees on their own image before buying,
              making online ethnic fashion more confident, visual, and personal.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-glow transition hover:bg-brand-deep"
              >
                Create Account
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-brand/20 bg-white/70 px-6 py-3 font-semibold text-brand backdrop-blur transition hover:border-brand/40"
              >
                View Dashboard
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[2rem] border border-white/70 bg-white/55 p-4 shadow-glow backdrop-blur-xl"
          >
            <div className="aspect-[4/5] rounded-[1.5rem] bg-[linear-gradient(150deg,#C2185B,#FFD54F_56%,#FFFFFF)] p-5">
              <div className="flex h-full flex-col justify-end rounded-[1.25rem] border border-white/50 bg-white/30 p-6 backdrop-blur-md">
                <p className="text-sm font-semibold text-white/90">Preview Result</p>
                <h2 className="mt-2 text-3xl font-bold text-white">
                  Luxury silk saree try-on
                </h2>
              </div>
            </div>
          </motion.div>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <Card key={step.title}>
                <Icon className="text-brand" size={24} />
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
              </Card>
            );
          })}
        </PageContainer>
      </Section>
    </>
  );
}

