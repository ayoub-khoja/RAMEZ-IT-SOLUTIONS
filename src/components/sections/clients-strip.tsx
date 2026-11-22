import Image from "next/image";
import { projects } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Flag } from "@/components/ui/flag";

/** Bandeau des logos clients, qui chevauche le bas de la section d'accueil. */
export function ClientsStrip() {
  const items = [...projects, ...projects];

  return (
    <section aria-labelledby="clients-title" className="relative z-10 -mt-14 sm:-mt-20">
      <Container>
        <div className="rounded-3xl border border-navy-900/[0.06] bg-white/90 p-6 shadow-2xl shadow-navy-900/10 backdrop-blur sm:p-8">
          <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
            <h2 id="clients-title" className="text-xs font-bold tracking-[0.2em] text-navy-500 uppercase">
              Ils nous font confiance
            </h2>
            <p className="text-sm text-navy-500">
              <span className="font-bold text-navy-900">{projects.length} entreprises</span> au Qatar, en France et en
              Tunisie
            </p>
          </div>

          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <ul className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
              {items.map((project, index) => {
                const isCopy = index >= projects.length;
                return (
                  <li key={`${project.name}-${index}`} aria-hidden={isCopy ? true : undefined}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isCopy ? -1 : undefined}
                      title={`${project.name} — ${project.city}, ${project.country}`}
                      className={cn(
                        "group relative flex h-24 w-52 items-center justify-center rounded-2xl border px-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                        project.logoOnDark
                          ? "border-transparent bg-[#17355f] hover:shadow-navy-900/20"
                          : "border-navy-900/[0.07] bg-white hover:border-brand-200 hover:shadow-brand-500/10",
                      )}
                    >
                      <Image
                        src={project.logo}
                        alt={`Logo ${project.name}`}
                        sizes="180px"
                        className="max-h-14 w-auto max-w-full object-contain"
                      />
                      <Flag country={project.country} className="absolute top-2.5 right-2.5 h-3 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
