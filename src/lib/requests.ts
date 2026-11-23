import { ensureSchema, getSql } from "./db";

export const REQUEST_TYPES = {
  message: "Message",
  devis: "Demande de devis",
} as const;

export const REQUEST_STATUSES = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  traite: "Traité",
  archive: "Archivé",
} as const;

export type RequestType = keyof typeof REQUEST_TYPES;
export type RequestStatus = keyof typeof REQUEST_STATUSES;

export type ClientRequest = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  type: RequestType;
  status: RequestStatus;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  deadline: string;
  message: string;
  notes: string;
};

type Row = {
  id: string;
  created_at: Date;
  updated_at: Date;
  type: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  deadline: string;
  message: string;
  notes: string;
};

export function isRequestType(value: unknown): value is RequestType {
  return typeof value === "string" && value in REQUEST_TYPES;
}

export function isRequestStatus(value: unknown): value is RequestStatus {
  return typeof value === "string" && value in REQUEST_STATUSES;
}

function toRequest(row: Row): ClientRequest {
  return {
    id: Number(row.id),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    type: isRequestType(row.type) ? row.type : "message",
    status: isRequestStatus(row.status) ? row.status : "nouveau",
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    budget: row.budget,
    deadline: row.deadline,
    message: row.message,
    notes: row.notes,
  };
}

export type NewRequest = Pick<
  ClientRequest,
  "type" | "name" | "email" | "phone" | "service" | "budget" | "deadline" | "message"
>;

export async function createRequest(data: NewRequest) {
  await ensureSchema();
  const sql = getSql();
  const [row] = await sql<{ id: string }[]>`
    insert into demandes (type, name, email, phone, service, budget, deadline, message)
    values (${data.type}, ${data.name}, ${data.email}, ${data.phone}, ${data.service}, ${data.budget}, ${data.deadline}, ${data.message})
    returning id
  `;
  return Number(row.id);
}

export type RequestFilters = {
  status?: RequestStatus;
  type?: RequestType;
  search?: string;
};

export async function listRequests(filters: RequestFilters = {}) {
  await ensureSchema();
  const sql = getSql();
  const search = filters.search?.trim();
  const pattern = search ? `%${search.replace(/[%_\\]/g, "\\$&")}%` : null;

  const rows = await sql<Row[]>`
    select * from demandes
    where true
      ${filters.status ? sql`and status = ${filters.status}` : sql``}
      ${filters.type ? sql`and type = ${filters.type}` : sql``}
      ${
        pattern
          ? sql`and (name ilike ${pattern} or email ilike ${pattern} or phone ilike ${pattern} or message ilike ${pattern} or service ilike ${pattern})`
          : sql``
      }
    order by created_at desc
    limit 500
  `;
  return rows.map(toRequest);
}

export async function getRequest(id: number) {
  await ensureSchema();
  const sql = getSql();
  const [row] = await sql<Row[]>`select * from demandes where id = ${id}`;
  return row ? toRequest(row) : null;
}

export async function getRequestStats() {
  await ensureSchema();
  const sql = getSql();
  const [row] = await sql<
    { total: string; nouveaux: string; en_cours: string; devis: string; ce_mois: string }[]
  >`
    select
      count(*) as total,
      count(*) filter (where status = 'nouveau') as nouveaux,
      count(*) filter (where status = 'en_cours') as en_cours,
      count(*) filter (where type = 'devis') as devis,
      count(*) filter (where created_at >= date_trunc('month', now())) as ce_mois
    from demandes
  `;
  return {
    total: Number(row.total),
    nouveaux: Number(row.nouveaux),
    enCours: Number(row.en_cours),
    devis: Number(row.devis),
    ceMois: Number(row.ce_mois),
  };
}

export async function updateRequestStatus(id: number, status: RequestStatus) {
  await ensureSchema();
  const sql = getSql();
  await sql`update demandes set status = ${status}, updated_at = now() where id = ${id}`;
}

export async function updateRequestNotes(id: number, notes: string) {
  await ensureSchema();
  const sql = getSql();
  await sql`update demandes set notes = ${notes}, updated_at = now() where id = ${id}`;
}

export async function deleteRequest(id: number) {
  await ensureSchema();
  const sql = getSql();
  await sql`delete from demandes where id = ${id}`;
}
