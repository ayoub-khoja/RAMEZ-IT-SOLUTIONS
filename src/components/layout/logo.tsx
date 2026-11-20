import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

type LogoProps = {
  className?: string;
  preload?: boolean;
};

export function Logo({ className, preload = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Accueil`}
      className={cn(
        "inline-flex shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500",
        className,
      )}
    >
      <Image
        src={logo}
        alt={siteConfig.name}
        preload={preload}
        sizes="220px"
        className="h-full w-auto"
      />
    </Link>
  );
}
