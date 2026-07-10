import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand/10 bg-white/80 p-6 shadow-sm backdrop-blur",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

