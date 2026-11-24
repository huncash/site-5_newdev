export type EurQuote = {
  hufPerEur: number;
  date: string;
};

function formatEur(amountHuf: number, lang: "en" | "de", hufPerEur: number): string {
  const eur = amountHuf / hufPerEur;
  return new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(eur);
}

function grouped(value: string, separator: string): number {
  return Number(value.split(separator).join(""));
}

/** Appends an indicative euro amount after each HUF figure. Hungarian copy is left unchanged. */
export function annotateMoney(text: string, lang: "en" | "de", hufPerEur: number): string {
  const beside = (huf: number) => ` (${formatEur(huf, lang, hufPerEur)})`;
  if (!Number.isFinite(hufPerEur) || hufPerEur <= 0) return text;

  if (lang === "de") {
    return text
      .replace(/(\d{1,3}(?:\.\d{3})+)[–-](\d{1,3}(?:\.\d{3})+) HUF/g, (match, left: string, right: string) => {
        return `${match} (${formatEur(grouped(left, "."), lang, hufPerEur)}–${formatEur(grouped(right, "."), lang, hufPerEur)})`;
      })
      .replace(/(\d+,\d+) Mio\. HUF/g, (match, raw: string) => {
        const huf = Math.round(Number(raw.replace(",", ".")) * 1_000_000);
        return `${match}${beside(huf)}`;
      })
      .replace(/(?<![–-])(\d{1,3}(?:\.\d{3})+) HUF(?!\s*\()/g, (match, raw: string) => `${match}${beside(grouped(raw, "."))}`);
  }

  const amount = String.raw`\d{1,3}(?:,\d{3})+`;
  return text
    .replace(new RegExp(`HUF (${amount})[–-](${amount})`, "g"), (match, left: string, right: string) => {
      return `${match} (${formatEur(grouped(left, ","), lang, hufPerEur)}–${formatEur(grouped(right, ","), lang, hufPerEur)})`;
    })
    .replace(/(\d+(?:\.\d+)?) million HUF/g, (match, raw: string) => {
      const huf = Math.round(Number(raw) * 1_000_000);
      return `${match}${beside(huf)}`;
    })
    .replace(new RegExp(`HUF (${amount})(?![–-])`, "g"), (match, raw: string) => `${match}${beside(grouped(raw, ","))}`);
}

export function annotateCopy<T>(value: T, lang: "en" | "de", hufPerEur: number): T {
  if (typeof value === "string") return annotateMoney(value, lang, hufPerEur) as T;
  if (Array.isArray(value)) return value.map((item) => annotateCopy(item, lang, hufPerEur)) as T;
  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      next[key] = annotateCopy(item, lang, hufPerEur);
    }
    return next as T;
  }
  return value;
}

export function eurRateNote(lang: "en" | "de", quote: EurQuote): string {
  const formatted = new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(quote.hufPerEur);
  const date = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${quote.date}T12:00:00`));
  if (lang === "de") {
    return `Eurobeträge zum täglichen MNB-Mittelkurs vom ${date} (1 EUR = ${formatted} HUF), unverbindlich.`;
  }
  return `Euro amounts use the daily MNB mid-rate of ${date} (1 EUR = ${formatted} HUF) and are indicative.`;
}
