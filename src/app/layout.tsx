import type { Metadata } from "next";

import "./globals.css";
import "./listing-fonts.css";

const SITE_URL = "https://eladoingatlan.szcenario.hu";
const OG_IMAGE = {
  url: "/hirdetes/og-cover.jpg",
  width: 1024,
  height: 1024,
  alt: "Erdei faház a tölgyesben — Kismaros–Börzsönyliget",
  type: "image/jpeg",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Erdei faház Börzsönyligeten — 1046 m² privát telek",
    template: "%s · eladoingatlan.szcenario.hu",
  },
  description:
    "Kismaros-Börzsönyliget, zsákutca vége, a Börzsöny erdejében. Az elmúlt 2 év legjobb ajánlata: 28.450.000 Ft az eredeti 38 millió helyett, december elejéig.",
  icons: {
    icon: [
      { url: "/hirdetes/favicon.ico", sizes: "any" },
      { url: "/hirdetes/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/hirdetes/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/hirdetes/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/hirdetes/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/hirdetes/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: SITE_URL,
    siteName: "eladoingatlan.szcenario.hu",
    title: "Erdei faház Börzsönyligeten — 1046 m² privát telek",
    description:
      "45 perc, és a Börzsöny erdeje vesz körül. December elejéig 28,45 M Ft, az eredeti 38 millió helyett.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erdei faház Börzsönyligeten — 1046 m² privát telek",
    description:
      "45 perc, és a Börzsöny erdeje vesz körül. December elejéig 28,45 M Ft, az eredeti 38 millió helyett.",
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <head>
        <meta name="theme-color" content="#14221b" />
      </head>
      <body className="listing-root antialiased">
        {children}
      </body>
    </html>
  );
}
