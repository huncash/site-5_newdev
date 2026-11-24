"use client";

import { useState, type FormEvent } from "react";

import { trackConversion } from "@/lib/conversion";
import { useI18n } from "@/lib/i18n";
import type { ListingVariant } from "@/lib/listing";

const fieldClass =
  "mt-1 w-full rounded-md border border-[#d4c9b5] bg-[#fffdf8] px-3 py-2.5 text-sm text-[#241f18] outline-none focus:border-[#e8b84a]";

type EnquiryFormProps = {
  variant?: ListingVariant;
  defaultMessage?: string;
};

export function EnquiryForm({ variant, defaultMessage = "" }: EnquiryFormProps) {
  const { t, lang } = useI18n();
  const selected = variant ? t.variants[variant] : null;
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState(defaultMessage);
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "invalid">("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmedContact = contact.trim();
    const looksEmail = trimmedContact.includes("@");
    if (!name.trim() || !trimmedContact || !message.trim()) {
      setStatus("invalid");
      setErrorDetail("");
      return;
    }
    setStatus("sending");
    setErrorDetail("");
    try {
      const response = await fetch("/api/erdeklodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: looksEmail ? trimmedContact : "",
          phone: looksEmail ? "" : trimmedContact,
          message,
          company,
          website,
          consent: true,
          variant: variant ?? null,
          lang,
        }),
      });
      let payload: { error?: string; detail?: string; ok?: boolean; mail?: boolean; file?: boolean } | null =
        null;
      try {
        payload = (await response.json()) as {
          error?: string;
          detail?: string;
          ok?: boolean;
          mail?: boolean;
          file?: boolean;
        };
      } catch {
        payload = null;
      }
      // Siker: { ok: true } (mail:false + file:true is OK), vagy HTTP 200 hiba mező nélkül.
      const accepted = payload?.ok === true || (response.ok && !payload?.error);
      if (accepted) {
        setStatus("sent");
        trackConversion("listing_enquiry_submit_success", {
          variant: variant ?? "general",
          mail: payload?.mail === true ? "1" : "0",
          file: payload?.file === true ? "1" : "0",
        });
        setName("");
        setContact("");
        setMessage(defaultMessage);
        return;
      }
      const code = payload?.error ?? `http_${response.status}`;
      setErrorDetail(
        response.status === 503 || code === "delivery" || code === "mail"
          ? t.form.unavailable
          : response.status === 400
            ? t.form.badFields
            : `${t.form.serverError} (${code}).`,
      );
      setStatus("error");
      trackConversion("listing_enquiry_submit_error", {
        variant: variant ?? "general",
        status: response.status.toString(),
        code,
      });
    } catch {
      setErrorDetail(t.form.network);
      setStatus("error");
      trackConversion("listing_enquiry_submit_error", { variant: variant ?? "general" });
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-md border border-[#c5d4b8] bg-[#eef5e8] px-5 py-6 text-sm leading-relaxed text-[#1c2e1a]"
      >
        <p className="text-base font-semibold text-[#0f2e1f]">{t.form.thanksTitle}</p>
        <p className="mt-2">
          {t.form.thanksBody}
          {selected ? ` (${selected.label})` : ""}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {variant ? (
        <p className="rounded-md border border-[#d4c9b5] bg-[#f7f1e6] px-3 py-2 text-sm">
          {t.form.interest}:{" "}
          <span className="font-semibold">
            {selected?.label} — {selected?.price}
          </span>
        </p>
      ) : null}
      <label className="block text-sm">
        {t.form.name}
        <input required value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} autoComplete="name" />
      </label>
      <label className="block text-sm">
        {t.form.contact}
        <input
          required
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          className={fieldClass}
          autoComplete="tel"
          inputMode="email"
          placeholder={t.form.placeholder}
        />
      </label>
      <label className="block text-sm">
        {t.form.message}
        <textarea required rows={4} value={message} onChange={(event) => setMessage(event.target.value)} className={fieldClass} />
      </label>
      {/* Rejtett honeypot — nem kérünk céget / weboldalt a látogatótól */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          {t.form.company}
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
        </label>
        <label>
          {t.form.website}
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        </label>
      </div>
      <p className="text-xs leading-relaxed text-[#6b6154]">
        {t.form.consent}
      </p>
      {status === "invalid" ? <p className="text-sm text-[#8a3a1a]">{t.form.invalid}</p> : null}
      {status === "error" ? (
        <p className="text-sm text-[#8a3a1a]" role="alert">
          {errorDetail || t.form.errorFallback}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-[#e8b84a] px-5 py-3 text-sm font-semibold text-[#241f18] disabled:opacity-60"
      >
        {status === "sending" ? t.form.sending : t.form.submit}
      </button>
    </form>
  );
}
