import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className }: SectionProps) {
  return <section className={cn("py-14 sm:py-20", className)}>{children}</section>;
}

