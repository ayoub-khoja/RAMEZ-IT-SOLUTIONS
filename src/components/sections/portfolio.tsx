"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Globe2, LayoutGrid, MapPin } from "lucide-react";
import { countries, projects, type Country } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Flag } from "@/components/ui/flag";
import { SectionHeading } from "@/components/ui/section-heading";

type Filter = "Tous" | Country;

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("Tous");
  const visibleProjects = filter === "Tous" ? projects : projects.filter((p) => p.country === filter);

  const filters: { label: Filter; count: number }[] = [
    { label: "Tous", count: projects.length },
    ...countries.map((c) => ({
      label: c.name,
      count: projects.filter((p) => p.country === c.name).length,
    })),
  ];

  return (
    <section id="realisations" className="relative isolate overflow-hidden py-12 sm:py-16">
      <div className="absolute top-40 -right-40 -z-10 size-[32rem] rounded-full bg-violet-300/20 blur-3xl" aria-hidden />
      <div className="absolute bottom-0 -left-40 -z-10 size-[28rem] rounded-full bg-brand-300/20 blur-3xl" aria-hidden />

      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Nos réalisations"
            title="Des sites en ligne, pour de vrais clients, sur 3 pays"
            description="Boutiques en ligne au Qatar, restaurant en France, entreprises en Tunisie : découvrez quelques projets que nous avons conçus et lancés."
          />

          <dl data-reveal className="grid shrink-0 grid-cols-2 gap-3 sm:w-80">
            <div className="rounded-2xl border border-navy-900/[0.07] bg-white p-5 shadow-sm">
              <dt className="flex items-center gap-2 text-xs font-semibold text-navy-500">
                <LayoutGrid className="size-4 text-brand-500" aria-hidden />
                Sites en ligne
              </dt>
              <dd className="text-gradient-dark mt-2 text-3xl font-extrabold">{projects.length}</dd>
            </div>
            <div className="rounded-2xl border border-navy-900/[0.07] bg-white p-5 shadow-sm">
              <dt className="flex items-center gap-2 text-xs font-semibold text-navy-500">
                <Globe2 className="size-4 text-brand-500" aria-hidden />
                Pays
              </dt>
              <dd className="mt-2 flex items-center gap-1.5 text-3xl font-extrabold text-navy-900">
                {countries.length}
                <span className="ml-1 flex gap-1">
                  {countries.map((c) => (
                    <Flag key={c.code} country={c.name} />
                  ))}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div
          role="group"
          aria-label="Filtrer les réalisations par pays"
          className="mt-8 flex flex-wrap gap-2"
          data-reveal
        >
          {filters.map(({ label, count }) => {
            const isActive = filter === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setFilter(label)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                  isActive
                    ? "border-transparent bg-brand-gradient text-white shadow-lg shadow-violet-brand/30"
                    : "border-navy-900/10 bg-white text-navy-700 hover:border-brand-300 hover:text-brand-600",
                )}
              >
                {label !== "Tous" && <Flag country={label} />}
                {label}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs",
                    isActive ? "bg-white/15 text-white" : "bg-slate-100 text-navy-500",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <li
              key={project.name}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy-900/[0.07] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10">
                {/* Fenêtre de navigateur */}
                <div className="flex items-center gap-3 border-b border-navy-900/[0.06] bg-slate-50 px-4 py-2.5">
                  <span className="flex gap-1.5" aria-hidden>
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                  </span>
                  <span className="flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-[11px] font-medium text-navy-500 ring-1 ring-navy-900/[0.06]">
                    {project.domain}
                  </span>
                </div>

                <div className="relative aspect-[1440/760] overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={`Page d'accueil du site ${project.name}`}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-900 shadow-lg">
                      Visiter le site
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                    <span className="inline-flex items-center gap-2 text-navy-500">
                      <Flag country={project.country} />
                      <MapPin className="size-3.5" aria-hidden />
                      {project.city}, {project.country}
                    </span>
                    <span className="rounded-full bg-gradient-to-r from-brand-50 to-violet-50 px-2.5 py-1 text-violet-700 ring-1 ring-violet-100">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-navy-900">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0 focus-visible:outline-none"
                    >
                      {project.name}
                      <span className="sr-only"> (ouvre le site dans un nouvel onglet)</span>
                    </a>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">{project.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-navy-700"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-transparent transition-colors group-has-[a:focus-visible]:ring-brand-500"
                  aria-hidden
                />
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
