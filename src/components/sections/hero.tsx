import { ArrowRight, CircleCheck, Sparkles, TrendingUp, Zap } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const trustPoints = ["Devis gratuit sous 24h", "Solutions sur mesure", "Accompagnement de A à Z"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden />
      <div className="absolute -top-40 right-0 -z-10 size-[36rem] rounded-full bg-brand-400/20 blur-3xl" aria-hidden />
      <div className="absolute top-60 -left-40 -z-10 size-[28rem] rounded-full bg-brand-200/40 blur-3xl" aria-hidden />

      <Container className="grid items-center gap-16 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-24 lg:pb-28">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-1.5 text-sm font-medium text-navy-700 shadow-sm">
            <Sparkles className="size-4 text-brand-500" aria-hidden />
            Développement Informatique & Marketing Digital
          </p>

          <h1 className="mt-7 text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-navy-900 sm:text-5xl lg:text-6xl">
            Des solutions digitales qui{" "}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              propulsent
            </span>{" "}
            votre entreprise
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-navy-500">
            Sites web, applications mobiles, logiciels métier et marketing digital&nbsp;: nous
            transformons vos idées en produits performants, élégants et rentables.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact" size="lg">
              Démarrer votre projet
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#services" size="lg" variant="outline">
              Découvrir nos services
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-col gap-3 text-sm font-medium text-navy-700 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CircleCheck className="size-4.5 text-brand-500" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg animate-fade-up [animation-delay:150ms]" aria-hidden>
      <div className="overflow-hidden rounded-3xl bg-navy-900 shadow-2xl shadow-navy-900/30 ring-1 ring-navy-900/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <span className="size-3 rounded-full bg-white/20" />
          <span className="size-3 rounded-full bg-white/20" />
          <span className="size-3 rounded-full bg-brand-500" />
          <span className="ml-3 text-xs font-medium text-white/40">ramez-it-solutions.tsx</span>
        </div>
        <pre className="overflow-hidden px-6 py-6 font-mono text-[13px] leading-7 text-white/80">
          <code>
            <span className="text-brand-300">const</span> projet = <span className="text-brand-300">await</span>{" "}
            <span className="text-white">ramez</span>.<span className="text-brand-400">lancer</span>({"{"}
            {"\n"}  objectif: <span className="text-emerald-300">&quot;croissance&quot;</span>,
            {"\n"}  design: <span className="text-emerald-300">&quot;élégant&quot;</span>,
            {"\n"}  performance: <span className="text-amber-300">100</span>,
            {"\n"}  support: <span className="text-brand-300">true</span>,
            {"\n"}{"}"});
            {"\n\n"}<span className="text-white/40">{"// ✓ Prêt pour la mise en ligne"}</span>
          </code>
        </pre>
        <div className="grid grid-cols-3 border-t border-white/10">
          {[
            ["100", "Performance"],
            ["100", "SEO"],
            ["A+", "Sécurité"],
          ].map(([score, label]) => (
            <div key={label} className="border-r border-white/10 px-4 py-5 text-center last:border-r-0">
              <p className="text-2xl font-bold text-white">{score}</p>
              <p className="mt-1 text-xs text-white/50">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -top-6 -right-3 animate-float rounded-2xl bg-white p-4 shadow-xl shadow-navy-900/10 ring-1 ring-navy-900/5 sm:-right-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <TrendingUp className="size-5" />
          </span>
          <div>
            <p className="text-lg leading-none font-bold text-navy-900">+180%</p>
            <p className="mt-1 text-xs text-navy-500">Trafic organique</p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-8 -left-3 animate-float rounded-2xl bg-white p-4 shadow-xl shadow-navy-900/10 ring-1 ring-navy-900/5 [animation-delay:-3s] sm:-left-10">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
            <Zap className="size-5" />
          </span>
          <div>
            <p className="text-lg leading-none font-bold text-navy-900">0.8s</p>
            <p className="mt-1 text-xs text-navy-500">Temps de chargement</p>
          </div>
        </div>
      </div>
    </div>
  );
}
