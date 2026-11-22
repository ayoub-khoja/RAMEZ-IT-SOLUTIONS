import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/home";
import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";

export function Services() {
  return (
    <section id="services" className="bg-mesh-light py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Nos services"
          title="Une expertise complète pour votre transformation digitale"
          description="De la conception à la croissance, nous réunissons technologie, design et marketing pour livrer des solutions qui produisent des résultats."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.title}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 100}ms` } as CSSProperties}
            >
              <article className="group relative flex h-full flex-col rounded-3xl border border-navy-900/[0.07] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-brand/10">
                <div className="flex items-center gap-4">
                  <IconBadge
                    icon={service.icon}
                    className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  />
                  <h3 className="flex-1 text-lg leading-snug font-bold text-navy-900">{service.title}</h3>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-navy-900/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-brand"
                    aria-hidden
                  />
                </div>
                <p className="mt-4 flex-1 leading-relaxed text-navy-500">{service.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-navy-700 transition-colors group-hover:bg-violet-50 group-hover:text-violet-700"
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
