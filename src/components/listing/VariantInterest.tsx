"use client";

import Link from "next/link";

import { EnquiryForm } from "@/components/listing/EnquiryForm";
import { LanguageSwitcher, useI18n } from "@/lib/i18n";
import { ListingPhoneProvider, ListingSellerCard } from "@/components/listing/ListingContact";
import { LISTING_LOGO, type ListingVariant } from "@/lib/listing";

export function VariantInterest({ variant }: { variant: ListingVariant }) {
  const { t, lang, href, eurNote } = useI18n();
  const selected = t.variants[variant];
  const other: ListingVariant = variant === "a" ? "b" : "a";
  const otherOffer = t.variants[other];

  return (
    <ListingPhoneProvider>
      <div className="min-h-screen bg-[#efe8db] text-[#241f18]">
        <header className="border-b border-[#d4c9b5] bg-[#efe8db]/95">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
            <Link
              href={href("/#teteje")}
              className="inline-flex min-w-0 items-center gap-2.5 text-sm font-semibold tracking-wide text-[#0f2e1f] hover:opacity-90"
            >
              <img
                src={LISTING_LOGO.src}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 object-contain"
                decoding="async"
              />
              <span className="truncate">{t.brand}</span>
            </Link>
            <div className="flex shrink-0 items-center gap-3">
              <LanguageSwitcher />
              <Link href={href("/#azaras")} className="text-sm hover:underline">
                {t.interest.back}
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-sm uppercase tracking-[0.16em] text-[#6b6154]">
            {t.interest.kicker} · {selected.label}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-medium sm:text-4xl">{selected.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">{t.interest.same}</p>
          {eurNote ? <p className="mt-2 max-w-3xl text-xs leading-relaxed text-[#6b6154]">{eurNote}</p> : null}

          <section className="mt-10 grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#f7f1e6] p-5 lg:col-span-2">
              <h2 className="text-xl font-medium">
                {t.interest.offer} — {selected.short}
              </h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[#6b6154]">{t.interest.price}</dt>
                  <dd className="mt-1 text-2xl font-medium text-[#d4a017]">{selected.price}</dd>
                  <dd className="mt-1 text-xs text-[#6b6154]">{selected.note}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[#6b6154]">{t.interest.schedule}</dt>
                  <dd className="mt-1 text-sm font-medium leading-snug text-[#241f18]">{selected.deposit}</dd>
                  <dd className="mt-2 text-xs uppercase tracking-wide text-[#6b6154]">{t.interest.handover}</dd>
                  <dd className="mt-1 text-sm text-[#5a5146]">{selected.possession}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wide text-[#6b6154]">{t.interest.plot}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#5a5146]">{t.interest.plotBody}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-[#5a5146]">{selected.summary}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#5a5146]">{t.pricing.fixtures}</p>
            </article>

            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <h2 className="text-lg font-medium">{t.interest.factsTitle}</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5a5146]">
                {t.interest.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-8 overflow-hidden rounded-lg border border-[#d4c9b5] bg-[#f7f1e6]">
            <div className="border-b border-[#d4c9b5] px-5 py-4">
              <h2 className="text-xl font-medium">{t.interest.both}</h2>
              <p className="mt-1 text-sm text-[#5a5146]">{t.pricing.intro}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-[#efe8db] text-xs uppercase tracking-wide text-[#6b6154]">
                  <tr>
                    <th className="px-5 py-3 font-medium">{t.interest.colOption}</th>
                    <th className="px-5 py-3 font-medium">{t.interest.price}</th>
                    <th className="px-5 py-3 font-medium">{t.interest.colNote}</th>
                  </tr>
                </thead>
                <tbody>
                  {(["a", "b"] as const).map((code) => (
                    <tr key={code} className={variant === code ? "bg-[#f5edd4]" : ""}>
                      <td className="border-t border-[#d4c9b5] px-5 py-3 font-medium">
                        {t.variants[code].label}
                        {variant === code ? ` · ${t.interest.watching}` : ""}
                      </td>
                      <td className="border-t border-[#d4c9b5] px-5 py-3 font-medium text-[#d4a017]">
                        {t.variants[code].price}
                      </td>
                      <td className="border-t border-[#d4c9b5] px-5 py-3 text-[#5a5146]">{t.variants[code].note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="mt-4 text-sm text-[#5a5146]">
            {t.interest.other}:{" "}
            <Link href={href(`/erdeklodes/${other}`)} className="font-semibold underline">
              {otherOffer.title}
            </Link>
          </p>

          <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-2xl font-medium">{t.interest.contactTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146] sm:text-base">{t.interest.contactLead}</p>
              <ListingSellerCard />
            </div>
            <div className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5 sm:p-6">
              <EnquiryForm
                key={`${lang}-${variant}`}
                variant={variant}
                defaultMessage={`${t.form.defaultMessage} (${selected.label}, ${selected.price})`}
              />
            </div>
          </section>
        </main>

        <footer className="border-t border-[#d4c9b5] px-4 py-8">
          <div className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-[#6b6154]">
            <p>{t.footer}</p>
          </div>
        </footer>
      </div>
    </ListingPhoneProvider>
  );
}
