"use client";

import { Trash2 } from "lucide-react";
import { removeRequest } from "@/actions/admin";

export function DeleteButton({ id }: { id: number }) {
  return (
    <form
      action={removeRequest}
      onSubmit={(event) => {
        if (!window.confirm("Supprimer définitivement cette demande ?")) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 className="size-4" aria-hidden />
        Supprimer la demande
      </button>
    </form>
  );
}
