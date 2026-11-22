"use client";

import { useActionState } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { sendContactMessage, type ContactFormState } from "@/actions/contact";
import { services } from "@/content/home";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);
  const errors = state.errors ?? {};
  const values = state.values;

  if (state.status === "success") {
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center py-16 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CircleCheck className="size-8" aria-hidden />
        </span>
        <p className="mt-6 text-xl font-bold text-navy-900">Message envoyé</p>
        <p className="mt-2 max-w-sm text-navy-500">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-5 sm:grid-cols-2">
      {/* Champ caché anti-robots : ne pas supprimer */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Nom complet" htmlFor="name" error={errors.name}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          defaultValue={values?.name}
          placeholder="Votre nom"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
      </Field>

      <Field label="E-mail" htmlFor="email" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={values?.email}
          placeholder="vous@entreprise.com"
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
      </Field>

      <Field label="Téléphone" htmlFor="phone">
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={values?.phone}
          placeholder="Optionnel"
        />
      </Field>

      <Field label="Service souhaité" htmlFor="service">
        <Select id="service" name="service" defaultValue={values?.service ?? ""}>
          <option value="" disabled>
            Choisir un service
          </option>
          {services.map((service) => (
            <option key={service.title}>{service.title}</option>
          ))}
          <option>Autre</option>
        </Select>
      </Field>

      <Field label="Votre projet" htmlFor="message" error={errors.message} className="sm:col-span-2">
        <Textarea
          id="message"
          name="message"
          defaultValue={values?.message}
          placeholder="Décrivez votre projet, vos objectifs et vos délais…"
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-sm text-red-600">
          {state.status === "error" && state.message}
        </p>
        <Button type="submit" size="lg" disabled={isPending} className="sm:min-w-52">
          {isPending ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {isPending ? "Envoi en cours…" : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}
