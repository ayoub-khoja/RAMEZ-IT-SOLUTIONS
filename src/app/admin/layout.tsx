import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "Espace admin", template: "%s | Admin RAMEZ" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div data-admin-root className="flex-1">
      {children}
    </div>
  );
}
