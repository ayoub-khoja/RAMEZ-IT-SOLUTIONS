import type { CSSProperties } from "react";
import { processSteps } from "@/content/home";
import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return (
    <section id="methode" className="bg-mesh-dark relative isolate overflow-hidden py-12 sm:py-16">
      <div className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" aria-hidden />
      
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Notre méthode"
          title="Un processus clair, du premier échange au lancement"
          description="Une démarche structurée et transparente pour livrer dans les délais, sans mauvaise surprise."
        />

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-brand-400/40 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <IconBadge icon={step.icon} tone="light" />
                <span className="text-gradient font-mono text-lg font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
