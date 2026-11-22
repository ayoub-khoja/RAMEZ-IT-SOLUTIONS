import type { StaticImageData } from "next/image";
import teecone from "@/assets/portfolio/teecone.webp";
import identityluxe from "@/assets/portfolio/identityluxe.webp";
import theckstore from "@/assets/portfolio/theckstore.webp";
import latablemarine from "@/assets/portfolio/latablemarine.webp";
import skdesign from "@/assets/portfolio/skdesign.webp";
import bestbatiment from "@/assets/portfolio/bestbatiment.webp";
import teeconeLogo from "@/assets/clients/teecone.png";
import identityluxeLogo from "@/assets/clients/identityluxe.png";
import theckstoreLogo from "@/assets/clients/theckstore.png";
import latablemarineLogo from "@/assets/clients/latablemarine.png";
import skdesignLogo from "@/assets/clients/skdesign.png";
import bestbatimentLogo from "@/assets/clients/bestbatiment.png";

export type Country = "Qatar" | "France" | "Tunisie";

export type Project = {
  name: string;
  url: string;
  domain: string;
  country: Country;
  city: string;
  category: string;
  description: string;
  tags: string[];
  image: StaticImageData;
  logo: StaticImageData;
  /** true si le logo est clair et doit être affiché sur fond foncé */
  logoOnDark?: boolean;
};

export const countries: { name: Country; code: string }[] = [
  { name: "Qatar", code: "QA" },
  { name: "France", code: "FR" },
  { name: "Tunisie", code: "TN" },
];

export const projects: Project[] = [
  {
    name: "Teecone",
    url: "https://teecone.com/",
    domain: "teecone.com",
    country: "Qatar",
    city: "Doha",
    category: "E-commerce",
    description:
      "Boutique en ligne bilingue (arabe / anglais) de tenues assorties pour toute la famille, avec packs famille et remises automatiques.",
    tags: ["Shopify", "Bilingue AR / EN", "Packs famille"],
    image: teecone,
    logo: teeconeLogo,
  },
  {
    name: "Identity Luxe",
    url: "https://identityluxe.com/",
    domain: "identityluxe.com",
    country: "Qatar",
    city: "Doha",
    category: "E-commerce",
    description:
      "Marque de vêtements inspirée du patrimoine qatari : collections adultes et enfants, paiement sécurisé ou à la livraison.",
    tags: ["Shopify", "Paiement à la livraison", "Mode"],
    image: identityluxe,
    logo: identityluxeLogo,
  },
  {
    name: "CK Store",
    url: "https://theckstore.com/",
    domain: "theckstore.com",
    country: "Qatar",
    city: "Doha",
    category: "E-commerce",
    description:
      "Hoodies premium et ensembles famille, avec suivi de commande en ligne et livraison express en quelques heures.",
    tags: ["Shopify", "Suivi de commande", "Multilingue"],
    image: theckstore,
    logo: theckstoreLogo,
  },
  {
    name: "La Table Marine",
    url: "https://latablemarine.com/",
    domain: "latablemarine.com",
    country: "France",
    city: "Plaisir",
    category: "Restaurant",
    description:
      "Site d'un restaurant de poissons et fruits de mer : carte en ligne, réservation de table, visite virtuelle 360° et avis clients.",
    tags: ["Réservation en ligne", "Visite 360°", "SEO local"],
    image: latablemarine,
    logo: latablemarineLogo,
  },
  {
    name: "SK Design",
    url: "https://www.skdesign.tn/",
    domain: "skdesign.tn",
    country: "Tunisie",
    city: "Monastir",
    category: "Site vitrine",
    description:
      "Imprimerie et enseignes lumineuses : présentation des services, galerie de réalisations, devis gratuit et contact WhatsApp.",
    tags: ["Next.js", "Devis en ligne", "WhatsApp"],
    image: skdesign,
    logo: skdesignLogo,
  },
  {
    name: "Best Bâtiment",
    url: "http://bestbatiment.net/",
    domain: "bestbatiment.net",
    country: "Tunisie",
    city: "Monastir",
    category: "Site corporate",
    description:
      "Entreprise générale de bâtiment : expertises, réalisations, actualités et espace recrutement.",
    tags: ["WordPress", "Recrutement", "Corporate"],
    image: bestbatiment,
    logo: bestbatimentLogo,
    logoOnDark: true,
  },
];

/*
 * AVIS CLIENTS — À REMPLACER
 * Ces textes sont des EXEMPLES pour montrer le design.
 * Avant la mise en ligne, remplacez-les par les vrais avis de vos clients
 * (demandez-leur une phrase et l'autorisation de publier leur nom).
 */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  project: string;
  country: Country;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Notre boutique en ligne est rapide, simple à gérer et nos clients commandent facilement depuis leur téléphone. Une équipe à l'écoute du début à la fin.",
    author: "Nom du client",
    role: "Fondateur",
    project: "Teecone",
    country: "Qatar",
    rating: 5,
  },
  {
    quote:
      "Le site reflète parfaitement l'ambiance du restaurant. Les réservations en ligne ont vraiment augmenté depuis le lancement.",
    author: "Nom du client",
    role: "Gérant",
    project: "La Table Marine",
    country: "France",
    rating: 5,
  },
  {
    quote:
      "Un travail professionnel et des délais respectés. Nous recevons maintenant des demandes de devis directement depuis le site.",
    author: "Nom du client",
    role: "Directeur",
    project: "SK Design",
    country: "Tunisie",
    rating: 5,
  },
];
