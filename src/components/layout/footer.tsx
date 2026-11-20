import { cacheLife } from "next/cache";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/content/home";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

const linkClassName =
  "text-sm text-navy-500 transition-colors hover:text-brand-500 focus-visible:text-brand-500 focus-visible:outline-none";

export function Footer() {
  const { contact } = siteConfig;

  return (
    <footer className="border-t border-navy-900/10 bg-slate-50">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <Logo className="h-12" />
          <p className="mt-5 text-sm leading-relaxed text-navy-500">{siteConfig.description}</p>
        </div>

        <nav aria-label="Liens du pied de page">
          <h3 className="text-sm font-bold text-navy-900">Navigation</h3>
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
          <h3 className="text-sm font-bold text-navy-900">Services</h3>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.title}>
                <a href="#services" className={linkClassName}>
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic">
          <h3 className="text-sm font-bold text-navy-900">Contact</h3>
          <ul className="mt-5 space-y-3.5">
            <li>
              <a href={`mailto:${contact.email}`} className={`${linkClassName} flex items-center gap-3`}>
                <Mail className="size-4 text-brand-500" aria-hidden />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={`${linkClassName} flex items-center gap-3`}>
                <Phone className="size-4 text-brand-500" aria-hidden />
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-navy-500">
              <MapPin className="size-4 text-brand-500" aria-hidden />
              {contact.address}
            </li>
          </ul>
        </address>
      </Container>

      <div className="border-t border-navy-900/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-500 sm:flex-row">
          <p>
            © <CurrentYear /> {siteConfig.legalName}. Tous droits réservés.
          </p>
          <p>{siteConfig.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
