import { processSteps } from "@/content/home";
import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return (
    <section id="methode" className="relative isolate overflow-hidden bg-navy-900 py-24 sm:py-28">
      <div className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" aria-hidden />
      <div className="absolute -top-32 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />

      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Notre méthode"
          title="Un processus clair, du premier échange au lancement"
          description="Une démarche structurée et transparente pour livrer dans les délais, sans mauvaise surprise."
        />

        <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors duration-300 hover:border-brand-400/40 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <IconBadge icon={step.icon} tone="light" />
                <span className="font-mono text-sm font-semibold text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
