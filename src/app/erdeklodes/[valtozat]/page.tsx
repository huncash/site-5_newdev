import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VariantInterest } from "@/components/listing/VariantInterest";
import type { ListingVariant } from "@/lib/listing";

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
        absolute: `Érdeklődés — ${code === "a" ? "Novemberi szerződéskötési kedvezmény" : "Alapár"}`,
      },
      description:
        "Fix vételár, novemberi szerződéskötési kedvezmény (2. részlet: 2027. január 4–8.) és kapcsolatfelvétel közvetlenül a tulajdonossal.",
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
