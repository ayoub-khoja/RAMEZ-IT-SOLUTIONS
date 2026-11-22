export const siteConfig = {
  name: "RAMEZ IT Solutions",
  legalName: "STE RAMEZ IT Solutions",
  tagline: "Développement Informatique & Marketing Digital",
  seoTitle: "RAMEZ IT Solutions | Agence web, création de sites et marketing digital en Tunisie",
  keywords: [
    "agence web Tunisie",
    "agence web Tunis",
    "création site web Tunisie",
    "création site internet Tunis",
    "développement application mobile Tunisie",
    "création boutique en ligne",
    "site e-commerce Shopify",
    "référencement SEO Tunisie",
    "marketing digital Tunisie",
    "agence digitale Qatar",
    "création site web France",
    "RAMEZ IT Solutions",
  ],
  description:
    "Agence web en Tunisie : création de sites internet, boutiques en ligne, applications mobiles et marketing digital pour les entreprises en Tunisie, au Qatar et en France. Devis gratuit sous 24h.",
  url: "https://www.ramezitsolutions.tn",
  contact: {
    email: "ramez.it.solutions@gmail.com",
    phone: "+216 99 957 980",
    // Numéro WhatsApp au format international, sans "+" ni espaces.
    whatsapp: "21699957980",
    address: "Tunis, Tunisie",
    city: "Tunis",
    countryCode: "TN",
    hours: "Lun – Ven : 9h00 – 18h00",
  },
  navigation: [
    { label: "Réalisations", href: "#realisations" },
    { label: "Services", href: "#services" },
    { label: "Méthode", href: "#methode" },
    { label: "Avis clients", href: "#avis" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export function whatsappLink(message = "Bonjour RAMEZ IT Solutions, je souhaite discuter d'un projet.") {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
