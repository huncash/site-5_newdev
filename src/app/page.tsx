import type { Metadata } from "next";

import { PropertyLanding } from "@/components/listing/PropertyLanding";
import { copy } from "@/lib/copy";
import { applyOffer, resolvePricing } from "@/lib/pricingConfig";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const text = applyOffer(copy.hu, "hu", resolvePricing(new Date()));
  return {
  title: { absolute: text.metaTitle },
  description: text.metaDescription,
  robots: { index: true, follow: true },
  openGraph: {
    title: text.metaTitle,
    description: text.metaDescription,
    url: "https://eladoingatlan.szcenario.hu/",
    images: [
      {
        url: "/hirdetes/og-cover.jpg",
        width: 1024,
        height: 1024,
        alt: "Erdei faház a tölgyesben — Kismaros–Börzsönyliget",
      },
    ],
  },
  };
}

export default function ListingPage() {
  return <PropertyLanding />;
}
