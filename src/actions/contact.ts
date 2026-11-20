"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: Record<"name" | "email" | "phone" | "service" | "message", string>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "");

  const errors: ContactFormState["errors"] = {};
  if (name.length < 2) errors.name = "Veuillez indiquer votre nom.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Adresse e-mail invalide.";
  if (message.length < 10) errors.message = "Votre message doit contenir au moins 10 caractères.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Merci de corriger les champs indiqués.",
      errors,
      values: { name, email, phone, service, message },
    };
  }

  // TODO: brancher un service d'envoi d'e-mails (Resend, Nodemailer…) avant la mise en production.
  console.info("[contact]", { name, email, phone, service, message });

  return {
    status: "success",
    message: "Merci ! Votre message a bien été envoyé. Nous vous répondrons sous 24h.",
  };
}
