import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand-gradient text-white shadow-lg shadow-violet-brand/30 hover:shadow-xl hover:shadow-violet-brand/40 hover:brightness-110 active:brightness-95",
  secondary:
    "bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950",
  outline:
    "border border-navy-900/15 bg-white text-navy-900 hover:border-navy-900/30 hover:bg-navy-900/[0.03]",
  light:
    "bg-white text-navy-900 hover:bg-brand-50 active:bg-brand-100",
  glass:
    "border border-white/15 bg-white/5 text-white backdrop-blur hover:border-white/30 hover:bg-white/10",
  ghostLight:
    "border border-white/20 text-white hover:bg-white/10 active:bg-white/15",
} as const;

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
} as const;

type ButtonStyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function buttonStyles({ variant = "primary", size = "md" }: ButtonStyleProps = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
  );
}

type ButtonProps = ComponentProps<"button"> & ButtonStyleProps;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonStyleProps;

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
