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
        "November 30-ig 26.600.000 Ft, azonnali ár 27.200.000 Ft. Az ár fix, a jelenlegi berendezéssel együtt.",
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
