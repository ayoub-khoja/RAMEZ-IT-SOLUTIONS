const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Tunis",
});

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}

export function timeAgo(date: Date, now: number) {
  const minutes = Math.round((now - date.getTime()) / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.round(hours / 24);
  if (days < 30) return `il y a ${days} j`;
  return formatDate(date);
}

/** Lien WhatsApp à partir d'un numéro saisi par le client. */
export function whatsappFromPhone(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 8) digits = `216${digits}`; // numéro tunisien sans indicatif
  return digits.length >= 8 ? `https://wa.me/${digits}` : null;
}

/** Heure actuelle (appelée une seule fois par page, côté serveur). */
export function currentTime() {
  return Date.now();
}
