"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white transition-shadow duration-300",
        isScrolled ? "border-navy-900/10 shadow-sm shadow-navy-900/5" : "border-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6 lg:h-20">
        <Logo preload className="h-11 lg:h-13" />

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-navy-500 transition-colors hover:bg-brand-50 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-brand-500"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="#contact" className="hidden sm:inline-flex">
            Démarrer un projet
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex size-11 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-500 lg:hidden"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] border-t border-navy-900/10 bg-white lg:hidden"
      >
        <Container className="flex flex-col gap-1 py-6">
          <nav aria-label="Navigation mobile">
            <ul className="flex flex-col gap-1">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-3.5 text-lg font-semibold text-navy-900 transition-colors hover:bg-brand-50 active:bg-brand-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href="#contact" size="lg" onClick={closeMenu} className="mt-6">
            Démarrer un projet
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
