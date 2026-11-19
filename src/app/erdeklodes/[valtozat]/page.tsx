import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VariantInterest } from "@/components/listing/VariantInterest";
import { VARIANT_OFFER, type ListingVariant } from "@/lib/listing";

const VARIANTS: ListingVariant[] = ["a", "b"];

export function generateStaticParams() {
  return VARIANTS.map((valtozat) => ({ valtozat }));
}

export function generateMetadata({ params }: { params: Promise<{ valtozat: string }> }): Promise<Metadata> {
  return params.then(({ valtozat }) => {
    const code = valtozat.toLowerCase();
    if (code !== "a" && code !== "b") {
      return { title: { absolute: "Érdeklődés" }, robots: { index: false, follow: false } };
    }
    return {
      title: {
        absolute: `Érdeklődés — ${code === "a" ? VARIANT_OFFER.a.optionLabel : VARIANT_OFFER.b.optionLabel}`,
      },
      description:
        "Az elmúlt 2 év legjobb ajánlata: 28,45 M Ft használati korlátozás nélkül, vagy 27,7 M Ft januári utalással. Januártól várhatóan 30 millió körül.",
      robots: { index: false, follow: false },
    };
  });
}

export default async function VariantInterestPage({ params }: { params: Promise<{ valtozat: string }> }) {
  const { valtozat } = await params;
  const code = valtozat.toLowerCase();
  if (code !== "a" && code !== "b") notFound();

  return <VariantInterest variant={code} />;
}
