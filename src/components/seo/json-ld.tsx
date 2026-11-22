import { siteConfig } from "@/config/site";
import { services } from "@/content/home";
import { projects } from "@/content/portfolio";

/** Données structurées (schema.org) pour aider Google à comprendre l'entreprise. */
export function JsonLd() {
  const { url, contact } = siteConfig;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${url}/#organisation`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url,
        logo: `${url}/logo.png`,
        image: `${url}/opengraph-image.png`,
        description: siteConfig.description,
        email: contact.email,
        telephone: contact.phone.replace(/\s/g, ""),
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: contact.city,
          addressCountry: contact.countryCode,
        },
        areaServed: [
          { "@type": "Country", name: "Tunisie" },
          { "@type": "Country", name: "Qatar" },
          { "@type": "Country", name: "France" },
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: contact.phone.replace(/\s/g, ""),
          email: contact.email,
          contactType: "customer service",
          availableLanguage: ["French", "Arabic", "English"],
        },
        knowsAbout: services.map((service) => service.title),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.title, description: service.description },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#site`,
        url,
        name: siteConfig.name,
        inLanguage: "fr",
        publisher: { "@id": `${url}/#organisation` },
      },
      {
        "@type": "ItemList",
        name: "Réalisations de RAMEZ IT Solutions",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.name,
            url: project.url,
            description: project.description,
            locationCreated: { "@type": "Place", name: `${project.city}, ${project.country}` },
            creator: { "@id": `${url}/#organisation` },
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
