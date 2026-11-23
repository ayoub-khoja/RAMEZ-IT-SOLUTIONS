import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileText, Inbox, LayoutDashboard, LogOut, MessageSquare } from "lucide-react";
import { logout } from "@/actions/admin";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navigation = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, key: "dashboard" },
  { href: "/admin?statut=nouveau", label: "Nouveaux", icon: Inbox, key: "nouveau" },
  { href: "/admin?type=devis", label: "Devis", icon: FileText, key: "devis" },
  { href: "/admin?type=message", label: "Messages", icon: MessageSquare, key: "message" },
] as const;

export type AdminNavKey = (typeof navigation)[number]["key"] | "none";

export function AdminShell({ active, children }: { active: AdminNavKey; children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-slate-50 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="bg-mesh-dark sticky top-0 z-30 flex flex-col text-white lg:h-dvh">
        <div className="flex items-center justify-between gap-3 px-5 py-4 lg:block lg:px-6 lg:py-6">
          <Link href="/admin" className="inline-flex rounded-xl bg-white px-3 py-2">
            <Image src={logo} alt="RAMEZ IT Solutions" className="h-8 w-auto" sizes="140px" preload />
          </Link>
          <p className="hidden text-xs font-bold tracking-[0.2em] text-white/40 uppercase lg:mt-4 lg:block">
            Espace admin
          </p>
          <form action={logout} className="lg:hidden">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold"
            >
              <LogOut className="size-3.5" aria-hidden />
              Quitter
            </button>
          </form>
        </div>

        <nav aria-label="Navigation admin" className="overflow-x-auto px-3 pb-3 lg:flex-1 lg:px-4 lg:pb-0">
          <ul className="flex gap-1 lg:flex-col">
            {navigation.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
                    active === item.key
                      ? "bg-white/15 text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <item.icon className="size-4.5" aria-hidden />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden space-y-1 border-t border-white/10 p-4 lg:block">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="size-4.5" aria-hidden />
            Voir le site
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut className="size-4.5" aria-hidden />
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-6 sm:px-8 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}

export function AdminLoading() {
  return (
    <div className="animate-pulse space-y-6" aria-label="Chargement">
      <div className="h-8 w-64 rounded-lg bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-200" />
        ))}
      </div>
      <div className="h-96 rounded-2xl bg-slate-200" />
    </div>
  );
}
