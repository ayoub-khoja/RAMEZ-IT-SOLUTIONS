"use client";

import { useActionState, useState } from "react";
import { CircleCheck, FileText, LoaderCircle, MessageSquare, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendContactMessage, type ContactFormState } from "@/actions/contact";
import { services } from "@/content/home";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);
  const errors = state.errors ?? {};
  const values = state.values;
  const [type, setType] = useState<"message" | "devis">(
    values?.type === "devis" ? "devis" : "message",
  );

  if (state.status === "success") {
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center py-16 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CircleCheck className="size-8" aria-hidden />
        </span>
        <p className="mt-6 text-xl font-bold text-navy-900">C&apos;est envoyé !</p>
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

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 block text-sm font-semibold text-navy-900">Votre demande</legend>
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5">
          {(
            [
              { value: "message", label: "Poser une question", icon: MessageSquare },
              { value: "devis", label: "Demander un devis", icon: FileText },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-all has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-500",
                type === option.value
                  ? "bg-white text-navy-900 shadow-sm"
                  : "text-navy-500 hover:text-navy-900",
              )}
            >
              <input
                type="radio"
                name="type"
                value={option.value}
                checked={type === option.value}
                onChange={() => setType(option.value)}
                className="sr-only"
              />
              <option.icon
                className={cn("size-4", type === option.value ? "text-violet-brand" : "")}
                aria-hidden
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

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

      {type === "devis" && (
        <>
          <Field label="Budget estimé" htmlFor="budget">
            <Select id="budget" name="budget" defaultValue={values?.budget ?? ""}>
              <option value="">Je ne sais pas encore</option>
              <option>Moins de 1 500 DT</option>
              <option>1 500 – 3 000 DT</option>
              <option>3 000 – 7 000 DT</option>
              <option>Plus de 7 000 DT</option>
            </Select>
          </Field>
          <Field label="Délai souhaité" htmlFor="deadline">
            <Select id="deadline" name="deadline" defaultValue={values?.deadline ?? ""}>
              <option value="">Flexible</option>
              <option>Urgent (moins de 2 semaines)</option>
              <option>Dans le mois</option>
              <option>D&apos;ici 2 à 3 mois</option>
            </Select>
          </Field>
        </>
      )}

      <Field label={type === "devis" ? "Décrivez votre projet" : "Votre message"} htmlFor="message" error={errors.message} className="sm:col-span-2">
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
          {isPending ? "Envoi en cours…" : type === "devis" ? "Demander mon devis" : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}
