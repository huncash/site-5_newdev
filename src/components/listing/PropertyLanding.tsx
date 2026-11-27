"use client";

import {
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplets,
  FileText,
  House,
  MapPin,
  Menu,
  Ruler,
  Thermometer,
  Trees,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState, type MouseEvent, type ReactNode } from "react";

import { EnquiryForm } from "@/components/listing/EnquiryForm";
import { OfferCountdown } from "@/components/listing/OfferCountdown";
import {
  ListingMobileContact,
  ListingPhoneProvider,
  ListingSellerCard,
  trackListingCta,
} from "@/components/listing/ListingContact";
import { ListingTopoMap } from "@/components/listing/ListingTopoMap";
import { LanguageSwitcher, useI18n } from "@/lib/i18n";
import { HERO_IMAGE, LISTING_LOGO, PHOTOS, TOUR_URL, UTILITY_PHOTOS } from "@/lib/listing";

type Lightbox =
  | { kind: "gallery"; index: number }
  | { kind: "utility"; index: number }
  | null;

function MapFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex justify-center">
      <div className="w-full max-w-[800px] overflow-hidden rounded-lg border border-[#d4c9b5] bg-[#f7f1e6]">
        {children}
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-[#241f18] sm:text-base">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#0f2e1f] transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={panelId} className="border-t border-[#d4c9b5] px-5 py-4 text-sm leading-relaxed text-[#5a5146]">
          {answer}
        </div>
      ) : null}
    </div>
  );
}

export function PropertyLanding() {
  const { t, lang, href, eurNote, offer } = useI18n();
  const [open, setOpen] = useState<Lightbox>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (open === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
      if (open?.kind !== "gallery") return;
      if (event.key === "ArrowRight") {
        setOpen({ kind: "gallery", index: (open.index + 1) % PHOTOS.length });
      }
      if (event.key === "ArrowLeft") {
        setOpen({ kind: "gallery", index: (open.index - 1 + PHOTOS.length) % PHOTOS.length });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const lightboxSrc =
    open?.kind === "gallery"
      ? { src: PHOTOS[open.index].src, alt: t.gallery.alts[open.index] ?? PHOTOS[open.index].alt }
      : open?.kind === "utility"
        ? {
            src: UTILITY_PHOTOS[open.index].src,
            alt: t.condition.utilities[open.index]?.alt ?? UTILITY_PHOTOS[open.index].alt,
          }
        : null;

  function closeMenu() {
    setMenuOpen(false);
  }

  function scrollToTop(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  }

  return (
    <ListingPhoneProvider>
      <div id="teteje" className="overflow-x-clip bg-[#efe8db] text-[#241f18]">
        <header className="sticky top-0 z-40 border-b border-[#d4c9b5] bg-[#efe8db]/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
            <a
              href="#teteje"
              onClick={scrollToTop}
              className="inline-flex min-w-0 items-center gap-2.5 text-sm font-semibold tracking-wide text-[#0f2e1f] hover:opacity-90"
              aria-label={t.toTop}
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
            </a>
            <nav className="hidden min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm lg:flex" aria-label={t.mainNav}>
              {t.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={
                    item.href === "#kapcsolat"
                      ? "rounded-md bg-[#e8b84a] px-3 py-1.5 font-semibold text-[#241f18]"
                      : "hover:underline"
                  }
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-2">
              <LanguageSwitcher />
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-[#d4c9b5] bg-[#f7f1e6] p-2 text-[#241f18] lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="listing-mobile-nav"
                aria-label={menuOpen ? t.closeMenu : t.openMenu}
                onClick={() => setMenuOpen((value) => !value)}
              >
                {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
              </button>
            </div>
          </div>
          {menuOpen ? (
            <nav
              id="listing-mobile-nav"
              className="border-t border-[#d4c9b5] bg-[#efe8db] px-4 py-3 lg:hidden"
              aria-label={t.mobileNav}
            >
              <ul className="flex flex-col gap-1">
                {t.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className={
                        item.href === "#kapcsolat"
                          ? "mt-1 block rounded-md bg-[#e8b84a] px-3 py-2.5 text-sm font-semibold text-[#241f18]"
                          : "block rounded-md px-3 py-2.5 text-sm hover:bg-[#f7f1e6]"
                      }
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ListingMobileContact onNavigate={closeMenu} />
            </nav>
          ) : null}
        </header>

        <section className="relative min-h-[78vh] overflow-hidden bg-[#0f2e1f] text-white">
          <img
            src={HERO_IMAGE.src}
            alt={t.gallery.alts[1] ?? HERO_IMAGE.alt}
            className="absolute inset-0 h-full w-full scale-105 object-cover object-[48%_42%]"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(15, 46, 31, 0.58)" }} aria-hidden />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10, 33, 22, 0.92) 0%, rgba(15, 46, 31, 0.55) 45%, rgba(15, 46, 31, 0.35) 100%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 py-12 md:min-h-[75vh] md:px-6 md:py-16 lg:min-h-[78vh]">
            <div className="max-w-3xl rounded-lg bg-[#0f2e1f]/88 p-5 shadow-[0_8px_40px_rgba(15,46,31,0.45)] md:p-7">
              <p className="inline-flex rounded-md border border-[#e8b84a]/70 bg-[#1a4530]/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#e8b84a] sm:text-sm">
                {t.hero.badge}
              </p>
              <h1 className="mt-4 text-3xl font-medium leading-tight text-[#f7f1e6] md:text-4xl lg:text-5xl">
                {t.hero.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#f7f1e6]/95 sm:text-lg">{t.hero.lead}</p>
              <OfferCountdown tone="dark" />
              <p className="mt-3 text-sm leading-relaxed text-[#f7f1e6]/85">
                {t.hero.place}{" "}
                <strong className="font-semibold text-[#e8b84a]">{t.hero.immediateLabel}: {t.hero.immediatePrice}</strong>
                {offer.deferred ? (
                  <>
                    .{" "}
                    <strong className="font-semibold text-[#e8b84a]">
                      {t.hero.specialLabel}: {t.hero.specialPrice}
                    </strong>
                    .
                  </>
                ) : (
                  "."
                )}
              </p>
              {eurNote ? <p className="mt-2 text-xs leading-relaxed text-[#f7f1e6]/75">{eurNote}</p> : null}
              <a
                href="#kapcsolat"
                onClick={() => trackListingCta("hero_viewing")}
                className="mt-6 inline-flex rounded-md bg-[#e8b84a] px-5 py-3 text-center text-sm font-semibold text-[#241f18]"
              >
                {t.hero.cta}
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 md:px-6 md:py-16 lg:py-20" id="elhelyezkedes">
          <h2 className="text-3xl font-medium">{t.place.title}</h2>
          <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[#6b6154]">{t.place.kicker}</p>
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-[#5a5146] sm:text-base">
            <p>{t.place.p1}</p>
            <p>{t.place.p2}</p>
            <p>{t.place.p3}</p>
            <p>{t.place.p4}</p>
          </div>
          <h3 className="mt-10 text-2xl font-medium">{t.lifestyles.title}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {t.lifestyles.cards.map((card) => (
              <article key={card.title} className="rounded-lg border border-[#d4c9b5] border-t-4 border-t-[#e8b84a] bg-[#efe8db] p-5">
                <h3 className="text-lg font-medium">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{card.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-medium">{t.place.localTitle}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">{t.place.localLead}</p>
            <ListingTopoMap mode="local" caption={t.place.localCaption} credit={t.place.mapCredit} ariaLabel={t.place.localAria} />
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-medium">{t.place.regionalTitle}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">{t.place.regionalLead}</p>
            <ListingTopoMap mode="regional" caption={t.place.regionalCaption} credit={t.place.mapCredit} ariaLabel={t.place.regionalAria} />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
                <h3 className="text-lg font-medium">{t.place.forestTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{t.place.forestBody}</p>
              </article>
              <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
                <h3 className="text-lg font-medium">{t.place.climateTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{t.place.climateBody}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-14 md:py-16 lg:py-20" id="tilalom">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-medium">{t.facts.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">{t.facts.lead}</p>

            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              <li className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5">
                <MapPin className="h-5 w-5 text-[#e8b84a]" aria-hidden />
                <h3 className="mt-3 text-lg font-medium">{t.facts.zoneTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{t.facts.zoneBody}</p>
              </li>
              <li className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5">
                <Car className="h-5 w-5 text-[#e8b84a]" aria-hidden />
                <h3 className="mt-3 text-lg font-medium">{t.facts.parkTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{t.facts.parkBody}</p>
              </li>
              <li className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5">
                <FileText className="h-5 w-5 text-[#e8b84a]" aria-hidden />
                <h3 className="mt-3 text-lg font-medium">{t.facts.legalTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{t.facts.legalBody}</p>
                <a
                  href="#tilalom-terkepek"
                  className="mt-3 inline-flex text-sm font-semibold text-[#0f2e1f] underline-offset-2 hover:underline"
                >
                  {t.facts.legalLink}
                </a>
              </li>
              <li className="rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5">
                <Droplets className="h-5 w-5 text-[#e8b84a]" aria-hidden />
                <h3 className="mt-3 text-lg font-medium">{t.facts.utilTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{t.facts.utilBody}</p>
              </li>
            </ul>

            <div className="mt-8 rounded-lg border border-[#d4c9b5] bg-[#efe8db] p-5">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#e8b84a]" aria-hidden />
                <h3 className="text-lg font-medium">{t.commute.title}</h3>
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {t.commute.rows.map((row) => (
                  <li
                    key={row.label}
                    className="flex flex-col rounded-md border border-[#d4c9b5] bg-[#f7f1e6] px-3 py-3 text-sm"
                  >
                    <span className="text-xs uppercase tracking-wide text-[#6b6154]">{row.label}</span>
                    <span className="mt-1 font-semibold text-[#241f18]">{row.value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-[#5a5146] sm:text-base">
                <p>{t.commute.p1}</p>
                <p>{t.commute.p2}</p>
                <p>{t.commute.p3}</p>
                <p>{t.commute.p4}</p>
              </div>
            </div>

            <article className="mt-8 rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#0f2e1f] bg-[#efe8db] p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Trees className="h-5 w-5 text-[#e8b84a]" aria-hidden />
                <h3 className="text-xl font-medium">{t.quiet.title}</h3>
              </div>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#5a5146] sm:text-base">
                <p>{t.quiet.p1}</p>
                <p>{t.quiet.p2}</p>
                <p>{t.quiet.p3}</p>
              </div>
            </article>

            <div id="tilalom-terkepek" className="scroll-mt-28 mt-12">
              <h3 className="text-2xl font-medium">{t.maps.title}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">{t.maps.lead}</p>
              <ul className="mt-6 flex flex-wrap gap-3 text-sm" aria-label={t.maps.legend}>
                <li className="inline-flex items-center gap-2 rounded-md border border-[#d4c9b5] bg-[#efe8db] px-3 py-2">
                  <span className="h-3.5 w-3.5 rounded-sm bg-[#3b6ea5]" aria-hidden />
                  <span>{t.maps.blue}</span>
                </li>
                <li className="inline-flex items-center gap-2 rounded-md border border-[#d4c9b5] bg-[#efe8db] px-3 py-2">
                  <span className="h-3.5 w-3.5 rounded-sm bg-[#e6c84a]" aria-hidden />
                  <span>{t.maps.yellow}</span>
                </li>
              </ul>
              <MapFrame>
                <figure>
                  <img
                    src="/hirdetes/tilalom-reszlet.jpg"
                    alt={t.maps.alt1}
                    className="mx-auto max-h-[450px] w-full bg-white object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="border-t border-[#d4c9b5] px-4 py-3 text-sm leading-relaxed text-[#5a5146]">
                    {t.maps.cap1}
                  </figcaption>
                </figure>
              </MapFrame>
              <MapFrame>
                <figure>
                  <img
                    src="/hirdetes/tilalom.jpg"
                    alt={t.maps.alt2}
                    className="mx-auto max-h-[450px] w-full bg-white object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="border-t border-[#d4c9b5] px-4 py-3 text-sm leading-relaxed text-[#5a5146]">
                    {t.maps.cap2}
                  </figcaption>
                </figure>
              </MapFrame>
              <MapFrame>
                <figure>
                  <img
                    src="/hirdetes/szabalyozas.jpg"
                    alt={t.maps.alt3}
                    className="mx-auto max-h-[450px] w-full bg-white object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="border-t border-[#d4c9b5] px-4 py-3 text-sm leading-relaxed text-[#5a5146]">
                    {t.maps.cap3}
                  </figcaption>
                </figure>
              </MapFrame>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#5a5146]">
                {t.maps.note}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 md:px-6 md:py-16" id="kozmuvek-epulet">
          <h2 className="text-3xl font-medium">{t.condition.title}</h2>
          <div className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-[#5a5146] sm:text-base">
            <p>{t.condition.p1}</p>
            <p>{t.condition.p2}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <House className="h-5 w-5 text-[#e8b84a]" aria-hidden />
              <h3 className="mt-3 text-lg font-medium">{t.condition.buildingTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{t.condition.buildingBody}</p>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <Thermometer className="h-5 w-5 text-[#e8b84a]" aria-hidden />
              <h3 className="mt-3 text-lg font-medium">{t.condition.heatTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{t.condition.heatBody}</p>
            </article>
            <article className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
              <Ruler className="h-5 w-5 text-[#e8b84a]" aria-hidden />
              <h3 className="mt-3 text-lg font-medium">{t.condition.photosTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">
                {t.condition.photosLead} {t.condition.photoState}
              </p>
            </article>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {UTILITY_PHOTOS.map((photo, index) => {
              const copyPhoto = t.condition.utilities[index];
              return (
              <li key={photo.src} className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
                <button
                  type="button"
                  onClick={() => setOpen({ kind: "utility", index })}
                  className="flex w-full items-start gap-4 text-left"
                >
                  <img
                    src={photo.src}
                    alt={copyPhoto?.alt ?? photo.alt}
                    className="h-16 w-16 shrink-0 rounded-md border border-[#d4c9b5] bg-[#efe8db] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-[#6b6154]">{copyPhoto?.title ?? photo.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#5a5146]">{copyPhoto?.caption ?? photo.caption}</span>
                    <span className="mt-2 block text-xs font-medium text-[#d4a017]">{t.condition.zoom}</span>
                  </span>
                </button>
              </li>
              );
            })}
          </ul>
        </section>

        <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-14 md:py-16" id="seta">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-medium">{t.tour.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5a5146] sm:text-base">{t.tour.lead}</p>
            <div className="mt-6 overflow-hidden rounded-lg border border-[#d4c9b5] bg-[#0f2e1f]">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  title={t.tour.iframe}
                  src={TOUR_URL}
                  className="absolute inset-0 h-full w-full"
                  allow="fullscreen; xr-spatial-tracking"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-mt-24 bg-[#0f2e1f] py-14 text-white md:py-16" id="galeria">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-medium text-[#f7f1e6]">{t.gallery.title}</h2>
            <p className="mt-3 max-w-2xl text-sm text-[#f7f1e6]/90">{t.gallery.lead}</p>
            <ul className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4">
              {PHOTOS.map((photo, index) => (
                <li key={photo.src} className="mb-3 break-inside-avoid">
                  <button
                    type="button"
                    onClick={() => setOpen({ kind: "gallery", index })}
                    className="block w-full overflow-hidden rounded-md"
                  >
                    <img
                      src={photo.src}
                      alt={t.gallery.alts[index] ?? photo.alt}
                      className={`w-full object-cover ${photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-14 md:py-16" id="azaras">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-medium">{t.pricing.heading}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5a5146] sm:text-base">{t.pricing.intro}</p>
            {eurNote ? <p className="mt-2 max-w-3xl text-xs leading-relaxed text-[#6b6154]">{eurNote}</p> : null}
            <OfferCountdown tone="light" />

            <dl className={`mt-8 grid max-w-3xl gap-4 ${offer.deferred ? "sm:grid-cols-2" : ""}`}>
              <div className="rounded-lg border border-[#d4c9b5] bg-[#efe8db] p-5">
                <dt className="text-sm text-[#5a5146]">{t.pricing.standardLabel}</dt>
                <dd className="mt-1 text-3xl font-medium text-[#d4a017]">{t.pricing.standardPrice}</dd>
                <dd className="mt-2 text-sm leading-relaxed text-[#5a5146]">{t.pricing.standardNote}</dd>
              </div>
              {offer.deferred ? (
                <div className="rounded-lg border border-[#d4c9b5] bg-[#efe8db] p-5">
                  <dt className="text-sm text-[#5a5146]">{t.pricing.specialLabel}</dt>
                  <dd className="mt-1 text-3xl font-medium text-[#d4a017]">{t.pricing.specialPrice}</dd>
                  <dd className="mt-2 text-sm leading-relaxed text-[#5a5146]">{t.pricing.specialNote}</dd>
                </div>
              ) : null}
            </dl>

            {offer.deferred ? (
              <aside className="mt-6 max-w-3xl rounded-lg border border-[#e8b84a]/50 bg-[#efe8db] p-5">
                <p className="text-sm font-medium text-[#241f18]">{t.pricing.scheduleTitle}</p>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[#5a5146]">
                  {t.pricing.schedule.map((term) => (
                    <li key={term}>{term}</li>
                  ))}
                </ol>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{t.pricing.fixedNote}</p>
              </aside>
            ) : null}

            {offer.deferred ? (
              <div className="mt-8 max-w-3xl rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5">
                <p className="text-base font-medium text-[#241f18]">{t.pricing.cardTitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#5a5146]">{t.pricing.cardBody}</p>
              </div>
            ) : null}

            <div className={`mt-8 grid gap-4 ${offer.deferred ? "md:grid-cols-2" : ""}`}>
              {offer.deferred ? (
                <article className="flex flex-col rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#e8b84a] bg-[#efe8db] p-5 md:p-6">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#6b6154]">{t.variants.a.label}</p>
                  <p className="mt-2 text-3xl font-medium text-[#d4a017]">{t.variants.a.short}</p>
                  <p className="mt-1 text-xs text-[#6b6154]">{t.variants.a.note}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{t.variants.a.summary}</p>
                  <Link
                    href={href("/erdeklodes/a")}
                    onClick={() => trackListingCta("variant_a")}
                    className="mt-6 inline-flex justify-center rounded-md bg-[#e8b84a] px-5 py-3 text-center text-sm font-semibold text-[#241f18]"
                  >
                    {t.variants.a.cta}
                  </Link>
                </article>
              ) : null}
              <article className="flex flex-col rounded-lg border border-[#d4c9b5] border-l-4 border-l-[#d4a017] bg-[#efe8db] p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-[#6b6154]">{t.variants.b.label}</p>
                <p className="mt-2 text-3xl font-medium text-[#d4a017]">{t.variants.b.short}</p>
                <p className="mt-1 text-xs text-[#6b6154]">{t.variants.b.note}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{t.variants.b.summary}</p>
                <Link
                  href={href("/erdeklodes/b")}
                  onClick={() => trackListingCta("variant_b")}
                  className="mt-6 inline-flex justify-center rounded-md bg-[#d4a017] px-5 py-3 text-center text-sm font-semibold text-[#241f18]"
                >
                  {t.variants.b.cta}
                </Link>
              </article>
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#5a5146]">{t.pricing.market}</p>
            <p className="mt-2 text-sm text-[#5a5146]">{t.pricing.fixtures}</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16" id="folyamat">
          <h2 className="text-3xl font-medium">{t.process.title}</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d4a017]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146]">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="scroll-mt-24 border-t border-[#d4c9b5] bg-[#f7f1e6] py-14 md:py-16" id="kinek">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-medium">{t.audience.title}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-lg border border-[#d4c9b5] border-t-4 border-t-[#e8b84a] bg-[#efe8db] p-6">
                <h3 className="text-xl font-medium">{t.audience.yesTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146] sm:text-base">{t.audience.yes}</p>
              </article>
              <article className="rounded-lg border border-[#d4c9b5] border-t-4 border-t-[#6b6154] bg-[#efe8db] p-6">
                <h3 className="text-xl font-medium">{t.audience.noTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a5146] sm:text-base">{t.audience.no}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16" id="gyik">
          <h2 className="text-3xl font-medium">{t.faq.title}</h2>
          <div className="mt-8 space-y-3">
            {t.faq.items.map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </section>

        <section className="scroll-mt-24 bg-[#0f2e1f] py-14 text-white md:py-16" id="kapcsolat">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 md:gap-10 md:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-medium text-[#f7f1e6]">{t.contact.title}</h2>
              <p className="mt-3 text-lg font-medium text-[#e8b84a]">{t.contact.kicker}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#f7f1e6]/90 sm:text-base">{t.contact.lead}</p>
              <ListingSellerCard tone="dark" />
            </div>
            <div className="rounded-lg border border-[#d4c9b5] bg-[#f7f1e6] p-5 text-[#241f18] sm:p-6">
              <EnquiryForm key={lang} />
            </div>
          </div>
        </section>

        <footer className="border-t border-[#d4c9b5] px-4 py-8">
          <div className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-[#6b6154]">
            <p>{t.footer}</p>
          </div>
        </footer>

        {lightboxSrc ? (
          <div
            className="fixed inset-0 z-[70] flex flex-col bg-[#0f2e1f]"
            role="dialog"
            aria-modal="true"
            aria-label={t.lightbox.label}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#e8b84a]/35 px-3 py-3 md:px-5">
              <p className="truncate text-sm font-medium text-[#f7f1e6]/90">
                {open?.kind === "gallery" ? `${(open.index ?? 0) + 1} / ${PHOTOS.length}` : lightboxSrc.alt}
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="inline-flex items-center gap-2 rounded-md border-2 border-[#e8b84a] bg-[#e8b84a] px-3 py-2 text-sm font-semibold text-[#241f18] shadow-[0_2px_12px_rgba(0,0,0,0.35)] hover:bg-[#f0c45c]"
                aria-label={t.lightbox.closeAria}
              >
                <X className="h-5 w-5" aria-hidden />
                {t.lightbox.close}
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center gap-1 px-1 py-3 sm:gap-2 sm:px-3 md:px-4">
              {open?.kind === "gallery" ? (
                <button
                  type="button"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#e8b84a] bg-[#1a4530] text-[#e8b84a] shadow-[0_2px_14px_rgba(0,0,0,0.4)] hover:bg-[#243f30] md:h-12 md:w-12"
                  onClick={() =>
                    setOpen({ kind: "gallery", index: (open.index - 1 + PHOTOS.length) % PHOTOS.length })
                  }
                  aria-label={t.lightbox.prev}
                >
                  <ChevronLeft className="h-7 w-7" aria-hidden />
                </button>
              ) : (
                <span className="w-11 shrink-0 md:w-12" aria-hidden />
              )}
              <img
                src={lightboxSrc.src}
                alt={lightboxSrc.alt}
                className="max-h-[calc(100dvh-7.5rem)] max-w-[min(100%,calc(100vw-6.5rem))] object-contain md:max-w-[min(100%,calc(100vw-8rem))]"
              />
              {open?.kind === "gallery" ? (
                <button
                  type="button"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#e8b84a] bg-[#1a4530] text-[#e8b84a] shadow-[0_2px_14px_rgba(0,0,0,0.4)] hover:bg-[#243f30] md:h-12 md:w-12"
                  onClick={() => setOpen({ kind: "gallery", index: (open.index + 1) % PHOTOS.length })}
                  aria-label={t.lightbox.next}
                >
                  <ChevronRight className="h-7 w-7" aria-hidden />
                </button>
              ) : (
                <span className="w-11 shrink-0 md:w-12" aria-hidden />
              )}
            </div>
          </div>
        ) : null}
      </div>
    </ListingPhoneProvider>
  );
}
