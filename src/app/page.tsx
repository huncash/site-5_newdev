import type { Metadata } from "next";

import { PropertyLanding } from "@/components/listing/PropertyLanding";

export const metadata: Metadata = {
  title: { absolute: "Erdei faház Börzsönyligeten — 1046 m² privát telek" },
  description:
    "Kismaros-Börzsönyliget, zsákutca vége, a Börzsöny erdejében. Az elmúlt 2 év legjobb ajánlata: 28.450.000 Ft az eredeti 38 millió helyett, december elejéig.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Erdei faház Börzsönyligeten — 1046 m² privát telek",
    description:
      "45 perc, és a Börzsöny erdeje vesz körül. December elejéig 28,45 M Ft, az eredeti 38 millió helyett.",
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

export default function ListingPage() {
  return <PropertyLanding />;
}
