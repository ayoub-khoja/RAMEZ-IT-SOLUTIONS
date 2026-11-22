import { ArrowRight, CircleCheck, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroShowcase } from "./hero-showcase";

const trustPoints = ["Devis gratuit sous 24h", "Solutions sur mesure", "Accompagnement de A à Z"];

export function Hero() {
  return (
    <section className="bg-mesh-dark relative isolate overflow-hidden text-white">
      <div
        className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
        aria-hidden
      />

      <Container className="grid items-center gap-14 pt-14 pb-28 sm:pt-20 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:pt-20 lg:pb-32">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur">
            <Sparkles className="size-4 text-cyan-brand" aria-hidden />
            Agence web & marketing digital · Tunisie
          </p>

          <h1 className="mt-7 text-4xl leading-[1.06] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]">
            Des solutions digitales qui <span className="text-gradient">propulsent</span> votre entreprise
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/70">
            Sites web, boutiques en ligne, applications mobiles et marketing digital&nbsp;: nous créons des
            produits rapides et élégants pour des clients en Tunisie, au Qatar et en France.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact" size="lg">
              Démarrer votre projet
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#realisations" size="lg" variant="glass">
              Voir nos réalisations
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-col gap-3 text-sm font-medium text-white/75 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CircleCheck className="size-4.5 text-cyan-brand" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <HeroShowcase />
      </Container>

      {/* Vague de transition vers la section suivante */}
      <svg
        className="absolute inset-x-0 bottom-0 -z-10 h-16 w-full text-white sm:h-24"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path fill="currentColor" d="M0 96h1440V40c-180 30-420 56-720 56S180 70 0 40z" />
      </svg>
    </section>
  );
}
