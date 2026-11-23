import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "./admin-session";

export async function isAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  // La vérification dépend de l'heure actuelle : uniquement au moment de la requête.
  await connection();
  return verifySessionToken(token);
}

/** À appeler au début de chaque page et action de l'espace admin. */
export async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}
