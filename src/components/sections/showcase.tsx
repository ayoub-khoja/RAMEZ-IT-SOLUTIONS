import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { HeroShowcase } from "./hero-showcase";

/** Bandeau sombre qui fait défiler les vrais sites réalisés (juste avant les réalisations). */
export function Showcase() {
  return (
    <section className="bg-mesh-dark relative isolate overflow-hidden py-20 text-white sm:py-24">
      <div
        className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        aria-hidden
      />

      <Container className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div>
          <SectionHeading
            align="left"
            tone="light"
            eyebrow="En ligne aujourd'hui"
            title="Nos sites tournent déjà chez nos clients"
            description="Boutiques au Qatar, restaurant en France, entreprises en Tunisie : voici leurs sites, tels que leurs visiteurs les découvrent."
          />
          <div className="mt-8" data-reveal>
            <ButtonLink href="#realisations" size="lg" variant="glass">
              Voir le détail des projets
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>

        <HeroShowcase />
      </Container>
    </section>
  );
}
