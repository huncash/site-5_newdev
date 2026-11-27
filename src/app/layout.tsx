import type { Metadata } from "next";

import { LanguageProvider } from "@/lib/i18n";
import { copy } from "@/lib/copy";
import { applyOffer, resolvePricing } from "@/lib/pricingConfig";

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

const listingMeta = applyOffer(copy.hu, "hu", resolvePricing(new Date()));

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: listingMeta.metaTitle,
    template: "%s · eladoingatlan.szcenario.hu",
  },
  description: listingMeta.metaDescription,
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
    title: listingMeta.metaTitle,
    description: listingMeta.metaDescription,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: listingMeta.metaTitle,
    description: listingMeta.metaDescription,
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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
