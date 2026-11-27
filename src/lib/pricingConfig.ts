import type { Copy, Lang } from "@/lib/copy";

/**
 * Single source of truth for the public price.
 * Civil dates are Europe/Budapest. A window never renders after its last day,
 * and the January 4–8 2027 instalment disappears on 1 January 2027.
 *
 * ?previewDate=YYYY-MM-DD overrides the clock for testing.
 */

export const PLOT_SQM = 1046;
export const BUILDABLE_SQM = 313;

const NOVEMBER_LAST = "2026-11-30";
const DECEMBER_LAST = "2026-12-31";

export type Phase = "november" | "december" | "season";

export type ResolvedOffer = {
  phase: Phase;
  asOf: string;
  countdownDeadline: string | null;
  immediateHuf: number;
  immediateHandoverYear: 2026 | 2027;
  deferred: null | {
    totalHuf: number;
    depositHuf: number;
    balanceHuf: number;
    discountHuf: number;
    signBy: "2026-11-30" | "2026-12-31";
  };
};

export function budapestCivilDate(input: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Budapest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(input);
}

/** Noon UTC on a real civil day, so the Budapest date cannot slip. */
export function parsePreviewDate(value: string | null | undefined): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const probe = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  if (budapestCivilDate(probe) !== value) return null;
  return probe;
}

export function resolvePricing(input: Date = new Date()): ResolvedOffer {
  const asOf = budapestCivilDate(input);
  if (asOf <= NOVEMBER_LAST) {
    return {
      phase: "november",
      asOf,
      countdownDeadline: "2026-12-01T00:00:00+01:00",
      immediateHuf: 27_200_000,
      immediateHandoverYear: 2026,
      deferred: {
        totalHuf: 26_600_000,
        depositHuf: 2_660_000,
        balanceHuf: 23_940_000,
        discountHuf: 600_000,
        signBy: "2026-11-30",
      },
    };
  }
  if (asOf <= DECEMBER_LAST) {
    return {
      phase: "december",
      asOf,
      countdownDeadline: "2027-01-01T00:00:00+01:00",
      immediateHuf: 27_700_000,
      immediateHandoverYear: 2026,
      deferred: {
        totalHuf: 27_100_000,
        depositHuf: 2_710_000,
        balanceHuf: 24_390_000,
        discountHuf: 600_000,
        signBy: "2026-12-31",
      },
    };
  }
  return {
    phase: "season",
    asOf,
    countdownDeadline: null,
    immediateHuf: 28_500_000,
    immediateHandoverYear: 2027,
    deferred: null,
  };
}

function grouped(huf: number, separator: string): string {
  return Math.round(huf)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function formatFull(lang: Lang, huf: number): string {
  if (lang === "en") return `HUF ${grouped(huf, ",")}`;
  if (lang === "de") return `${grouped(huf, ".")} HUF`;
  return `${grouped(huf, ".")} Ft`;
}

export function formatShort(lang: Lang, huf: number): string {
  const millions = huf / 1_000_000;
  const digits = Number.isInteger(millions) ? 0 : 1;
  const raw = millions.toFixed(digits);
  if (lang === "en") return `${raw} million HUF`;
  const local = raw.replace(".", ",");
  if (lang === "de") return `${local} Mio. HUF`;
  return `${local} M Ft`;
}

function untilPhrase(lang: Lang, signBy: "2026-11-30" | "2026-12-31"): string {
  if (signBy === "2026-11-30") {
    if (lang === "hu") return "2026. november 30-ig";
    if (lang === "de") return "bis 30. November 2026";
    return "until 30 November 2026";
  }
  if (lang === "hu") return "2026. december 31-ig";
  if (lang === "de") return "bis 31. Dezember 2026";
  return "until 31 December 2026";
}

function balancePhrase(lang: Lang): string {
  if (lang === "hu") return "2027. január 4–8. között";
  if (lang === "de") return "zwischen dem 4. und 8. Januar 2027";
  return "between 4 and 8 January 2027";
}

function winterNote(lang: Lang): string {
  if (lang === "hu") {
    return "A téli, szezonon kívüli ár csak 2026-os szerződéskötésre érvényes. 2027. januártól azonnali birtokbaadás jár, magasabb szezonáron.";
  }
  if (lang === "de") {
    return "Dieser winterliche Nebensaisonpreis gilt für einen Vertrag im Jahr 2026. Ab Januar 2027 gilt die sofortige Übergabe zu einem höheren Saisonpreis.";
  }
  return "This winter off-season price is valid for a contract signed in 2026. From January 2027, handover is immediate, at a higher seasonal price.";
}

function metaDescription(lang: Lang, offer: ResolvedOffer): string {
  const immediate = formatShort(lang, offer.immediateHuf);
  const house =
    lang === "hu"
      ? "Kismaros-Börzsönyliget, belterületi Lke-4 lakótelek, 1046 m². A telek tetején azonnal lakható, közműves faház. Vezetékes ivóvíz."
      : lang === "de"
        ? "Kismaros-Börzsönyliget, Wohnbaugrundstück im Innenbereich, Lke-4, 1046 m². Oben auf dem Grundstück ein sofort bewohnbares Haus mit Leitungswasser."
        : "Kismaros-Börzsönyliget, in-settlement residential plot, Lke-4, 1046 m². A livable, fully serviced wooden house at the top of the plot. Mains drinking water.";
  if (!offer.deferred) {
    if (lang === "hu") return `${house} Azonnali ár ${immediate}.`;
    if (lang === "de") return `${house} Sofortpreis ${immediate}.`;
    return `${house} Immediate price ${immediate}.`;
  }
  const deferred = formatShort(lang, offer.deferred.totalHuf);
  const until = untilPhrase(lang, offer.deferred.signBy);
  if (lang === "hu") return `${house} Azonnali ár ${immediate}; ${until} ${deferred}.`;
  if (lang === "de") return `${house} Sofortpreis ${immediate}; ${until} ${deferred}.`;
  return `${house} Immediate price ${immediate}; ${deferred} ${until}.`;
}

export function applyOffer(base: Copy, lang: Lang, offer: ResolvedOffer): Copy {
  const next = structuredClone(base);
  const immediate = formatShort(lang, offer.immediateHuf);
  const immediateFull = formatFull(lang, offer.immediateHuf);
  const year = offer.immediateHandoverYear;
  const deferred = offer.deferred;

  next.metaDescription = metaDescription(lang, offer);

  next.hero.immediatePrice = immediate;
  next.pricing.standardPrice = immediate;
  next.pricing.standardFull = immediateFull;
  next.variants.b.short = immediate;
  next.variants.b.price = immediateFull;
  next.variants.b.title =
    lang === "hu"
      ? `Azonnali ár — ${immediateFull}`
      : lang === "de"
        ? `Sofortpreis — ${immediateFull}`
        : `Immediate price — ${immediateFull}`;
  next.variants.b.note =
    lang === "hu"
      ? `${year}-os birtokbaadás, a jelenlegi berendezéssel együtt`
      : lang === "de"
        ? `Übergabe ${year}, einschließlich der vorhandenen Einrichtung`
        : `Handover in ${year}, including the current furnishings`;
  next.variants.b.possession =
    lang === "hu"
      ? `Azonnali, ${year}-os birtokbaadás`
      : lang === "de"
        ? `Sofortige Übergabe ${year}`
        : `Immediate handover in ${year}`;
  next.variants.b.summary =
    lang === "hu"
      ? `A fix azonnali ár ${immediateFull}, a jelenlegi szerény berendezéssel együtt. A ház lakható, a birtokbaadás ${year}-ban kérhető.`
      : lang === "de"
        ? `Der feste Sofortpreis beträgt ${immediateFull}, einschließlich der vorhandenen bescheidenen Einrichtung. Das Haus ist bewohnbar, die Übergabe kann ${year} erfolgen.`
        : `The fixed immediate price is ${immediateFull}, including the current modest furnishings. The house is livable, and possession can be taken in ${year}.`;
  next.variants.b.email =
    lang === "hu"
      ? `Azonnali ár (${immediateFull}, ${year}-os birtokbaadás)`
      : lang === "de"
        ? `Sofortpreis (${immediateFull}, Übergabe ${year})`
        : `Immediate price (${immediateFull}, handover in ${year})`;
  next.pricing.standardLabel =
    lang === "hu" ? `Azonnali ár, ${year}` : lang === "de" ? `Sofortpreis, ${year}` : `Immediate price, ${year}`;

  if (!deferred) {
    next.hero.badge =
      lang === "hu" ? "Azonnali birtokbaadás" : lang === "de" ? "Sofortige Übergabe" : "Immediate handover";
    next.hero.specialLabel = "";
    next.hero.specialPrice = "";
    next.countdown.until = "";
    next.countdown.expired = "";
    next.pricing.intro =
      lang === "hu"
        ? `Az ár fix, a jelenlegi szerény berendezéssel együtt értendő, közvetítői jutalék nincs. Azonnali birtokbaadás: ${immediate}.`
        : lang === "de"
          ? `Der Preis ist fest, versteht sich einschließlich der vorhandenen bescheidenen Einrichtung, und es gibt keine Maklerprovision. Sofortige Übergabe: ${immediate}.`
          : `The price is fixed, includes the current modest furnishings, and there is no agency fee. Immediate handover: ${immediate}.`;
    next.pricing.specialLabel = "";
    next.pricing.specialPrice = "";
    next.pricing.specialFull = "";
    next.pricing.specialNote = "";
    next.pricing.scheduleTitle = "";
    next.pricing.schedule = [];
    next.pricing.cardTitle = "";
    next.pricing.cardBody = "";
    next.pricing.market =
      lang === "hu"
        ? `A ház tehermentes és lakható. A ${immediate} azonnali, ${year}-os átadás.`
        : lang === "de"
          ? `Das Haus ist lastenfrei und bewohnbar. ${immediate} bedeuten die sofortige Übergabe ${year}.`
          : `The house is unencumbered and livable. ${immediate} is immediate handover in ${year}.`;
    next.variants.a = {
      ...next.variants.a,
      label: lang === "hu" ? "Lezárt ütemezés" : lang === "de" ? "Geschlossenes Fenster" : "Closed schedule",
      title: next.variants.b.title,
      price: immediateFull,
      short: immediate,
      note: next.variants.b.note,
      deposit: next.variants.b.deposit,
      possession: next.variants.b.possession,
      summary:
        lang === "hu"
          ? `Az aktuális ár ${immediate}, azonnali birtokbaadással.`
          : lang === "de"
            ? `Der aktuelle Preis ist ${immediate}, mit sofortiger Übergabe.`
            : `The current price is ${immediate}, with immediate handover.`,
      cta: next.variants.b.cta,
      email: next.variants.b.email,
    };
    next.process.steps[1].body =
      lang === "hu"
        ? `Az aktuális ár ${immediateFull}, azonnali birtokbaadással.`
        : lang === "de"
          ? `Der aktuelle Preis ist ${immediateFull}, mit sofortiger Übergabe.`
          : `The current price is ${immediateFull}, with immediate handover.`;
    next.process.steps[2].body =
      lang === "hu"
        ? "Ügyvéd előtt, az aktuális azonnali áron."
        : lang === "de"
          ? "Vor einem Anwalt, zum aktuellen Sofortpreis."
          : "Before a lawyer, at the current immediate price.";
    next.process.steps[3].body =
      lang === "hu"
        ? `A birtokbaadás ${year}-ban, az azonnali áron történik.`
        : lang === "de"
          ? `Die Übergabe erfolgt ${year} zum Sofortpreis.`
          : `Possession is handed over in ${year}, at the immediate price.`;
    next.faq.items[0].a =
      lang === "hu"
        ? "Az ár fix, közvetítői jutalék nincs — közvetlenül tőlem, 1/1 tulajdonostól veszed."
        : lang === "de"
          ? "Der Preis ist fest, eine Maklerprovision gibt es nicht — du kaufst direkt von mir, dem Alleineigentümer."
          : "The price is fixed and there is no agency fee — you buy directly from me, the sole owner.";
    next.faq.items[2].q =
      lang === "hu"
        ? `Hogyan épül fel a ${immediate}?`
        : lang === "de"
          ? `Wie funktioniert der Preis von ${immediate}?`
          : `How does the ${immediate} price work?`;
    next.faq.items[2].a =
      lang === "hu"
        ? `Az aktuális ár ${immediateFull}, azonnali, ${year}-os birtokbaadással. Az ár a jelenlegi berendezéssel együtt értendő.`
        : lang === "de"
          ? `Der aktuelle Preis beträgt ${immediateFull}, mit sofortiger Übergabe ${year}. Der Preis versteht sich einschließlich der vorhandenen Einrichtung.`
          : `The current price is ${immediateFull}, with immediate handover in ${year}. The price includes the current furnishings.`;
    next.faq.items[3].a =
      lang === "hu"
        ? `Igen. A ${immediate} árnál a birtokbaadás ${year}-ban kérhető. A telek tetején álló faház azonnal lakható bázis és felvonulási épület az építkezés idejére. A megépülő új ház saját otthonként vagy hosszú távra kiadható lakóházként hasznosítható.`
        : lang === "de"
          ? `Ja. Bei ${immediate} kann die Übergabe ${year} erfolgen. Das Holzhaus oben ist sofort bewohnbare Basis und Bauunterkunft für die Bauzeit. Das neue Haus ist das dauerhafte Eigenheim oder das langfristig vermietbare Wohnhaus.`
          : `Yes. At ${immediate}, possession can be taken in ${year}. The wooden house at the top is an immediately livable base and site office during construction. The new house is the permanent family residence or the long-term rental house.`;
    next.contact.lead =
      lang === "hu"
        ? "Használd az űrlapot, vagy — adatkezelés elfogadása után — hívd a védett számot. Az aktuális ár azonnali birtokbaadással jár."
        : lang === "de"
          ? "Nutze das Formular oder ruf — nach Zustimmung zum Datenschutz — die geschützte Nummer an. Der aktuelle Preis gilt mit sofortiger Übergabe."
          : "Use the form, or — after you accept the privacy notice — call the protected number. The current price comes with immediate handover.";
    next.interest.both = lang === "hu" ? "Az aktuális ár" : lang === "de" ? "Der aktuelle Preis" : "The current price";
    return next;
  }

  const deferredShort = formatShort(lang, deferred.totalHuf);
  const deferredFull = formatFull(lang, deferred.totalHuf);
  const deposit = formatFull(lang, deferred.depositHuf);
  const balance = formatFull(lang, deferred.balanceHuf);
  const discount = formatFull(lang, deferred.discountHuf);
  const until = untilPhrase(lang, deferred.signBy);
  const balanceWhen = balancePhrase(lang);
  const winter = offer.phase === "december" ? ` ${winterNote(lang)}` : "";

  next.hero.immediatePrice = immediate;
  next.hero.specialPrice = deferredShort;
  next.hero.specialLabel =
    deferred.signBy === "2026-11-30"
      ? lang === "hu"
        ? "November 30-ig"
        : lang === "de"
          ? "Bis 30. November"
          : "Until 30 November"
      : lang === "hu"
        ? "December 31-ig"
        : lang === "de"
          ? "Bis 31. Dezember"
          : "Until 31 December";
  next.hero.badge =
    lang === "hu"
      ? `${next.hero.specialLabel}: −${discount}`
      : lang === "de"
        ? `${next.hero.specialLabel}: −${discount}`
        : `${next.hero.specialLabel}: −${discount}`;

  next.countdown.until =
    lang === "hu"
      ? `A ${discount} kedvezmény ${until} él`
      : lang === "de"
        ? `Der Nachlass von ${discount} gilt ${until}`
        : `The ${discount} reduction is open ${until}`;
  next.countdown.expired = "";

  next.pricing.intro =
    (lang === "hu"
      ? `Az ár fix, a jelenlegi szerény berendezéssel együtt értendő, közvetítői jutalék nincs. Azonnali, ${year}-os birtokbaadás: ${immediate}. Ha ${until} szerződést kötünk, a vételár ${deferredShort} — ${discount} kedvezmény.`
      : lang === "de"
        ? `Der Preis ist fest, versteht sich einschließlich der vorhandenen bescheidenen Einrichtung, und es gibt keine Maklerprovision. Sofortige Übergabe ${year}: ${immediate}. Wenn wir ${until} den Vertrag schließen, beträgt der Preis ${deferredShort} — ein Nachlass von ${discount}.`
        : `The price is fixed, includes the current modest furnishings, and there is no agency fee. Immediate handover in ${year}: ${immediate}. If we sign ${until}, the price is ${deferredShort} — a reduction of ${discount}.`) + winter;

  next.pricing.specialLabel = next.hero.specialLabel;
  next.pricing.specialPrice = deferredShort;
  next.pricing.specialFull = deferredFull;
  next.pricing.specialNote =
    lang === "hu"
      ? `${discount} kedvezmény, ha ${until} szerződünk és a foglalót aláíráskor rendezed.`
      : lang === "de"
        ? `${discount} Nachlass, wenn wir ${until} unterschreiben und du die Anzahlung bei der Unterschrift zahlst.`
        : `${discount} less if we sign ${until} and you pay the deposit on signing.`;
  next.pricing.scheduleTitle =
    lang === "hu" ? `A ${deferredShort} feltétele:` : lang === "de" ? `Bedingungen für ${deferredShort}:` : `Terms of the ${deferredShort} price:`;
  next.pricing.schedule =
    lang === "hu"
      ? [
          `A szerződést ${until} kötjük meg.`,
          `Az első részlet a vételár 10%-a, ${deposit}, szerződéskötéskor fizetendő.`,
          `A második részlet ${balance}, ${balanceWhen} esedékes, a földhivatali benyújtással és a birtokbaadással egyidejűleg.`,
        ]
      : lang === "de"
        ? [
            `Den Vertrag schließen wir ${until}.`,
            `Die erste Rate sind 10 % des Preises, ${deposit}, fällig bei der Unterschrift.`,
            `Die zweite Rate ${balance} ist ${balanceWhen} fällig, zusammen mit der Einreichung beim Grundbuchamt und der Besitzübergabe.`,
          ]
        : [
            `We sign the contract ${until}.`,
            `The first instalment is 10% of the price, ${deposit}, paid on signing.`,
            `The second instalment, ${balance}, is due ${balanceWhen}, together with the Land Registry filing and handover of possession.`,
          ];
  next.pricing.cardTitle = `${next.hero.specialLabel}: ${deferredShort}`;
  next.pricing.cardBody =
    lang === "hu"
      ? `${discount} kevesebb, mint a ${immediate} azonnali ár, ha a foglaló az aláíráskor megérkezik, a maradék pedig ${balanceWhen}.`
      : lang === "de"
        ? `${discount} weniger als der Sofortpreis von ${immediate}, wenn die Anzahlung bei der Unterschrift eingeht und der Rest ${balanceWhen} überwiesen wird.`
        : `${discount} less than the immediate price of ${immediate}, if the deposit arrives on signing and the balance is paid ${balanceWhen}.`;
  next.pricing.market =
    (lang === "hu"
      ? `A ház tehermentes és lakható. A ${immediate} azonnali, ${year}-os átadás. A ${deferredShort} árnál a birtokbaadás ${balanceWhen} esedékes.`
      : lang === "de"
        ? `Das Haus ist lastenfrei und bewohnbar. ${immediate} bedeuten die Übergabe ${year}. Bei ${deferredShort} erfolgt die Besitzübergabe ${balanceWhen}.`
        : `The house is unencumbered and livable. ${immediate} is immediate handover in ${year}. At ${deferredShort}, possession is handed over ${balanceWhen}.`) + winter;

  const tierLabel =
    deferred.signBy === "2026-11-30"
      ? lang === "hu"
        ? "November 30-i ár"
        : lang === "de"
          ? "Preis bis 30. November"
          : "30 November price"
      : lang === "hu"
        ? "December 31-i téli ár"
        : lang === "de"
          ? "Winterpreis bis 31. Dezember"
          : "31 December winter price";

  next.variants.a.label = tierLabel;
  next.variants.a.title =
    lang === "hu"
      ? `Kétlépcsős vételár — ${deferredFull}`
      : lang === "de"
        ? `Zweistufiger Preis — ${deferredFull}`
        : `Two-step price — ${deferredFull}`;
  next.variants.a.price = deferredFull;
  next.variants.a.short = deferredShort;
  next.variants.a.note =
    lang === "hu"
      ? `${immediate} − ${discount}, szerződés ${until}`
      : lang === "de"
        ? `${immediate} − ${discount}, Vertrag ${until}`
        : `${immediate} − ${discount}, contract ${until}`;
  next.variants.a.deposit =
    lang === "hu"
      ? `Foglaló (10%): ${deposit}, a szerződéskötéssel egyidejűleg, legkésőbb ${until}`
      : lang === "de"
        ? `Anzahlung (10 %): ${deposit}, bei der Unterschrift, spätestens ${until}`
        : `Deposit (10%): ${deposit}, paid on signing, ${until} at the latest`;
  next.variants.a.possession =
    lang === "hu"
      ? `A második részlet (${balance}) ${balanceWhen}, a földhivatali benyújtással és a birtokbaadással együtt`
      : lang === "de"
        ? `Die zweite Rate (${balance}) ${balanceWhen}, zusammen mit der Grundbucheinreichung und der Besitzübergabe`
        : `The second instalment (${balance}) ${balanceWhen}, with the Land Registry filing and handover`;
  next.variants.a.summary =
    lang === "hu"
      ? `Ha ${until} szerződést kötünk, és aláíráskor megfizeted a ${deposit} foglalót, a vételár ${deferredShort}. A maradék ${balance} ${balanceWhen} esedékes.`
      : lang === "de"
        ? `Wenn wir ${until} unterschreiben und du die Anzahlung von ${deposit} bei der Unterschrift zahlst, beträgt der Preis ${deferredShort}. Der Rest von ${balance} ist ${balanceWhen} fällig.`
        : `If we sign ${until} and you pay the ${deposit} deposit on signing, the price is ${deferredShort}. The balance of ${balance} is due ${balanceWhen}.`;
  next.variants.a.cta =
    lang === "hu"
      ? `Érdeklődöm a ${deferredShort} árról`
      : lang === "de"
        ? `Ich frage den Preis von ${deferredShort} an`
        : `I am enquiring about the ${deferredShort} price`;
  next.variants.a.email =
    lang === "hu"
      ? `${tierLabel} (${deferredFull})`
      : lang === "de"
        ? `${tierLabel} (${deferredFull})`
        : `${tierLabel} (${deferredFull})`;

  next.process.steps[1].body =
    lang === "hu"
      ? `Választás: ${tierLabel} (${deferredFull}) vagy azonnali ár (${immediateFull}).`
      : lang === "de"
        ? `Wahl: ${tierLabel} (${deferredFull}) oder Sofortpreis (${immediateFull}).`
        : `Choose the ${tierLabel} (${deferredFull}) or the immediate price (${immediateFull}).`;
  next.process.steps[2].body =
    lang === "hu"
      ? `Ügyvéd előtt. A ${deferredShort} árnál az aláírás és a ${deposit} foglaló legkésőbb ${until} esedékes.`
      : lang === "de"
        ? `Vor einem Anwalt. Beim Preis von ${deferredShort} sind Unterschrift und die Anzahlung von ${deposit} spätestens ${until} fällig.`
        : `Before a lawyer. At ${deferredShort}, signing and the ${deposit} deposit are due ${until} at the latest.`;
  next.process.steps[3].body =
    lang === "hu"
      ? `A ${deferredShort} árnál a második részlet (${balance}) ${balanceWhen} fizetendő, a földhivatali benyújtással és a birtokbaadással együtt. Azonnali árnál a birtokbaadás ${year}-ban történik.`
      : lang === "de"
        ? `Beim Preis von ${deferredShort} ist die zweite Rate (${balance}) ${balanceWhen} fällig, zusammen mit der Grundbucheinreichung und der Besitzübergabe. Beim Sofortpreis erfolgt die Übergabe ${year}.`
        : `At ${deferredShort}, the second instalment (${balance}) is due ${balanceWhen}, together with the Land Registry filing and handover. At the immediate price, possession is in ${year}.`;

  next.faq.items[0].a =
    lang === "hu"
      ? `Az ár fix, közvetítői jutalék nincs — közvetlenül tőlem, 1/1 tulajdonostól veszed. A ${until} élő ${discount} a szerződéskötéshez kötött.`
      : lang === "de"
        ? `Der Preis ist fest, eine Maklerprovision gibt es nicht — du kaufst direkt von mir. Der ${until} geltende Nachlass von ${discount} hängt am Vertrag.`
        : `The price is fixed and there is no agency fee — you buy directly from me, the sole owner. The reduction of ${discount}, open ${until}, is tied to signing the contract.`;
  next.faq.items[2].q =
    lang === "hu"
      ? `Hogyan épül fel a ${deferredShort}?`
      : lang === "de"
        ? `Wie funktioniert der Preis von ${deferredShort}?`
        : `How does the ${deferredShort} price work?`;
  next.faq.items[2].a =
    lang === "hu"
      ? `${until.charAt(0).toUpperCase()}${until.slice(1)} megkötött szerződésnél a vételár ${deferredFull}. A foglaló ${deposit} (10%) aláíráskor fizetendő. A második részlet ${balance} ${balanceWhen} esedékes, a földhivatali benyújtással és a birtokbaadással egyidejűleg. Az ár a jelenlegi berendezéssel együtt értendő.`
      : lang === "de"
        ? `Bei einem Vertrag ${until} beträgt der Preis ${deferredFull}. Die Anzahlung von ${deposit} (10 %) ist bei der Unterschrift fällig. Die zweite Rate von ${balance} ist ${balanceWhen} fällig, zusammen mit der Einreichung beim Grundbuchamt und der Besitzübergabe. Der Preis versteht sich einschließlich der vorhandenen Einrichtung.`
        : `If the contract is signed ${until}, the price is ${deferredFull}. The deposit of ${deposit} (10%) is paid on signing. The second instalment of ${balance} is due ${balanceWhen}, together with the Land Registry filing and handover of possession. The price includes the current furnishings.`;
  next.faq.items[3].a =
    lang === "hu"
      ? `A ${immediate} árnál a birtokbaadás ${year}-ban kérhető. A ${deferredShort} árnál a birtokbaadás ${balanceWhen} esedékes. A telek tetején álló faház azonnal lakható bázis és felvonulási épület az építkezés idejére. A megépülő új ház saját otthonként vagy hosszú távra kiadható lakóházként hasznosítható.`
      : lang === "de"
        ? `Bei ${immediate} kann die Übergabe ${year} erfolgen. Bei ${deferredShort} liegt sie ${balanceWhen}. Das Holzhaus oben ist sofort bewohnbare Basis und Bauunterkunft für die Bauzeit. Das neue Haus ist das dauerhafte Eigenheim oder das langfristig vermietbare Wohnhaus.`
        : `At ${immediate}, possession can be taken in ${year}. At ${deferredShort}, possession is ${balanceWhen}. The wooden house at the top is an immediately livable base and site office during construction. The new house is the permanent family residence or the long-term rental house.`;
  next.contact.lead =
    lang === "hu"
      ? `Használd az űrlapot, vagy — adatkezelés elfogadása után — hívd a védett számot. Ha a ${until} élő ár vagy az azonnali ár érdekel, jelezd az üzenetben.`
      : lang === "de"
        ? `Nutze das Formular oder ruf — nach Zustimmung zum Datenschutz — die geschützte Nummer an. Wenn dich der Preis ${until} oder der Sofortpreis interessiert, schreib es in die Nachricht.`
        : `Use the form, or — after you accept the privacy notice — call the protected number. If you want the price open ${until} or the immediate price, say so in the message.`;

  return next;
}
