import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { CalendarDays, CircleCheck, Database, FileText, Inbox, Search, Timer } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/db";
import {
  REQUEST_STATUSES,
  getRequestStats,
  isRequestStatus,
  isRequestType,
  listRequests,
  type RequestStatus,
  type RequestType,
} from "@/lib/requests";
import { cn } from "@/lib/utils";
import { AdminLoading, AdminShell, type AdminNavKey } from "@/components/admin/admin-shell";
import { StatusBadge, TypeBadge } from "@/components/admin/badges";
import { currentTime, timeAgo } from "@/components/admin/format";

export const metadata: Metadata = { title: "Tableau de bord" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense
      fallback={
        <AdminShell active="none">
          <AdminLoading />
        </AdminShell>
      }
    >
      <Dashboard searchParams={searchParams} />
    </Suspense>
  );
}

async function Dashboard({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const statusParam = first(params.statut);
  const typeParam = first(params.type);
  const status: RequestStatus | undefined = isRequestStatus(statusParam) ? statusParam : undefined;
  const type: RequestType | undefined = isRequestType(typeParam) ? typeParam : undefined;
  const search = first(params.q)?.slice(0, 100) ?? "";
  const deleted = first(params.supprime) === "1";

  const active: AdminNavKey =
    status === "nouveau" && !type ? "nouveau" : type && !status ? type : !status && !type ? "dashboard" : "none";

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell active={active}>
        <SetupNotice />
      </AdminShell>
    );
  }

  await connection();
  const [stats, requests] = await Promise.all([
    getRequestStats(),
    listRequests({ status, type, search }),
  ]);
  const now = currentTime();

  const statCards = [
    { label: "Nouveaux", value: stats.nouveaux, icon: Inbox, color: "from-blue-500 to-brand-600", href: "/admin?statut=nouveau" },
    { label: "En cours", value: stats.enCours, icon: Timer, color: "from-amber-400 to-orange-500", href: "/admin?statut=en_cours" },
    { label: "Demandes de devis", value: stats.devis, icon: FileText, color: "from-violet-500 to-fuchsia-500", href: "/admin?type=devis" },
    { label: "Ce mois-ci", value: stats.ceMois, icon: CalendarDays, color: "from-cyan-400 to-teal-500", href: "/admin" },
  ];

  const buildHref = (next: { statut?: string; type?: string }) => {
    const query = new URLSearchParams();
    const s = "statut" in next ? next.statut : status;
    const t = "type" in next ? next.type : type;
    if (s) query.set("statut", s);
    if (t) query.set("type", t);
    if (search) query.set("q", search);
    const qs = query.toString();
    return qs ? `/admin?${qs}` : "/admin";
  };

  return (
    <AdminShell active={active}>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">Tableau de bord</h1>
          <p className="mt-1 text-sm text-navy-500">
            {stats.total} demande{stats.total > 1 ? "s" : ""} au total · {stats.nouveaux} à traiter
          </p>
        </div>
      </div>

      {deleted && (
        <p role="status" className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
          <CircleCheck className="size-4" aria-hidden />
          La demande a été supprimée.
        </p>
      )}

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {statCards.map((card) => (
          <li key={card.label}>
            <Link
              href={card.href}
              className="flex flex-col items-start gap-3 rounded-2xl border border-navy-900/[0.06] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg", card.color)}>
                <card.icon className="size-5.5" aria-hidden />
              </span>
              <span>
                <span className="block text-2xl font-extrabold text-navy-900">{card.value}</span>
                <span className="block text-sm text-navy-500">{card.label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-8 rounded-3xl border border-navy-900/[0.06] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-navy-900/[0.06] p-4 sm:p-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par statut">
            {[{ key: undefined, label: "Tous" }, ...Object.entries(REQUEST_STATUSES).map(([key, label]) => ({ key, label }))].map(
              (item) => (
                <Link
                  key={item.label}
                  href={buildHref({ statut: item.key })}
                  aria-current={status === item.key ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                    status === item.key ? "bg-navy-900 text-white" : "text-navy-500 hover:bg-slate-100 hover:text-navy-900",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <form action="/admin" method="get" className="flex flex-col gap-2 sm:flex-row">
            {status && <input type="hidden" name="statut" value={status} />}
            <select
              name="type"
              defaultValue={type ?? ""}
              aria-label="Type de demande"
              className="h-10 rounded-full border border-navy-900/15 bg-white px-4 text-sm text-navy-900"
            >
              <option value="">Tous les types</option>
              <option value="devis">Devis</option>
              <option value="message">Messages</option>
            </select>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-navy-500" aria-hidden />
              <input
                type="search"
                name="q"
                defaultValue={search}
                placeholder="Nom, e-mail, mot-clé…"
                aria-label="Rechercher"
                className="h-10 w-full rounded-full border border-navy-900/15 bg-white pr-4 pl-10 text-sm sm:w-64"
              />
            </div>
            <button type="submit" className="h-10 rounded-full bg-brand-gradient px-5 text-sm font-semibold text-white">
              Filtrer
            </button>
          </form>
        </div>

        {requests.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-navy-500">
              <Inbox className="size-6" aria-hidden />
            </span>
            <p className="mt-4 font-bold text-navy-900">Aucune demande ici</p>
            <p className="mt-1 text-sm text-navy-500">
              Les messages envoyés depuis le formulaire du site apparaîtront ici.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-navy-900/[0.06]">
            {requests.map((request) => (
              <li key={request.id}>
                <Link
                  href={`/admin/demandes/${request.id}`}
                  className="grid gap-2 px-4 py-4 transition-colors hover:bg-slate-50 sm:px-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)_auto] md:items-center md:gap-6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                        request.status === "nouveau" ? "bg-brand-gradient text-white" : "bg-slate-100 text-navy-700",
                      )}
                      aria-hidden
                    >
                      {request.name.trim().charAt(0).toUpperCase() || "?"}
                    </span>
                    <div className="min-w-0">
                      <p className={cn("truncate text-sm text-navy-900", request.status === "nouveau" ? "font-extrabold" : "font-semibold")}>
                        {request.name}
                      </p>
                      <p className="truncate text-xs text-navy-500">{request.email}</p>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <TypeBadge type={request.type} />
                      {request.service && <span className="truncate text-xs font-medium text-navy-500">{request.service}</span>}
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-navy-500">{request.message}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:gap-1.5">
                    <StatusBadge status={request.status} />
                    <span className="text-xs text-navy-500">{timeAgo(request.createdAt, now)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AdminShell>
  );
}

function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-navy-900/[0.06] bg-white p-8 shadow-sm">
      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-gradient text-white">
        <Database className="size-5.5" aria-hidden />
      </span>
      <h1 className="mt-5 text-2xl font-extrabold text-navy-900">Connectez la base de données</h1>
      <p className="mt-2 text-navy-500">
        Pour enregistrer et afficher les messages, ajoutez la variable <strong>DATABASE_URL</strong> (base
        PostgreSQL gratuite, par exemple sur Neon) dans votre fichier <code>.env.local</code> et chez votre
        hébergeur, puis redémarrez le site. La table se crée toute seule.
      </p>
    </div>
  );
}
