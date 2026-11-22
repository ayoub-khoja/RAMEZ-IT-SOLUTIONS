import type { CSSProperties } from "react";
import { advantages, stats } from "@/content/home";
import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyUs() {
  return (
    <section id="pourquoi-nous" className="py-12 sm:py-16">
      <Container className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Pourquoi nous choisir"
            title="Un partenaire technique engagé dans votre réussite"
            description="Chez RAMEZ IT Solutions, chaque projet est traité avec exigence. Nous combinons savoir-faire technique et vision business pour créer des solutions durables."
          />

          <dl data-reveal className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-navy-900/[0.08] ring-1 ring-navy-900/[0.08]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-7">
                <dt className="text-sm text-navy-500">{stat.label}</dt>
                <dd className="text-gradient-dark mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {advantages.map((advantage, index) => (
            <li
              key={advantage.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
              className="rounded-3xl border border-navy-900/[0.07] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-brand/10"
            >
              <div className="flex items-center gap-4">
                <IconBadge icon={advantage.icon} />
                <h3 className="text-lg leading-snug font-bold text-navy-900">{advantage.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-navy-500">{advantage.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
