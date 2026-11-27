import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { VariantInterest } from "@/components/listing/VariantInterest";
import { copy } from "@/lib/copy";
import type { ListingVariant } from "@/lib/listing";
import { applyOffer, parsePreviewDate, resolvePricing } from "@/lib/pricingConfig";

const VARIANTS: ListingVariant[] = ["a", "b"];

export function generateStaticParams() {
  return VARIANTS.map((valtozat) => ({ valtozat }));
}

function pricedCopy(previewDate: string | undefined) {
  return applyOffer(copy.hu, "hu", resolvePricing(parsePreviewDate(previewDate) ?? new Date()));
}

export function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ valtozat: string }>;
  searchParams: Promise<{ previewDate?: string }>;
}): Promise<Metadata> {
  return Promise.all([params, searchParams]).then(([{ valtozat }, query]) => {
    const code = valtozat.toLowerCase();
    if (code !== "a" && code !== "b") {
      return { title: { absolute: "Érdeklődés" }, robots: { index: false, follow: false } };
    }
    const text = pricedCopy(query.previewDate);
    const variant = code === "a" && text.pricing.schedule.length === 0 ? text.variants.b : text.variants[code];
    return {
      title: { absolute: `Érdeklődés — ${variant.label}` },
      description: text.metaDescription,
      robots: { index: false, follow: false },
    };
  });
}

export default async function VariantInterestPage({
  params,
  searchParams,
}: {
  params: Promise<{ valtozat: string }>;
  searchParams: Promise<{ lang?: string; previewDate?: string }>;
}) {
  const { valtozat } = await params;
  const query = await searchParams;
  const code = valtozat.toLowerCase();
  if (code !== "a" && code !== "b") notFound();

  const offer = resolvePricing(parsePreviewDate(query.previewDate) ?? new Date());
  if (code === "a" && !offer.deferred) {
    const next = new URLSearchParams();
    if (query.lang === "en" || query.lang === "de" || query.lang === "hu") next.set("lang", query.lang);
    if (parsePreviewDate(query.previewDate)) next.set("previewDate", query.previewDate ?? "");
    const suffix = next.size ? `?${next.toString()}` : "";
    redirect(`/erdeklodes/b${suffix}`);
  }

  return <VariantInterest variant={code} />;
}
