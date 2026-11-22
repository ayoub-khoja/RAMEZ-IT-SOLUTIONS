import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconBadgeProps = {
  icon: LucideIcon;
  tone?: "brand" | "light";
  className?: string;
};

export function IconBadge({ icon: Icon, tone = "brand", className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl",
        tone === "brand" && "bg-brand-gradient text-white shadow-lg shadow-violet-brand/25",
        tone === "light" && "bg-white/10 text-brand-300 ring-1 ring-white/15",
        className,
      )}
    >
      <Icon className="size-5.5" strokeWidth={1.75} aria-hidden />
    </span>
  );
}
