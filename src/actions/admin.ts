"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  checkPassword,
  createSessionToken,
  isAdminConfigured,
} from "@/lib/admin-session";
import {
  deleteRequest,
  isRequestStatus,
  updateRequestNotes,
  updateRequestStatus,
} from "@/lib/requests";

export type LoginState = { error?: string };

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { error: "L'espace admin n'est pas configuré (ADMIN_PASSWORD et ADMIN_SESSION_SECRET)." };
  }

  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    // Petite pause pour ralentir les essais automatiques.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "Mot de passe incorrect." };
  }

  (await cookies()).set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

function readId(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id <= 0) throw new Error("Identifiant invalide");
  return id;
}

export async function changeStatus(formData: FormData) {
  await requireAdmin();
  const id = readId(formData);
  const status = formData.get("status");
  if (!isRequestStatus(status)) throw new Error("Statut invalide");
  await updateRequestStatus(id, status);
  redirect(`/admin/demandes/${id}`);
}

export async function saveNotes(formData: FormData) {
  await requireAdmin();
  const id = readId(formData);
  const notes = String(formData.get("notes") ?? "").slice(0, 5000);
  await updateRequestNotes(id, notes);
  redirect(`/admin/demandes/${id}?enregistre=1`);
}

export async function removeRequest(formData: FormData) {
  await requireAdmin();
  const id = readId(formData);
  await deleteRequest(id);
  redirect("/admin?supprime=1");
}
