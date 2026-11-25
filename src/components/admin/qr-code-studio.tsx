"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Download, ExternalLink, FileImage, PenTool } from "lucide-react";
import logo from "@/assets/logo.png";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
  size: number;
  matrix: string;
};

const FONT = "'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif";

/** Nom de domaine lisible, sans « https:// » ni « / » final. */
function displayDomain(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function escapeXml(text: string) {
  return text.replace(/[<>&"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function isDark(matrix: string, size: number, row: number, col: number) {
  return matrix[row * size + col] === "1";
}

/** Les 3 grands carrés des coins (repères de lecture). */
function isFinder(size: number, row: number, col: number) {
  return (row < 7 && col < 7) || (row < 7 && col >= size - 7) || (row >= size - 7 && col < 7);
}

/* ------------------------------------------------------------------ */
/*  Version simple : noir sur blanc, carrés nets, marge réglementaire  */
/* ------------------------------------------------------------------ */
function buildSimpleSvg(matrix: string, size: number) {
  const margin = 4;
  const total = size + margin * 2;
  let path = "";
  for (let row = 0; row < size; row++) {
    let col = 0;
    while (col < size) {
      if (!isDark(matrix, size, row, col)) {
        col++;
        continue;
      }
      const start = col;
      while (col < size && isDark(matrix, size, row, col)) col++;
      path += `M${start + margin} ${row + margin}h${col - start}v1h-${col - start}z`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="1024" height="1024" shape-rendering="crispEdges"><rect width="${total}" height="${total}" fill="#ffffff"/><path d="${path}" fill="#000000"/></svg>`;
}

/* ------------------------------------------------------------------ */
/*  Version carte : design aux couleurs RAMEZ (1080 × 1350)             */
/* ------------------------------------------------------------------ */
function roundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  return `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 -${r} ${r}h-${w - 2 * r}a${r} ${r} 0 0 1 -${r} -${r}v-${h - 2 * r}a${r} ${r} 0 0 1 ${r} -${r}z`;
}

function buildCardSvg(matrix: string, size: number, url: string, logoHref: string) {
  const W = 1080;
  const H = 1350;

  // Panneau blanc du QR code
  const panel = 620;
  const panelX = (W - panel) / 2;
  const panelY = 492;
  const m = panel / (size + 8); // taille d'un module (marge de 4 modules autour)
  const qrX = panelX + 4 * m;
  const qrY = panelY + 4 * m;

  // Modules arrondis (hors repères des coins)
  let dots = "";
  const s = m * 0.9;
  const off = (m - s) / 2;
  const r = s * 0.32;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!isDark(matrix, size, row, col) || isFinder(size, row, col)) continue;
      dots += `<rect x="${(qrX + col * m + off).toFixed(2)}" y="${(qrY + row * m + off).toFixed(2)}" width="${s.toFixed(2)}" height="${s.toFixed(2)}" rx="${r.toFixed(2)}"/>`;
    }
  }

  // Repères des coins : anneau arrondi + centre, en dégradé RAMEZ
  let eyes = "";
  for (const [row, col] of [
    [0, 0],
    [0, size - 7],
    [size - 7, 0],
  ]) {
    const x = qrX + col * m;
    const y = qrY + row * m;
    eyes += `<path fill-rule="evenodd" d="${roundedRectPath(x, y, 7 * m, 7 * m, 2.2 * m)}${roundedRectPath(x + m, y + m, 5 * m, 5 * m, 1.5 * m)}"/>`;
    eyes += `<path d="${roundedRectPath(x + 2 * m, y + 2 * m, 3 * m, 3 * m, 0.9 * m)}"/>`;
  }

  const domain = escapeXml(displayDomain(url));
  const tagline = escapeXml(siteConfig.tagline);
  const phone = escapeXml(siteConfig.contact.phone);

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <linearGradient id="rz-bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0d2550"/>
    <stop offset="0.55" stop-color="#021737"/>
    <stop offset="1" stop-color="#010d22"/>
  </linearGradient>
  <radialGradient id="rz-glow-violet" cx="0.88" cy="0.02" r="0.6">
    <stop offset="0" stop-color="#7c3aed" stop-opacity="0.55"/>
    <stop offset="1" stop-color="#7c3aed" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="rz-glow-blue" cx="0.02" cy="0.3" r="0.6">
    <stop offset="0" stop-color="#1a80fe" stop-opacity="0.5"/>
    <stop offset="1" stop-color="#1a80fe" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="rz-glow-cyan" cx="0.5" cy="1.08" r="0.55">
    <stop offset="0" stop-color="#06b6d4" stop-opacity="0.4"/>
    <stop offset="1" stop-color="#06b6d4" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="rz-brand" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#1a80fe"/>
    <stop offset="0.55" stop-color="#6d4aff"/>
    <stop offset="1" stop-color="#8b5cf6"/>
  </linearGradient>
  <linearGradient id="rz-eyes" gradientUnits="userSpaceOnUse" x1="${qrX}" y1="${qrY}" x2="${qrX + size * m}" y2="${qrY + size * m}">
    <stop offset="0" stop-color="#0b63e0"/>
    <stop offset="1" stop-color="#6d4aff"/>
  </linearGradient>
  <linearGradient id="rz-title" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#8ec3ff"/>
    <stop offset="0.5" stop-color="#c4b5fd"/>
    <stop offset="1" stop-color="#67e8f9"/>
  </linearGradient>
  <pattern id="rz-dots" width="28" height="28" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r="1.6" fill="#ffffff" fill-opacity="0.07"/>
  </pattern>
  <filter id="rz-shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#000000" flood-opacity="0.45"/>
  </filter>
  <clipPath id="rz-card"><rect width="${W}" height="${H}" rx="64"/></clipPath>
</defs>
<g clip-path="url(#rz-card)">
  <rect width="${W}" height="${H}" fill="url(#rz-bg)"/>
  <rect width="${W}" height="${H}" fill="url(#rz-glow-violet)"/>
  <rect width="${W}" height="${H}" fill="url(#rz-glow-blue)"/>
  <rect width="${W}" height="${H}" fill="url(#rz-glow-cyan)"/>
  <rect width="${W}" height="${H}" fill="url(#rz-dots)"/>
  <circle cx="${W - 60}" cy="230" r="150" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2"/>
  <circle cx="70" cy="${H - 170}" r="120" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2"/>
  <rect y="0" width="${W}" height="10" fill="url(#rz-brand)"/>
</g>
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="63" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2"/>

<rect x="${(W - 430) / 2}" y="84" width="430" height="140" rx="32" fill="#ffffff"/>
<image href="${logoHref}" xlink:href="${logoHref}" x="${(W - 370) / 2}" y="${84 + (140 - 100.6) / 2}" width="370" height="100.6" preserveAspectRatio="xMidYMid meet"/>

<text x="${W / 2}" y="296" text-anchor="middle" font-family="${FONT}" font-size="24" font-weight="700" letter-spacing="6" fill="#8ec3ff">SITE OFFICIEL</text>
<text x="${W / 2}" y="362" text-anchor="middle" font-family="${FONT}" font-size="54" font-weight="800" fill="#ffffff">Scannez pour découvrir</text>
<text x="${W / 2}" y="424" text-anchor="middle" font-family="${FONT}" font-size="54" font-weight="800" fill="url(#rz-title)">notre site web</text>

<rect x="${panelX - 14}" y="${panelY - 14}" width="${panel + 28}" height="${panel + 28}" rx="60" fill="url(#rz-brand)" filter="url(#rz-shadow)"/>
<rect x="${panelX}" y="${panelY}" width="${panel}" height="${panel}" rx="48" fill="#ffffff"/>
<g fill="#021737">${dots}</g>
<g fill="url(#rz-eyes)">${eyes}</g>

<rect x="${(W - 640) / 2}" y="1156" width="640" height="84" rx="42" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.18" stroke-width="2"/>
<circle cx="${(W - 640) / 2 + 52}" cy="1198" r="10" fill="#22d3ee"/>
<text x="${W / 2 + 18}" y="1211" text-anchor="middle" font-family="${FONT}" font-size="38" font-weight="800" fill="#ffffff">${domain}</text>

<text x="${W / 2}" y="1292" text-anchor="middle" font-family="${FONT}" font-size="24" font-weight="600" fill="#ffffff" fill-opacity="0.62">${tagline}  ·  ${phone}</text>
</svg>`;
}

/* ------------------------------------------------------------------ */
/*  Téléchargements                                                    */
/* ------------------------------------------------------------------ */
function downloadBlob(blob: Blob, filename: string) {
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

function downloadSvg(svg: string, filename: string) {
  downloadBlob(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), filename);
}

async function downloadPng(svg: string, width: number, height: number, filename: string, crisp: boolean) {
  const src = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas indisponible");
    ctx.imageSmoothingEnabled = !crisp;
    ctx.drawImage(img, 0, 0, width, height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("Export PNG impossible");
    downloadBlob(blob, filename);
  } finally {
    URL.revokeObjectURL(src);
  }
}

/** Le logo est intégré dans le fichier (data URI) pour que la carte téléchargée soit autonome. */
function useLogoDataUri() {
  const [dataUri, setDataUri] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(logo.src)
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }),
      )
      .then((uri) => {
        if (!cancelled) setDataUri(uri);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return dataUri;
}

/* ------------------------------------------------------------------ */
/*  Interface                                                          */
/* ------------------------------------------------------------------ */
export function QrCodeStudio({ url, size, matrix }: Props) {
  const logoDataUri = useLogoDataUri();
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const simpleSvg = useMemo(() => buildSimpleSvg(matrix, size), [matrix, size]);
  const cardSvg = useMemo(
    () => buildCardSvg(matrix, size, url, logoDataUri ?? logo.src),
    [matrix, size, url, logoDataUri],
  );

  const slug = displayDomain(url).replace(/^www\./, "").split(".")[0];

  async function run(key: string, task: () => Promise<void> | void) {
    setError(null);
    setBusy(key);
    try {
      await task();
    } catch {
      setError("Le téléchargement n'a pas fonctionné. Réessayez ou utilisez un autre navigateur.");
    } finally {
      setBusy(null);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-3xl border border-navy-900/[0.06] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-[0.15em] text-navy-500 uppercase">Lien du QR code</p>
          <p className="mt-1 truncate text-lg font-extrabold text-navy-900">{url}</p>
          <p className="mt-1 text-sm text-navy-500">
            Généré à partir du nom de domaine du site : il ne change jamais, vous pouvez l&apos;imprimer sans crainte.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-navy-900/15 px-4 text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-50"
          >
            {copied ? <Check className="size-4 text-emerald-600" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? "Copié" : "Copier"}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-navy-900/15 px-4 text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-50"
          >
            <ExternalLink className="size-4" aria-hidden />
            Tester
          </a>
        </div>
      </section>

      {error && (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
          {error}
        </p>
      )}

      <QrSection
        step="1"
        title="Version simple"
        description="QR code classique noir sur blanc. Idéal pour l'impression : cartes de visite, flyers, vitrines, factures."
      >
        <div className="flex justify-center rounded-2xl bg-slate-50 p-6 sm:p-10">
          <div
            className="w-full max-w-[280px] overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-navy-900/10 [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
            role="img"
            aria-label={`QR code vers ${url}`}
            dangerouslySetInnerHTML={{ __html: simpleSvg }}
          />
        </div>
        <DownloadBar>
          <DownloadButton
            primary
            loading={busy === "simple-png"}
            icon={FileImage}
            label="PNG haute qualité"
            detail="4096 × 4096 px"
            onClick={() => run("simple-png", () => downloadPng(simpleSvg, 4096, 4096, `qr-code-${slug}.png`, true))}
          />
          <DownloadButton
            loading={busy === "simple-svg"}
            icon={PenTool}
            label="SVG vectoriel"
            detail="Taille illimitée"
            onClick={() => run("simple-svg", () => downloadSvg(simpleSvg, `qr-code-${slug}.svg`))}
          />
        </DownloadBar>
      </QrSection>

      <QrSection
        step="2"
        title="Version carte RAMEZ"
        description="Le même QR code, dans une carte aux couleurs de RAMEZ IT Solutions. Parfait pour les réseaux sociaux, affiches et présentations."
      >
        <div className="flex justify-center rounded-2xl bg-slate-50 p-6 sm:p-10">
          <div
            className="w-full max-w-[420px] drop-shadow-2xl [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
            role="img"
            aria-label={`Carte RAMEZ IT Solutions avec QR code vers ${url}`}
            dangerouslySetInnerHTML={{ __html: cardSvg }}
          />
        </div>
        <DownloadBar>
          <DownloadButton
            primary
            loading={busy === "card-png"}
            disabled={!logoDataUri}
            icon={FileImage}
            label="PNG haute qualité"
            detail="2160 × 2700 px"
            onClick={() => run("card-png", () => downloadPng(cardSvg, 2160, 2700, `carte-qr-${slug}.png`, false))}
          />
          <DownloadButton
            loading={busy === "card-svg"}
            disabled={!logoDataUri}
            icon={PenTool}
            label="SVG vectoriel"
            detail="Pour l'imprimeur"
            onClick={() => run("card-svg", () => downloadSvg(cardSvg, `carte-qr-${slug}.svg`))}
          />
        </DownloadBar>
      </QrSection>

      <p className="text-center text-xs text-navy-500">
        Conseil : imprimez le QR code à au moins 2 × 2 cm et testez-le avec votre téléphone avant une grande impression.
      </p>
    </div>
  );
}

function QrSection({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-navy-900/[0.06] bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-sm font-extrabold text-white">
          {step}
        </span>
        <div>
          <h2 className="text-lg font-extrabold text-navy-900">{title}</h2>
          <p className="mt-0.5 text-sm text-navy-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function DownloadBar({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 grid gap-3 sm:grid-cols-2">{children}</div>;
}

function DownloadButton({
  label,
  detail,
  icon: Icon,
  onClick,
  primary,
  loading,
  disabled,
}: {
  label: string;
  detail: string;
  icon: typeof Download;
  onClick: () => void;
  primary?: boolean;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className={cn(
        "flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all disabled:cursor-wait disabled:opacity-60",
        primary
          ? "bg-brand-gradient text-white shadow-lg shadow-brand-500/25 hover:-translate-y-0.5"
          : "border border-navy-900/15 text-navy-900 hover:bg-slate-50",
      )}
    >
      <span
        className={cn(
          "inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
          primary ? "bg-white/20" : "bg-slate-100",
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold">{loading ? "Préparation…" : label}</span>
        <span className={cn("block text-xs", primary ? "text-white/75" : "text-navy-500")}>{detail}</span>
      </span>
      <Download className="size-4.5 shrink-0" aria-hidden />
    </button>
  );
}
