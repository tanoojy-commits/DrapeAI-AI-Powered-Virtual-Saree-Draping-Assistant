import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block text-sm font-medium text-ink" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={cn(
          "mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 outline-none ring-brand/20 transition focus:ring-4",
          className,
        )}
        {...props}
      />
      {error ? <span className="mt-2 block text-sm text-brand">{error}</span> : null}
    </label>
  );
}

