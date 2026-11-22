import type { Country } from "@/content/portfolio";
import { cn } from "@/lib/utils";

type FlagProps = {
  country: Country;
  className?: string;
};

/** Petits drapeaux en SVG (les emojis drapeaux ne s'affichent pas sous Windows). */
export function Flag({ country, className }: FlagProps) {
  const classes = cn("inline-block h-3.5 w-5 shrink-0 rounded-[3px] ring-1 ring-navy-900/10", className);

  if (country === "France") {
    return (
      <svg viewBox="0 0 3 2" className={classes} aria-hidden>
        <rect width="1" height="2" fill="#002654" />
        <rect x="1" width="1" height="2" fill="#fff" />
        <rect x="2" width="1" height="2" fill="#ce1126" />
      </svg>
    );
  }

  if (country === "Tunisie") {
    return (
      <svg viewBox="0 0 30 20" className={classes} aria-hidden>
        <rect width="30" height="20" fill="#e70013" />
        <circle cx="15" cy="10" r="5" fill="#fff" />
        <circle cx="15" cy="10" r="3.75" fill="#e70013" />
        <circle cx="16" cy="10" r="3" fill="#fff" />
        <polygon
          points="14.6,10 17.4,8.9 15.7,11.3 15.7,8.7 17.4,11.1"
          fill="#e70013"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 28 11" className={classes} preserveAspectRatio="none" aria-hidden>
      <rect width="28" height="11" fill="#8a1538" />
      <polygon
        fill="#fff"
        points="0,0 8,0 11,0.611 8,1.222 11,1.833 8,2.444 11,3.056 8,3.667 11,4.278 8,4.889 11,5.500 8,6.111 11,6.722 8,7.333 11,7.944 8,8.556 11,9.167 8,9.778 11,10.389 8,11 0,11"
      />
    </svg>
  );
}
