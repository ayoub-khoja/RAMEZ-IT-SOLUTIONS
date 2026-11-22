"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Globe2, MousePointerClick, Star } from "lucide-react";
import { countries, projects } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Flag } from "@/components/ui/flag";

/** Ordinateur + téléphone qui font défiler les vrais sites réalisés. */
export function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % projects.length), 4000);
    return () => window.clearInterval(timer);
  }, []);

  const current = projects[active];
  const nextProject = projects[(active + 1) % projects.length];

  return (
    <div className="relative mx-auto w-full max-w-2xl animate-fade-up [animation-delay:150ms]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-violet-brand/30 blur-3xl" aria-hidden />

      {/* Ordinateur */}
      <div className="relative rounded-2xl border border-white/15 bg-white/10 p-2 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="flex items-center gap-2 px-2 pt-1 pb-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="mx-auto truncate rounded-md bg-white/10 px-4 py-1 text-[11px] font-medium text-white/70">
            {current.domain}
          </span>
        </div>
        <div className="relative aspect-[1440/760] overflow-hidden rounded-xl bg-navy-800">
          {projects.map((project, index) => (
            <Image
              key={project.name}
              src={project.image}
              alt={index === active ? `Site ${project.name} réalisé par RAMEZ IT Solutions` : ""}
              placeholder="blur"
              preload={index === 0}
              sizes="(min-width: 1024px) 640px, 100vw"
              className={cn(
                "absolute inset-0 size-full object-cover object-top transition-all duration-1000",
                index === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
              )}
            />
          ))}
        </div>
      </div>

      {/* Deuxième fenêtre : le site suivant */}
      <div className="absolute -bottom-12 -left-4 hidden w-[46%] -rotate-3 rounded-xl border border-white/15 bg-white/10 p-1.5 shadow-2xl shadow-black/50 backdrop-blur sm:block lg:-left-12">
        <div className="flex items-center gap-1 px-1.5 pb-1.5" aria-hidden>
          <span className="size-1.5 rounded-full bg-white/40" />
          <span className="size-1.5 rounded-full bg-white/40" />
          <span className="size-1.5 rounded-full bg-white/40" />
          <span className="ml-2 truncate text-[9px] text-white/60">{nextProject.domain}</span>
        </div>
        <div className="relative aspect-[1440/760] overflow-hidden rounded-lg bg-navy-800">
          {projects.map((project) => (
            <Image
              key={project.name}
              src={project.image}
              alt=""
              sizes="300px"
              className={cn(
                "absolute inset-0 size-full object-cover object-top transition-opacity duration-1000",
                project === nextProject ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      </div>

      {/* Carte : projet affiché */}
      <a
        href={current.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute -right-2 -bottom-8 flex items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 text-navy-900 shadow-xl shadow-black/30 transition-transform hover:-translate-y-0.5 sm:-right-6"
      >
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
          <MousePointerClick className="size-5" aria-hidden />
        </span>
        <span>
          <span className="flex items-center gap-2 text-sm leading-none font-bold">
            {current.name}
            <Flag country={current.country} />
          </span>
          <span className="mt-1 block text-xs text-navy-500">
            {current.category} · {current.city}
          </span>
        </span>
      </a>

      {/* Carte : pays */}
      <div className="absolute -top-6 -right-2 animate-float rounded-2xl border border-white/15 bg-white/10 p-3.5 text-white shadow-xl backdrop-blur-md sm:-right-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/15">
            <Globe2 className="size-5 text-cyan-brand" aria-hidden />
          </span>
          <div>
            <p className="flex items-center gap-1.5 text-sm leading-none font-bold">
              3 pays
              {countries.map((c) => (
                <Flag key={c.code} country={c.name} className="h-3 w-4" />
              ))}
            </p>
            <p className="mt-1 text-xs text-white/60">{projects.length} sites en ligne</p>
          </div>
        </div>
      </div>

      {/* Carte : satisfaction */}
      <div className="absolute top-[38%] -left-6 hidden animate-float rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white shadow-xl backdrop-blur-md [animation-delay:-3s] sm:block lg:-left-14">
        <div className="flex gap-0.5" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="mt-1 text-xs font-semibold">Clients satisfaits</p>
      </div>

      {/* Points de navigation */}
      <div className="mt-24 flex justify-center gap-2 sm:mt-16" role="group" aria-label="Choisir le site affiché">
        {projects.map((project, index) => (
          <button
            key={project.name}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Afficher ${project.name}`}
            aria-pressed={index === active}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === active ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}
