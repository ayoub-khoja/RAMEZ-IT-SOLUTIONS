"use server";

import { siteConfig } from "@/config/site";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: Record<"name" | "email" | "phone" | "service" | "message", string>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Envoie l'e-mail avec Resend (https://resend.com).
 * Variables à mettre dans le fichier .env.local :
 *   RESEND_API_KEY=re_xxxxxxxx
 *   CONTACT_TO_EMAIL=ramez.it.solutions@gmail.com   (facultatif)
 *   CONTACT_FROM_EMAIL=RAMEZ IT Solutions <onboarding@resend.dev>   (facultatif)
 */
async function sendEmail(data: Record<"name" | "email" | "phone" | "service" | "message", string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Pas encore configuré : on affiche le message dans le terminal pour ne rien perdre.
    console.warn("[contact] RESEND_API_KEY manquant, e-mail non envoyé :", data);
    return true;
  }

  const rows = [
    ["Nom", data.name],
    ["E-mail", data.email],
    ["Téléphone", data.phone || "—"],
    ["Service", data.service || "—"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#43546e">${label}</td><td style="padding:6px 12px;font-weight:600">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "RAMEZ IT Solutions <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email],
      reply_to: data.email,
      subject: `Nouveau message de ${data.name} — ${data.service || "Site web"}`,
      text: `Nom : ${data.name}\nE-mail : ${data.email}\nTéléphone : ${data.phone || "—"}\nService : ${data.service || "—"}\n\n${data.message}`,
      html: `<div style="font-family:Arial,sans-serif;color:#021737">
        <h2 style="margin:0 0 16px">Nouveau message depuis le site</h2>
        <table style="border-collapse:collapse;margin-bottom:16px">${rows}</table>
        <p style="white-space:pre-wrap;line-height:1.6;background:#f1f5f9;padding:16px;border-radius:12px">${escapeHtml(data.message)}</p>
      </div>`,
    }),
  });

  if (!response.ok) {
    console.error("[contact] Erreur Resend", response.status, await response.text());
    return false;
  }
  return true;
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "");
  const values = { name, email, phone, service, message };

  const errors: ContactFormState["errors"] = {};
  if (name.length < 2) errors.name = "Veuillez indiquer votre nom.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Adresse e-mail invalide.";
  if (message.length < 10) errors.message = "Votre message doit contenir au moins 10 caractères.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Merci de corriger les champs indiqués.",
      errors,
      values,
    };
  }

  // Petit piège anti-robots : ce champ caché doit rester vide.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success", message: "Merci ! Votre message a bien été envoyé." };
  }

  let sent = false;
  try {
    sent = await sendEmail(values);
  } catch (error) {
    console.error("[contact] Envoi impossible", error);
  }

  if (!sent) {
    return {
      status: "error",
      message: `L'envoi a échoué. Écrivez-nous directement à ${siteConfig.contact.email} ou sur WhatsApp.`,
      values,
    };
  }

  return {
    status: "success",
    message: "Merci ! Votre message a bien été envoyé. Nous vous répondrons sous 24h.",
  };
}
