import {
  CodeXml,
  Gauge,
  Handshake,
  Headphones,
  LifeBuoy,
  Megaphone,
  Palette,
  PenTool,
  Rocket,
  Search,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const services: (Feature & { highlights: string[] })[] = [
  {
    icon: CodeXml,
    title: "Développement Web",
    description:
      "Sites vitrines, plateformes et applications web rapides, sécurisées et optimisées pour le référencement.",
    highlights: ["Next.js & React", "Sur mesure", "SEO technique"],
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles",
    description:
      "Applications iOS et Android performantes, pensées pour offrir une expérience fluide à vos utilisateurs.",
    highlights: ["iOS & Android", "React Native", "Publication stores"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Boutiques en ligne qui convertissent : catalogue, paiement en ligne, gestion des stocks et des commandes.",
    highlights: ["Paiement sécurisé", "Back-office", "Analytics"],
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    description:
      "Stratégies d'acquisition, gestion des réseaux sociaux et campagnes publicitaires orientées résultats.",
    highlights: ["Social Media", "Google & Meta Ads", "SEO / SEA"],
  },
  {
    icon: Palette,
    title: "UI/UX & Identité Visuelle",
    description:
      "Interfaces élégantes et intuitives, logos et chartes graphiques qui renforcent l'image de votre marque.",
    highlights: ["Maquettes Figma", "Branding", "Design system"],
  },
  {
    icon: ServerCog,
    title: "Logiciels & Solutions Métier",
    description:
      "ERP, CRM et outils internes sur mesure pour automatiser vos processus et gagner en productivité.",
    highlights: ["Automatisation", "API & intégrations", "Cloud"],
  },
];

export const advantages: Feature[] = [
  {
    icon: Gauge,
    title: "Performance avant tout",
    description:
      "Des produits rapides et optimisés, conçus selon les meilleurs standards du web moderne.",
  },
  {
    icon: ShieldCheck,
    title: "Qualité & sécurité",
    description:
      "Code propre, testé et maintenable, avec les bonnes pratiques de sécurité intégrées dès le départ.",
  },
  {
    icon: Handshake,
    title: "Accompagnement dédié",
    description:
      "Un interlocuteur unique qui comprend vos enjeux et vous conseille à chaque étape du projet.",
  },
  {
    icon: Headphones,
    title: "Support réactif",
    description:
      "Maintenance, évolutions et assistance technique pour garantir la continuité de votre activité.",
  },
];

export const processSteps: Feature[] = [
  {
    icon: Search,
    title: "Découverte",
    description: "Analyse de vos besoins, de vos objectifs et de votre marché.",
  },
  {
    icon: PenTool,
    title: "Conception",
    description: "Architecture, maquettes UI/UX et validation du parcours utilisateur.",
  },
  {
    icon: CodeXml,
    title: "Développement",
    description: "Réalisation itérative avec des points d'avancement réguliers.",
  },
  {
    icon: Rocket,
    title: "Lancement",
    description: "Tests, mise en ligne, formation et optimisation continue.",
  },
  {
    icon: LifeBuoy,
    title: "Suivi",
    description: "Maintenance, support et évolutions selon votre croissance.",
  },
];

export const stats = [
  { value: "50+", label: "Projets livrés" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "24h", label: "Délai de réponse" },
  { value: "5+", label: "Années d'expertise" },
];

export const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "React Native",
  "Laravel",
  "PostgreSQL",
  "MongoDB",
  "WordPress",
  "Figma",
  "AWS",
];
