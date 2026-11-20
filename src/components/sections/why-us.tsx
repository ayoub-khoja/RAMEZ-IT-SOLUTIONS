import { advantages, stats } from "@/content/home";
import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyUs() {
  return (
    <section id="pourquoi-nous" className="py-24 sm:py-28">
      <Container className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Pourquoi nous choisir"
            title="Un partenaire technique engagé dans votre réussite"
            description="Chez RAMEZ IT Solutions, chaque projet est traité avec exigence. Nous combinons savoir-faire technique et vision business pour créer des solutions durables."
          />

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-navy-900/[0.08] ring-1 ring-navy-900/[0.08]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-7">
                <dt className="text-sm text-navy-500">{stat.label}</dt>
                <dd className="mt-2 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
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
              className={
                index % 2 === 1
                  ? "rounded-3xl border border-navy-900/[0.07] bg-white p-7 shadow-sm sm:translate-y-8"
                  : "rounded-3xl border border-navy-900/[0.07] bg-white p-7 shadow-sm"
              }
            >
              <IconBadge icon={advantage.icon} />
              <h3 className="mt-6 text-lg font-bold text-navy-900">{advantage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">{advantage.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
