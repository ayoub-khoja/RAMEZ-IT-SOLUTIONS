import QRCode from "qrcode";
import { siteConfig } from "@/config/site";

/**
 * Le QR code pointe toujours vers le nom de domaine du site (siteConfig.url).
 * Il est recalculé à partir de cette adresse : tant que le domaine ne change pas,
 * le QR code reste exactement le même (on peut l'imprimer sans crainte).
 */
export function getSiteQrCode() {
  const url = siteConfig.url;
  // Niveau de correction « H » (30 %) : le QR reste lisible même abîmé ou imprimé petit.
  const qr = QRCode.create(url, { errorCorrectionLevel: "H" });
  const size = qr.modules.size;
  // Chaîne de "0" et "1" (ligne par ligne) : simple à transmettre au composant client.
  const matrix = Array.from(qr.modules.data, (cell) => (cell ? "1" : "0")).join("");
  return { url, size, matrix };
}
