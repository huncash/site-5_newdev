import type { Metadata } from "next";

import { PropertyLanding } from "@/components/listing/PropertyLanding";

export const metadata: Metadata = {
  title: { absolute: "Erdei faház Börzsönyligeten — 1046 m² privát telek" },
  description:
    "Kismaros-Börzsönyliget, zsákutca vége. 1046 m² saját telek. Azonnali ár 27,2 M Ft; november 30-ig 26,6 M Ft. Vezetékes ivóvíz.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Erdei faház Börzsönyligeten — 1046 m² privát telek",
    description:
      "45 perc, és a Börzsöny erdeje vesz körül. Azonnali ár 27,2 M Ft, november 30-ig 26,6 M Ft.",
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
