import { cacheLife } from "next/cache";
import type { ReactNode } from "react";
import { ArrowUp, ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";
import { services } from "@/content/home";
import { countries } from "@/content/portfolio";
import { Container } from "@/components/ui/container";
import { Flag } from "@/components/ui/flag";
import { Logo } from "./logo";

const linkClassName =
  "group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none";

export function Footer() {
  const { contact } = siteConfig;
  const phoneHref = `tel:${contact.phone.replace(/\s/g, "")}`;

  return (
    <footer className="bg-mesh-dark relative isolate overflow-hidden text-white">
      <div
        className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_bottom,black_10%,transparent_70%)]"
        aria-hidden
      />

      {/* Bandeau contact rapide */}
      <Container className="pt-12">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur sm:p-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xl font-extrabold tracking-tight sm:text-2xl">Un projet en tête&nbsp;? Parlons-en.</p>
            <p className="mt-1 text-sm text-white/60">Réponse sous 24h, devis gratuit et sans engagement.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 text-sm font-semibold text-white shadow-lg shadow-[#25d366]/25 transition-all hover:brightness-110"
            >
              <WhatsAppIcon className="size-5" />
              WhatsApp
            </a>
            <a
              href={phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold transition-all hover:border-white/30 hover:bg-white/10"
            >
              <Phone className="size-4" aria-hidden />
              {contact.phone}
            </a>
          </div>
        </div>
      </Container>

      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr] lg:gap-12">
        <div className="max-w-sm">
          <div className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/20">
            <Logo className="h-11" />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/60">{siteConfig.description}</p>
          <div className="mt-6">
            <p className="text-xs font-bold tracking-[0.18em] text-white/40 uppercase">Nos clients sont en</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {countries.map((country) => (
                <li
                  key={country.code}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold"
                >
                  <Flag country={country.name} />
                  {country.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav aria-label="Liens du pied de page">
          <FooterTitle>Navigation</FooterTitle>
          <ul className="mt-5 space-y-3">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClassName}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterTitle>Services</FooterTitle>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.title}>
                <a href="#services" className={linkClassName}>
                  {service.title}
                  <ArrowUpRight
                    className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic">
          <FooterTitle>Contact</FooterTitle>
          <ul className="mt-5 space-y-3">
            <ContactItem icon={Mail} label="E-mail" href={`mailto:${contact.email}`} value={contact.email} />
            <ContactItem icon={Phone} label="Téléphone" href={phoneHref} value={contact.phone} />
            <ContactItem icon={MapPin} label="Adresse" value={contact.address} />
            <ContactItem icon={Clock} label="Horaires" value={contact.hours} />
          </ul>
        </address>
      </Container>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />
      <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
        <p>
          © <CurrentYear /> {siteConfig.legalName}. Tous droits réservés.
        </p>
        <p className="hidden md:block">{siteConfig.tagline}</p>
        <a
          href="#contenu"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          Retour en haut
          <ArrowUp className="size-3.5" aria-hidden />
        </a>
      </Container>
    </footer>
  );
}

function FooterTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-bold text-white">
      <span className="h-4 w-1 rounded-full bg-brand-gradient" aria-hidden />
      {children}
    </h3>
  );
}

type ContactItemProps = {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
};

function ContactItem({ icon: Icon, label, value, href }: ContactItemProps) {
  const content = (
    <>
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-brand">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold tracking-wide text-white/40 uppercase">{label}</span>
        <span className="block truncate text-sm text-white/80">{value}</span>
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="flex items-center gap-3 transition-opacity hover:opacity-80">
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-3">{content}</div>
      )}
    </li>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
