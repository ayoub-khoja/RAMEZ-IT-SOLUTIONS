import { FileText, MessageSquare } from "lucide-react";
import { REQUEST_STATUSES, REQUEST_TYPES, type RequestStatus, type RequestType } from "@/lib/requests";
import { cn } from "@/lib/utils";

const statusStyles: Record<RequestStatus, string> = {
  nouveau: "bg-blue-50 text-blue-700 ring-blue-200",
  en_cours: "bg-amber-50 text-amber-700 ring-amber-200",
  traite: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  archive: "bg-slate-100 text-slate-600 ring-slate-200",
};

const statusDots: Record<RequestStatus, string> = {
  nouveau: "bg-blue-500",
  en_cours: "bg-amber-500",
  traite: "bg-emerald-500",
  archive: "bg-slate-400",
};

export function StatusBadge({ status, className }: { status: RequestStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ring-1 ring-inset",
        statusStyles[status],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", statusDots[status])} aria-hidden />
      {REQUEST_STATUSES[status]}
    </span>
  );
}

export function TypeBadge({ type, className }: { type: RequestType; className?: string }) {
  const Icon = type === "devis" ? FileText : MessageSquare;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        type === "devis" ? "bg-violet-50 text-violet-700" : "bg-slate-100 text-navy-700",
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {type === "devis" ? "Devis" : REQUEST_TYPES[type]}
    </span>
  );
}
