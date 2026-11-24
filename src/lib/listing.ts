/**
 * Nyilvános listing — 1/1 tulajdonos, tegező egyes szám.
 * Belső padlóár / eladási kényszer / deadline soha nem szerepelhet szövegként.
 */

export const TOUR_URL = "https://my.matterport.com/show/?m=92EPXPjr6gR&ts=1";
export const PHOTO_STATE = "2026. szeptember 2.";

/** Barna faház, fehér ablakok, betonlépcső, középső beépítési szint. */
export const HERO_IMAGE = {
  src: "/hirdetes/20260902-02.jpg",
  alt: "Barna faház fehér ablakokkal, betonlépcsővel és a középső beépítési szinttel a tölgyesben",
} as const;

export const LISTING_LOGO = {
  src: "/hirdetes/logo-tolgyes.png",
  alt: "Kismaros–Börzsönyliget — ősfás tölgyes és kabin sziluett",
} as const;

export const LISTING_COORDS = {
  lat: 47.844736,
  lng: 19.000447,
} as const;

/**
 * Személyes kapcsolat — a telefonszám NEM itt van plain textben.
 * Összerakás: ListingContact (csak megjelenítés után). Nincs avatar / WhatsApp.
 */
export const LISTING_SELLER = {
  name: "Patrik",
  role: "1/1 tulajdonos · közvetlen kapcsolat",
} as const;

export type ListingVariant = "a" | "b";

/** Az ajánlat 2026. november 30. éjfélig él (december 1. 00:00, Budapest). */
export const OFFER_DEADLINE = "2026-12-01T00:00:00+01:00";

/**
 * a = november 30-ig 26,6 M (foglaló 2.660.000, maradék 23.940.000 jan. 4–8.).
 * b = azonnali, 2026-os birtokbaadás: 27,2 M.
 * A megjelenő szöveg a copy.ts szótárban van, HU / EN / DE.
 * Nyilvános copy: tilos SZJA, adó, „év végi akció”.
 */
export const VARIANT_OFFER = {
  a: {
    code: "a" as const,
    optionLabel: "November 30-i kedvezmény",
    title: "Kedvezményes vételár — 26.600.000 Ft",
    short: "26,6 M Ft",
    listPrice: "26.600.000 Ft",
    deposit: "Foglaló (10%): 2.660.000 Ft, szerződéskötéskor, legkésőbb 2026. november 30-ig",
    possession: "A második részlet (23.940.000 Ft) 2027. január 4–8. között, földhivatali benyújtással és birtokbaadással",
    bandNote: "600.000 Ft kedvezmény, ha november 30-ig szerződünk.",
    perSqm: "kb. 25,4 ezer Ft/m²",
    summary:
      "Ha 2026. november 30-ig szerződést kötünk, és aláíráskor megfizeted a 2.660.000 Ft foglalót, a vételár 26,6 M Ft. A maradék 23.940.000 Ft 2027. január 4–8. között esedékes.",
    ctaLabel: "Érdeklődöm a november 30-i kedvezményre",
  },
  b: {
    code: "b" as const,
    optionLabel: "Azonnali ár",
    title: "Azonnali ár — 27.200.000 Ft",
    short: "27,2 M Ft",
    listPrice: "27.200.000 Ft",
    deposit: "Szerződés szerint",
    possession: "Azonnali, 2026-os birtokbaadás",
    bandNote: "2026-os birtokbaadás, a jelenlegi berendezéssel együtt.",
    perSqm: "kb. 26,0 ezer Ft/m²",
    summary:
      "A fix azonnali ár 27.200.000 Ft, a jelenlegi szerény berendezéssel együtt. A ház lakható, a birtokbaadás 2026-ban kérhető.",
    ctaLabel: "Érdeklődöm az azonnali árra",
  },
  plotSqm: 1046,
  basePrice: "26.600.000 Ft",
  basePriceShort: "26,6 M Ft",
  firstInstallment: "2.660.000 Ft",
  secondInstallment: "23.940.000 Ft",
  discountAmount: "600.000 Ft",
  immediatePrice: "27.200.000 Ft",
  immediatePriceShort: "27,2 M Ft",
  heroBadge: "November 30-ig: −600.000 Ft",
  heroLead:
    "Péntek délután lekapcsolod a laptopot, beülsz az autóba, és 45 perc múlva akár már a Börzsöny erdeje vesz körül.",
  pricingHeading: "Vételár és fizetési ütemezés",
  scheduleTitle: "A 26,6 M Ft feltétele:",
  scheduleTerms: [
    "A szerződést 2026. november 30-ig kötjük meg.",
    "Az első részlet a vételár 10%-a, 2.660.000 Ft, szerződéskötéskor fizetendő.",
    "A második részlet 23.940.000 Ft, 2027. január 4–8. között esedékes, a földhivatali benyújtással és a birtokbaadással egyidejűleg.",
  ] as const,
  possessionNote: "Az ár fix, a jelenlegi szerény berendezéssel együtt értendő.",
  ctaCardTitle: "November 30-ig: 26,6 M Ft",
  ctaCardBody:
    "600.000 Ft-tal kevesebb, mint a 27,2 M Ft-os azonnali ár, ha a foglaló az aláíráskor megérkezik, a maradék pedig 2027. január 4–8. között.",
  fixturesNote: "Az ár a jelenlegi berendezéssel együtt értendő",
  premiumNote:
    "Az ár fix, a jelenlegi szerény berendezéssel együtt értendő, közvetítői jutalék nincs. Azonnali, 2026-os birtokbaadás: 27,2 M Ft. Ha 2026. november 30-ig szerződést kötünk, a vételár 26,6 M Ft.",
  marketNote:
    "A ház tehermentes és lakható. A 27,2 M Ft azonnali, 2026-os átadás. A 26,6 M Ft-nál a birtokbaadás 2027. január 4–8. között esedékes.",
} as const;

export const FAQ_ITEMS = [
  {
    q: "Alkudható az ár?",
    a: "Nem. Az ár fix, közvetítői jutalék nincs. A november 30-ig élő 600.000 Ft a szerződéskötéshez kötött.",
  },
  {
    q: "Mi marad a házban?",
    a: "A jelenlegi szerény berendezés a házban marad, az ár ezzel együtt értendő. A tárolókból a személyes tárgyaimat elszállítom.",
  },
  {
    q: "Hogyan épül fel a 26,6 M Ft?",
    a: "2026. november 30-ig megkötött szerződésnél a vételár 26.600.000 Ft. A foglaló 2.660.000 Ft (10%) aláíráskor fizetendő. A második részlet 23.940.000 Ft 2027. január 4–8. között esedékes, a földhivatali benyújtással és a birtokbaadással egyidejűleg.",
  },
  {
    q: "Azonnal beköltözhetek?",
    a: "A 27,2 M Ft-os árnál a birtokbaadás 2026-ban kérhető. A 26,6 M Ft-nál a birtokbaadás 2027. január 4–8. között esedékes. A ház lakható.",
  },
  {
    q: "Hitelezhető a telek?",
    a: "Mivel belterületi építési telek, a kereskedelmi bankok lakáshitel-gyakorlata (az MNB hitelfedezeti arányokat szabályozó 32/2014. (IX. 10.) rendelete alapján) engedélyezi a telekvásárlási hitelt, de a beépítetlen jelleg miatt magasabb önerővel (jellemzően 30–50%) érdemes számolnod. Ha később lakóházat építesz rá, a telken lévő tulajdonod és annak értéke a lakóház-építési hitelnél teljes mértékben beszámítható a banki önerőbe.",
  },
  {
    q: "Van közvetítői jutalék?",
    a: "Nincs. Közvetlenül tőlem vásárolsz.",
  },
  {
    q: "Honnan tudom, hogy a jogi háttér tiszta?",
    a: "Az ingatlan Lke-4 övezeti besorolású, és a Kismaros 8/2025. önkormányzati rendelet szerinti változtatási tilalom nem érinti. Tulajdoni lapot és igazolást kérésre megmutatok, vagy a megtekintéskor átnézzük.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    title: "Megtekintés",
    body: "Egyeztetett időpontban személyesen megnézed a faházat és a telket.",
  },
  {
    title: "Döntés",
    body: "Választás: november 30-i kedvezmény (26.600.000 Ft) vagy azonnali ár (27.200.000 Ft).",
  },
  {
    title: "Szerződéskötés",
    body: "Ügyvéd előtt. Kedvezménynél az aláírás és a 2.660.000 Ft foglaló legkésőbb 2026. november 30-ig esedékes.",
  },
  {
    title: "Fizetés és birtokbaadás",
    body: "Kedvezménynél a második részlet (23.940.000 Ft) 2027. január 4–8. között fizetendő, a földhivatali benyújtással és a birtokbaadással együtt. Azonnali árnál a birtokbaadás 2026-ban történik.",
  },
] as const;

export const COMMUTE_TIMES = [
  { label: "Budapest XIII. kerület, autó", value: "35–38 perc" },
  { label: "Budapest XI. kerület, autó (csúcs)", value: "1:15–1:30 óra" },
  { label: "Budapest XI. kerület, autó (nem csúcs)", value: "0:50–1:00 óra" },
  { label: "Vác (Nagy Lidl), autó", value: "15–20 perc" },
  { label: "Esztergom, autó", value: "45 perc" },
  { label: "Kismaros központ / vasút, gyalog", value: "30–35 perc · 3–4 km" },
  { label: "Nyugati pályaudvar, vonat", value: "45 perc" },
  { label: "Budapest a háztól, vonattal", value: "másfél órán belül" },
] as const;

export const PHOTOS = [
  { src: "/hirdetes/20260902-01.jpg", alt: "A meglévő épület a tölgyesben, 2026. szeptember 2.", tall: true },
  { src: "/hirdetes/20260902-02.jpg", alt: "Lépcső a felépítményhez", tall: false },
  { src: "/hirdetes/20260902-03.jpg", alt: "Y-alakú telken belüli kavicsos parkoló és kapuk", tall: true },
  { src: "/hirdetes/20260902-04.jpg", alt: "Kőkosaras támfal és drótkerítés", tall: false },
  { src: "/hirdetes/20260902-05.jpg", alt: "Kapu a kerítésben", tall: false },
  { src: "/hirdetes/20260902-06.jpg", alt: "Kavicsos kocsibeálló a telek előtt", tall: true },
  { src: "/hirdetes/20260902-07.jpg", alt: "Ösvény a fák között", tall: false },
  { src: "/hirdetes/20260902-08.jpg", alt: "Kiskapu az erdei ösvényen", tall: false },
  { src: "/hirdetes/20260902-09.jpg", alt: "A kapu az utca felől", tall: false },
  { src: "/hirdetes/20260902-10.jpg", alt: "A kerítés és a kapu a telek felől", tall: false },
  { src: "/hirdetes/20260902-11.jpg", alt: "A beálló a kapu mellett", tall: false },
  { src: "/hirdetes/20260902-13.jpg", alt: "A cserépkályha és az átjáró a konyha felé", tall: false },
  { src: "/hirdetes/20260902-14.jpg", alt: "A szoba az ajtóból", tall: false },
  { src: "/hirdetes/20260902-15.jpg", alt: "Átnézet a konyhából", tall: false },
  { src: "/hirdetes/20260902-16.jpg", alt: "A konyha tűzhellyel és mosogatóval", tall: false },
  { src: "/hirdetes/20260902-17.jpg", alt: "Kilátás az erdőre az ablakból", tall: true },
  { src: "/hirdetes/20260902-18.jpg", alt: "A konyha sarka", tall: false },
  { src: "/hirdetes/20260902-19.jpg", alt: "A ház oldala az erdő felé", tall: false },
  { src: "/hirdetes/20260902-20.jpg", alt: "A bejárat", tall: false },
  { src: "/hirdetes/20260902-21.jpg", alt: "A felépítmény homlokzata", tall: true },
  { src: "/hirdetes/20260902-22.jpg", alt: "Kavicsos rész a fák között", tall: false },
  { src: "/hirdetes/20260902-23.jpg", alt: "Az épület a lejtőről", tall: false },
  { src: "/hirdetes/20260902-24.jpg", alt: "Az épület oldala", tall: false },
  { src: "/hirdetes/20260902-25.jpg", alt: "A telek erdős része", tall: false },
  { src: "/hirdetes/20260902-26.jpg", alt: "Melléképület a lejtőn", tall: false },
  { src: "/hirdetes/20260902-27.jpg", alt: "Kilátás a fák között a völgy felé", tall: true },
  { src: "/hirdetes/20260902-28.jpg", alt: "A lejtős telekrész", tall: false },
  { src: "/hirdetes/20260902-29.jpg", alt: "A telek a fák alatt", tall: false },
  { src: "/hirdetes/20260902-30.jpg", alt: "Ősfás rész a telken", tall: false },
  { src: "/hirdetes/20261110-01.jpg", alt: "A csempézett fürdő WC-vel, zuhannyal és mosdóval", tall: true },
  { src: "/hirdetes/20261110-02.jpg", alt: "A nappali fa burkolattal és zöld cserépkályhával", tall: true },
  { src: "/hirdetes/20261110-03.jpg", alt: "A konyha tűzhellyel, szekrénnyel és mosogatóval", tall: true },
  { src: "/hirdetes/20261110-04.jpg", alt: "Őszi erdőkilátás a rácsos ablakon át", tall: true },
  { src: "/hirdetes/20261110-05.jpg", alt: "Kilátás a tölgyesre a fehér ablakkeretből", tall: true },
] as const;

export const UTILITY_PHOTOS = [
  { src: "/hirdetes/20260902-mero.jpg", alt: "A mérőhely, felette a cserélt kismegszakítók", title: "Áram", caption: "A mérőhely. A mérő után a rendszer cserélve." },
  {
    src: "/hirdetes/20260902-viz.jpg",
    alt: "Folyó víz a konyhai csapon — vezetékes ivóvíz",
    title: "Vezetékes ivóvíz",
    caption:
      "Vezetékes ivóvíz — kiépített hálózatra kötve. Kiemelt érték a telken: nem ciszternás vagy kutas megoldás, hanem hálózati ivóvíz.",
  },
  {
    src: "/hirdetes/20260902-furdo.jpg",
    alt: "A csempézett fürdő. A mosdócsap fölötti tükör fölött látszik a befalazott ajtó helye.",
    title: "Csempe és vezetékes víz",
    caption:
      "A fürdő csempézve van, a burkolat mögött pedig a már kicserélt, modern ötrétegű vízcsövek húzódnak. Már nem a konyhából nyílik: a mosdócsap fölötti tükör fölött látszik a befalazott ajtó helye.",
  },
] as const;
