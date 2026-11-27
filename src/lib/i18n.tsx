"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { copy, type Copy, type Lang } from "@/lib/copy";
import { annotateCopy, eurRateNote, type EurQuote } from "@/lib/money";
import { applyOffer, parsePreviewDate, resolvePricing, type ResolvedOffer } from "@/lib/pricingConfig";

const STORAGE_KEY = "listing-lang";

type I18nValue = {
  lang: Lang;
  t: Copy;
  offer: ResolvedOffer;
  eurNote: string | null;
  setLang: (lang: Lang) => void;
  href: (path: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

function isLang(value: string | null): value is Lang {
  return value === "hu" || value === "en" || value === "de";
}

function readLang(): Lang {
  if (typeof window === "undefined") return "hu";
  const query = new URLSearchParams(window.location.search).get("lang");
  if (isLang(query)) return query;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* private mode */
  }
  return "hu";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hu");
  const [eur, setEur] = useState<EurQuote | null>(null);
  const [clock, setClock] = useState(() => new Date());
  const [previewKey, setPreviewKey] = useState<string | null>(null);

  useEffect(() => {
    const next = readLang();
    setLangState(next);
    const url = new URL(window.location.href);
    const rawPreview = url.searchParams.get("previewDate");
    setPreviewKey(parsePreviewDate(rawPreview) ? rawPreview : null);
    if (url.searchParams.get("lang") !== next) {
      url.searchParams.set("lang", next);
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setClock(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  useEffect(() => {
    if (lang === "hu") return;
    let cancelled = false;
    fetch("/api/arfolyam")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: EurQuote | null) => {
        if (cancelled || !data || typeof data.hufPerEur !== "number" || typeof data.date !== "string") return;
        setEur({ hufPerEur: data.hufPerEur, date: data.date });
      })
      .catch(() => {
        /* HUF amounts stay on their own when the rate is unavailable */
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const offer = useMemo(
    () => resolvePricing(parsePreviewDate(previewKey) ?? clock),
    [previewKey, clock],
  );

  const t = useMemo(() => {
    const base = applyOffer(copy[lang], lang, offer);
    if (lang === "hu" || !eur) return base;
    return annotateCopy(base, lang, eur.hufPerEur);
  }, [lang, eur, offer]);

  const eurNote = lang === "hu" || !eur ? null : eurRateNote(lang, eur);

  useEffect(() => {
    const apply = () => {
      document.documentElement.lang = lang;
      const path = window.location.pathname;
      const interest = path.match(/\/erdeklodes\/([ab])/i);
      const title = interest
        ? `${t.interest.kicker} — ${t.variants[interest[1].toLowerCase() as "a" | "b"].label}`
        : t.metaTitle;
      if (document.title !== title) document.title = title;
      const description = document.querySelector('meta[name="description"]');
      if (description && description.getAttribute("content") !== t.metaDescription) {
        description.setAttribute("content", t.metaDescription);
      }
    };
    apply();
    const titleEl = document.querySelector("title");
    const observer = new MutationObserver(apply);
    if (titleEl) observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [lang, t]);

  const href = useCallback((path: string) => {
    const hashAt = path.indexOf("#");
    const hash = hashAt >= 0 ? path.slice(hashAt) : "";
    const base = hashAt >= 0 ? path.slice(0, hashAt) : path;
    const splitAt = base.indexOf("?");
    const pathname = splitAt >= 0 ? base.slice(0, splitAt) : base;
    const params = new URLSearchParams(splitAt >= 0 ? base.slice(splitAt + 1) : "");
    params.set("lang", lang);
    if (previewKey) params.set("previewDate", previewKey);
    return `${pathname || "/"}${params.toString() ? `?${params.toString()}` : ""}${hash}`;
  }, [lang, previewKey]);

  const value = useMemo<I18nValue>(
    () => ({ lang, t, offer, eurNote, setLang, href }),
    [lang, t, offer, eurNote, setLang, href],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("LanguageProvider is missing");
  return ctx;
}

const ORDER: Lang[] = ["en", "hu", "de"];

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      className="inline-flex shrink-0 items-center rounded-md border border-[#d4c9b5] bg-[#fffdf8] p-0.5 text-[11px] font-semibold tracking-wide sm:text-xs"
      role="group"
      aria-label={t.langLabel}
    >
      {ORDER.map((code, index) => (
        <span key={code} className="inline-flex items-center">
          {index > 0 ? (
            <span className="px-0.5 text-[#c4b8a4]" aria-hidden>
              /
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={
              lang === code
                ? "rounded bg-[#e8b84a] px-1.5 py-1 text-[#241f18]"
                : "rounded px-1.5 py-1 text-[#6b6154] hover:text-[#241f18]"
            }
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
