"use server";

import { siteConfig } from "@/config/site";
import { isDatabaseConfigured } from "@/lib/db";
import { createRequest, isRequestType, REQUEST_TYPES, type RequestType } from "@/lib/requests";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: Record<"type" | "name" | "email" | "phone" | "service" | "budget" | "deadline" | "message", string>;
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
type FormValues = NonNullable<ContactFormState["values"]>;

async function sendEmail(data: FormValues) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Pas encore configuré : on affiche le message dans le terminal pour ne rien perdre.
    console.warn("[contact] RESEND_API_KEY manquant, e-mail non envoyé :", data);
    return null;
  }

  const typeLabel = REQUEST_TYPES[data.type as RequestType] ?? "Message";
  const rows = [
    ["Type", typeLabel],
    ["Nom", data.name],
    ["E-mail", data.email],
    ["Téléphone", data.phone || "—"],
    ["Service", data.service || "—"],
    ["Budget", data.budget || "—"],
    ["Délai", data.deadline || "—"],
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
      subject: `${typeLabel} de ${data.name} — ${data.service || "Site web"}`,
      text: `${typeLabel}\nNom : ${data.name}\nE-mail : ${data.email}\nTéléphone : ${data.phone || "—"}\nService : ${data.service || "—"}\nBudget : ${data.budget || "—"}\nDélai : ${data.deadline || "—"}\n\n${data.message}`,
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
  const service = String(formData.get("service") ?? "").slice(0, 120);
  const rawType = formData.get("type");
  const type: RequestType = isRequestType(rawType) ? rawType : "message";
  const budget = type === "devis" ? String(formData.get("budget") ?? "").slice(0, 80) : "";
  const deadline = type === "devis" ? String(formData.get("deadline") ?? "").slice(0, 80) : "";
  const values = { type, name, email, phone, service, budget, deadline, message };

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

  if (name.length > 120 || email.length > 200 || phone.length > 40 || message.length > 5000) {
    return { status: "error", message: "Un des champs est trop long.", values };
  }

  // 1) Enregistrement dans la base (visible dans /admin)
  let saved: boolean | null = null;
  if (isDatabaseConfigured()) {
    try {
      await createRequest({ type, name, email, phone, service, budget, deadline, message });
      saved = true;
    } catch (error) {
      console.error("[contact] Enregistrement impossible", error);
      saved = false;
    }
  }

  // 2) Notification par e-mail
  let sent: boolean | null = null;
  try {
    sent = await sendEmail(values);
  } catch (error) {
    console.error("[contact] Envoi impossible", error);
    sent = false;
  }

  // Erreur seulement si rien n'a fonctionné.
  if (saved !== true && sent !== true && (saved === false || sent === false)) {
    return {
      status: "error",
      message: `L'envoi a échoué. Écrivez-nous directement à ${siteConfig.contact.email} ou sur WhatsApp.`,
      values,
    };
  }

  return {
    status: "success",
    message:
      type === "devis"
        ? "Merci ! Votre demande de devis a bien été envoyée. Nous vous répondrons sous 24h."
        : "Merci ! Votre message a bien été envoyé. Nous vous répondrons sous 24h.",
  };
}
