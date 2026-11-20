import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CallToAction() {
  return (
    <section className="pb-24 sm:pb-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-600 to-navy-900 px-6 py-16 text-center sm:px-16 sm:py-20">
          <div className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden />
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">
            Prêt à donner vie à votre projet digital ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-white/75">
            Bénéficiez d&apos;un audit et d&apos;un devis gratuits. Notre équipe vous accompagne de l&apos;idée au lancement.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="#contact" size="lg" variant="light">
              Demander un devis gratuit
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={`mailto:${siteConfig.contact.email}`} size="lg" variant="ghostLight">
              {siteConfig.contact.email}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
