import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Banknote,
  CalendarClock,
  CircleCheck,
  Clock,
  Layers,
  Mail,
  Phone,
  Reply,
  StickyNote,
} from "lucide-react";
import { changeStatus, saveNotes } from "@/actions/admin";
import { requireAdmin } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/db";
import { REQUEST_STATUSES, getRequest, type RequestStatus } from "@/lib/requests";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { AdminLoading, AdminShell } from "@/components/admin/admin-shell";
import { StatusBadge, TypeBadge } from "@/components/admin/badges";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatDate, whatsappFromPhone } from "@/components/admin/format";

export const metadata: Metadata = { title: "Demande" };

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function RequestPage({ params, searchParams }: Props) {
  return (
    <Suspense
      fallback={
        <AdminShell active="none">
          <AdminLoading />
        </AdminShell>
      }
    >
      <RequestDetail params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function RequestDetail({ params, searchParams }: Props) {
  await requireAdmin();
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0 || !isDatabaseConfigured()) notFound();

  const request = await getRequest(id);
  if (!request) notFound();
  const saved = (await searchParams).enregistre === "1";

  const whatsapp = request.phone ? whatsappFromPhone(request.phone) : null;
  const replySubject = encodeURIComponent(
    `Re : votre ${request.type === "devis" ? "demande de devis" : "message"} — ${siteConfig.name}`,
  );
  const replyBody = encodeURIComponent(`Bonjour ${request.name},\n\nMerci pour votre message.\n\n`);

  const details = [
    { icon: Layers, label: "Service", value: request.service || "Non précisé" },
    ...(request.type === "devis"
      ? [
          { icon: Banknote, label: "Budget", value: request.budget || "Non précisé" },
          { icon: CalendarClock, label: "Délai", value: request.deadline || "Flexible" },
        ]
      : []),
    { icon: Clock, label: "Reçu le", value: formatDate(request.createdAt) },
  ];

  return (
    <AdminShell active="none">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-500 hover:text-navy-900">
        <ArrowLeft className="size-4" aria-hidden />
        Retour aux demandes
      </Link>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={request.type} />
            <StatusBadge status={request.status} />
          </div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">{request.name}</h1>
          <p className="mt-1 text-sm text-navy-500">Demande n° {request.id}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${request.email}?subject=${replySubject}&body=${replyBody}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-brand/25"
          >
            <Reply className="size-4" aria-hidden />
            Répondre par e-mail
          </a>
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 text-sm font-semibold text-white"
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>

      {saved && (
        <p role="status" className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
          <CircleCheck className="size-4" aria-hidden />
          Note enregistrée.
        </p>
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-navy-900/[0.06] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-sm font-bold tracking-wide text-navy-500 uppercase">Message</h2>
            <p className="mt-4 leading-relaxed whitespace-pre-wrap text-navy-900">{request.message}</p>
          </section>

          <section className="rounded-3xl border border-navy-900/[0.06] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-navy-500 uppercase">
              <StickyNote className="size-4" aria-hidden />
              Notes internes
            </h2>
            <p className="mt-1 text-xs text-navy-500">Visibles uniquement par vous (prix proposé, rappel, suivi…).</p>
            <form action={saveNotes} className="mt-4 space-y-3">
              <input type="hidden" name="id" value={request.id} />
              <textarea
                name="notes"
                defaultValue={request.notes}
                rows={5}
                aria-label="Notes internes"
                placeholder="Ex : rappeler mardi, devis envoyé 2 500 DT…"
                className="w-full rounded-2xl border border-navy-900/15 bg-slate-50 p-4 text-sm text-navy-900 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15 focus:outline-none"
              />
              <button type="submit" className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
                Enregistrer la note
              </button>
            </form>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-navy-900/[0.06] bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold tracking-wide text-navy-500 uppercase">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${request.email}`} className="flex items-center gap-3 font-semibold break-all text-navy-900 hover:text-brand-600">
                  <Mail className="size-4 shrink-0 text-violet-brand" aria-hidden />
                  {request.email}
                </a>
              </li>
              {request.phone && (
                <li>
                  <a href={`tel:${request.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 font-semibold text-navy-900 hover:text-brand-600">
                    <Phone className="size-4 shrink-0 text-violet-brand" aria-hidden />
                    {request.phone}
                  </a>
                </li>
              )}
            </ul>
            <dl className="mt-5 space-y-3 border-t border-navy-900/[0.06] pt-5 text-sm">
              {details.map((detail) => (
                <div key={detail.label} className="flex items-start gap-3">
                  <detail.icon className="mt-0.5 size-4 shrink-0 text-navy-500" aria-hidden />
                  <dt className="text-navy-500">{detail.label}</dt>
                  <dd className="ml-auto text-right font-semibold text-navy-900">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-3xl border border-navy-900/[0.06] bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold tracking-wide text-navy-500 uppercase">Statut</h2>
            <form action={changeStatus} className="mt-4 grid grid-cols-2 gap-2">
              <input type="hidden" name="id" value={request.id} />
              {(Object.entries(REQUEST_STATUSES) as [RequestStatus, string][]).map(([value, label]) => (
                <button
                  key={value}
                  type="submit"
                  name="status"
                  value={value}
                  aria-pressed={request.status === value}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                    request.status === value
                      ? "bg-navy-900 text-white"
                      : "bg-slate-100 text-navy-700 hover:bg-slate-200",
                  )}
                >
                  {label}
                </button>
              ))}
            </form>
          </section>

          <DeleteButton id={request.id} />
        </aside>
      </div>
    </AdminShell>
  );
}
