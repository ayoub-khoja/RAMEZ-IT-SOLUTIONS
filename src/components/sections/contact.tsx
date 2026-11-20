import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "./contact-form";

export function Contact() {
  const { contact } = siteConfig;

  const contactDetails = [
    { icon: Mail, label: "E-mail", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Téléphone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Adresse", value: contact.address },
    { icon: Clock, label: "Horaires", value: contact.hours },
  ];

  return (
    <section id="contact" className="bg-slate-50 py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Parlons de votre projet"
            description="Décrivez-nous votre besoin : nous revenons vers vous sous 24h avec une première analyse et une proposition adaptée."
          />

          <ul className="mt-10 space-y-5">
            {contactDetails.map((detail) => (
              <li key={detail.label} className="flex items-center gap-4">
                <IconBadge icon={detail.icon} className="bg-white" />
                <div>
                  <p className="text-xs font-semibold tracking-wide text-navy-500 uppercase">{detail.label}</p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="font-semibold text-navy-900 transition-colors hover:text-brand-500 focus-visible:text-brand-500 focus-visible:outline-none"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-navy-900">{detail.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-navy-900/[0.07] bg-white p-6 shadow-xl shadow-navy-900/[0.04] sm:p-10">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
