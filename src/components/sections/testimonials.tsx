import type { CSSProperties } from "react";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/content/portfolio";
import { Container } from "@/components/ui/container";
import { Flag } from "@/components/ui/flag";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  return (
    <section id="avis" className="bg-mesh-light py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Avis clients"
          title="Ce que nos clients disent de nous"
          description="Des entreprises au Qatar, en France et en Tunisie nous font confiance pour leur présence en ligne."
        />

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li
              key={testimonial.project}
              data-reveal
              style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
            >
              <figure className="relative flex h-full flex-col rounded-3xl border border-navy-900/[0.07] bg-white p-8 shadow-sm">
                <Quote
                  className="absolute top-7 right-7 size-10 text-violet-100"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div className="flex gap-1" aria-label={`Note : ${testimonial.rating} sur 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={
                        i < testimonial.rating
                          ? "size-4.5 fill-amber-400 text-amber-400"
                          : "size-4.5 text-navy-900/15"
                      }
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-6 flex-1 text-base leading-relaxed text-navy-700">
                  « {testimonial.quote} »
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-navy-900/[0.06] pt-6">
                  <span
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-navy-900 text-sm font-bold text-white"
                    aria-hidden
                  >
                    {testimonial.project
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-navy-900">{testimonial.author}</p>
                    <p className="flex items-center gap-2 text-sm text-navy-500">
                      {testimonial.role}, {testimonial.project}
                      <Flag country={testimonial.country} />
                    </p>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
