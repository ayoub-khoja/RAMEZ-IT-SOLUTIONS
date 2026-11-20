import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/home";
import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";

export function Services() {
  return (
    <section id="services" className="bg-slate-50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Nos services"
          title="Une expertise complète pour votre transformation digitale"
          description="De la conception à la croissance, nous réunissons technologie, design et marketing pour livrer des solutions qui produisent des résultats."
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.title}>
              <article className="group relative flex h-full flex-col rounded-3xl border border-navy-900/[0.07] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/[0.08]">
                <div className="flex items-start justify-between">
                  <IconBadge
                    icon={service.icon}
                    className="transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white group-hover:ring-brand-500"
                  />
                  <ArrowUpRight
                    className="size-5 text-navy-900/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-500"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-7 text-xl font-bold text-navy-900">{service.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-navy-500">{service.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-navy-700"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
