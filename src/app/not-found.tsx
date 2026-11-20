import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container className="text-center">
        <p className="text-sm font-bold tracking-[0.2em] text-brand-500 uppercase">Erreur 404</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
          Page introuvable
        </h1>
        <p className="mx-auto mt-5 max-w-md text-navy-500">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <ButtonLink href="/" size="lg" className="mt-10">
          <ArrowLeft className="size-4" aria-hidden />
          Retour à l&apos;accueil
        </ButtonLink>
      </Container>
    </section>
  );
}
