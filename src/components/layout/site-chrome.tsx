import type { ReactNode } from "react";

type SiteChromeProps = {
  header: ReactNode;
  footer: ReactNode;
  extras: ReactNode;
  children: ReactNode;
};

/**
 * En-tête et pied de page du site.
 * Ils sont masqués en CSS dans l'espace /admin (voir `.site-chrome` dans globals.css).
 */
export function SiteChrome({ header, footer, extras, children }: SiteChromeProps) {
  return (
    <>
      <div className="site-chrome contents">{header}</div>
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <div className="site-chrome contents">
        {footer}
        {extras}
      </div>
    </>
  );
}
