import { Suspense } from "react";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { getSiteQrCode } from "@/lib/site-qr";
import { AdminLoading, AdminShell } from "@/components/admin/admin-shell";
import { QrCodeStudio } from "@/components/admin/qr-code-studio";

export const metadata: Metadata = { title: "QR code" };

export default function QrCodePage() {
  return (
    <Suspense
      fallback={
        <AdminShell active="qrcode">
          <AdminLoading />
        </AdminShell>
      }
    >
      <QrCodeContent />
    </Suspense>
  );
}

async function QrCodeContent() {
  await requireAdmin();
  const qr = getSiteQrCode();

  return (
    <AdminShell active="qrcode">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">QR code du site</h1>
        <p className="mt-1 text-sm text-navy-500">
          Téléchargez le QR code qui mène vers votre site, en version simple ou en carte personnalisée.
        </p>
        <div className="mt-6">
          <QrCodeStudio url={qr.url} size={qr.size} matrix={qr.matrix} />
        </div>
      </div>
    </AdminShell>
  );
}
