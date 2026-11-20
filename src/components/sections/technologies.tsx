import { technologies } from "@/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Technologies() {
  return (
    <section id="technologies" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Technologies"
          title="Des outils modernes, éprouvés et évolutifs"
          description="Nous sélectionnons les technologies les plus adaptées à votre projet pour garantir performance, sécurité et pérennité."
        />

        <ul className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-3">
          {technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-navy-900/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy-700 shadow-sm transition-colors duration-200 hover:border-brand-300 hover:text-brand-600"
            >
              {technology}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
