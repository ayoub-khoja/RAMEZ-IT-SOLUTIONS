import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const controlClassName =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 text-sm text-navy-900 transition-colors placeholder:text-navy-500/60 hover:border-navy-900/25 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/15";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export function Field({ label, htmlFor, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-navy-900">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlClassName, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlClassName, "min-h-36 resize-y py-3", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(controlClassName, "h-12", className)} {...props} />;
}
