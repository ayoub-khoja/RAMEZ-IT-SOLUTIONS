import postgres from "postgres";

/*
 * Connexion à la base de données PostgreSQL (Neon, Supabase, Vercel Postgres…).
 * L'adresse se met dans la variable d'environnement DATABASE_URL.
 */

declare global {
  var __ramezSql: ReturnType<typeof postgres> | undefined;
  var __ramezSchema: Promise<void> | undefined;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL manquant : ajoutez l'adresse de la base dans .env.local");
  }
  globalThis.__ramezSql ??= postgres(url, {
    ssl: url.includes("localhost") ? false : "require",
    max: 5,
    idle_timeout: 20,
    prepare: false,
  });
  return globalThis.__ramezSql;
}

/** Crée la table automatiquement la première fois (aucune manipulation SQL à faire). */
export async function ensureSchema() {
  globalThis.__ramezSchema ??= (async () => {
    const sql = getSql();
    await sql`
      create table if not exists demandes (
        id          bigserial primary key,
        created_at  timestamptz not null default now(),
        updated_at  timestamptz not null default now(),
        type        text not null default 'message',
        status      text not null default 'nouveau',
        name        text not null,
        email       text not null,
        phone       text not null default '',
        service     text not null default '',
        budget      text not null default '',
        deadline    text not null default '',
        message     text not null,
        notes       text not null default ''
      )
    `;
    await sql`create index if not exists demandes_created_at_idx on demandes (created_at desc)`;
  })().catch((error) => {
    globalThis.__ramezSchema = undefined;
    throw error;
  });
  return globalThis.__ramezSchema;
}
