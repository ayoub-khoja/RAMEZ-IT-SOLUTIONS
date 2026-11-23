import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { isAdminConfigured } from "@/lib/admin-session";
import { LoginForm } from "@/components/admin/login-form";
import logo from "@/assets/logo.png";

export const metadata: Metadata = { title: "Connexion" };

export default function LoginPage() {
  return (
    <div className="bg-mesh-dark relative isolate flex min-h-dvh items-center justify-center px-4 py-12">
      <div
        className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        aria-hidden
      />
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl shadow-black/30 sm:p-10">
        <Image src={logo} alt="RAMEZ IT Solutions" className="h-12 w-auto" sizes="200px" preload />
        <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-navy-900">Espace administrateur</h1>
        <p className="mt-2 text-sm text-navy-500">
          Connectez-vous pour gérer les messages et les demandes de devis.
        </p>

        <div className="mt-8">
          <Suspense fallback={<div className="h-36 animate-pulse rounded-2xl bg-slate-100" />}>
            <LoginBox />
          </Suspense>
        </div>

        <p className="mt-8 flex items-center gap-2 text-xs text-navy-500">
          <ShieldCheck className="size-4 text-emerald-600" aria-hidden />
          Connexion sécurisée, session valable 7 jours.
        </p>
      </div>
    </div>
  );
}

async function LoginBox() {
  // Vérifié à chaque visite (les variables d'environnement peuvent changer sans rebuild).
  await connection();
  if (isAdminConfigured()) return <LoginForm />;
  return (
    <p className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">
      L&apos;espace admin n&apos;est pas encore configuré. Ajoutez <strong>ADMIN_PASSWORD</strong> et{" "}
      <strong>ADMIN_SESSION_SECRET</strong> dans les variables d&apos;environnement.
    </p>
  );
}
