import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase",
          isLight ? "text-brand-300" : "text-brand-500",
        )}
      >
        <span className="h-px w-6 bg-current" aria-hidden />
        {eyebrow}
        <span className="h-px w-6 bg-current" aria-hidden />
      </p>
      <h2
        className={cn(
          "mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-tight",
          isLight ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-pretty sm:text-lg",
            isLight ? "text-white/70" : "text-navy-500",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
