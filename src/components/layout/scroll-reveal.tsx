"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not(.is-visible)";

/**
 * Fait apparaître en douceur les éléments qui ont l'attribut `data-reveal`
 * quand ils entrent dans l'écran.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    const observeAll = () => document.querySelectorAll(SELECTOR).forEach((element) => observer.observe(element));
    observeAll();

    // Surveille aussi les éléments ajoutés plus tard sur la page.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
