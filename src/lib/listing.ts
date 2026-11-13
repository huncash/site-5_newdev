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

/**
 * a = Kétütemű novemberi kedvezmény 28,8 M · b = alapár 30 M
 * Nyilvános copy: csak vevői előny / fizetési ütem — tilos SZJA, adó, „év végi akció”.
 */
export const VARIANT_OFFER = {
  a: {
    code: "a" as const,
    optionLabel: "Kétütemű novemberi kedvezmény",
    title: "Kedvezményes vételár — 28.800.000 Ft",
    short: "−1.200.000 Ft",
    listPrice: "28.800.000 Ft",
    deposit: "1. részlet (10%): szerződéskötéskor, legkésőbb 2026. november 30-ig",
    possession:
      "Birtokbaadás és tulajdonjog-átruházás a 2. részlet beérkezése után, 2027 januárjában",
    bandNote: "Alapár 30.000.000 Ft − 1.200.000 Ft kétütemű novemberi kedvezménnyel",
    perSqm: "kb. 27,5 ezer Ft/m²",
    summary:
      "Megtakarítás novemberi szerződéskötéssel: 1.200.000 Ft. Kössön szerződést novemberben 10% előleggel; a fennmaradó 90%-ot 2027. január 4–8. között rendezheti. Így a végleges vételár 30 M Ft helyett 28,8 M Ft.",
    ctaLabel: "Érdeklődöm a kétütemű novemberi kedvezményre",
  },
  b: {
    code: "b" as const,
    optionLabel: "Alapár",
    title: "Alapár — 30.000.000 Ft",
    short: "30.000.000 Ft",
    listPrice: "30.000.000 Ft",
    deposit: "Szerződés szerint",
    possession: "Azonnali — legkorábban 2026. november 10.",
    bandNote: "Fix alapár, közvetlenül tőlem",
    perSqm: "kb. 28,7 ezer Ft/m²",
    summary:
      "A fix alapár 30.000.000 Ft. A ház azonnal használható; a birtokbaadás legkorábban 2026. november 10-től lehetséges.",
    ctaLabel: "Érdeklődöm az alapárra",
  },
  plotSqm: 1046,
  basePrice: "30.000.000 Ft",
  basePriceShort: "30 M Ft",
  discountPrice: "28.800.000 Ft",
  discountPriceShort: "28,8 M Ft",
  discountAmount: "1.200.000 Ft",
  paymentLabel: "Kétütemű novemberi kedvezmény",
  heroBadge: "Kétütemű novemberi kedvezmény: −1.200.000 Ft",
  heroLead:
    "Alapár: 30.000.000 Ft. Kétütemű novemberi kedvezménnyel: 28.800.000 Ft.",
  pricingHeading: "Vételár és fizetési konstrukció",
  discountTermsTitle: "Az 1.200.000 Ft-os kétütemű novemberi kedvezmény feltétele:",
  discountTerms: [
    "Az adásvételi szerződés aláírása és a 10%-os első részlet beérkezése 2026. november 30-ig megtörténik.",
    "A fennmaradó 90%-os második részlet megfizetése a szerződésben rögzített 2027. január 4. és 8. közötti időablakban teljesül.",
  ] as const,
  possessionNote:
    "A birtokbaadás és a tulajdonjog-átruházás a második részlet (2027. január 4–8.) beérkezését követően, 2027 januárjában történik meg.",
  ctaCardTitle: "Megtakarítás novemberi szerződéskötéssel: 1.200.000 Ft",
  ctaCardBody:
    "Kössön szerződést novemberben 10% előleggel, a vételár második felét pedig ráér 2027. január 4–8. között rendezni. Így a végleges vételár 30 M Ft helyett csak 28,8 M Ft.",
  fixturesNote: "A jelenlegi egyszerű berendezés a házban marad",
  premiumNote:
    "Az árak fixek, közvetítői jutalék nincs — közvetlenül tőlem, 1/1 tulajdonostól veszed. A kétütemű novemberi kedvezménnyel a vételár 28.800.000 Ft; különben az alapár 30.000.000 Ft.",
  marketNote:
    "A részletek, a tulajdonjog fenntartás és az ütemezés szabályait az adásvételi szerződés rögzíti, ügyvéd közreműködésével.",
} as const;

export const FAQ_ITEMS = [
  {
    q: "Alkudható az ár?",
    a: "Nem, az ár fix, közvetítői jutalék nincsen — közvetlenül tőlem, 1/1 tulajdonostól veszed. Nincs mesterségesen felfújt alkupuffer.",
  },
  {
    q: "Mi marad a házban?",
    a: "A jelenlegi egyszerű berendezés a házban marad. (A tárolókból a személyes tárgyaimat elszállítom.)",
  },
  {
    q: "Hogyan érhető el az 1.200.000 Ft-os kétütemű novemberi kedvezmény?",
    a: "A kedvezményes 28.800.000 Ft-os vételár a kétütemű novemberi kedvezménnyel érhető el: (1) az 1. részlet (10%) szerződéskötéskor, legkésőbb 2026. november 30-ig; (2) a 2. részlet (90%) 2027. január 4–8. között banki átutalással. A szerződésben a tulajdonjog fenntartással történő eladása és a 2027. januári birtokbaadás kerül rögzítésre — mindkét fél számára kiszámítható, biztonságos átmenettel.",
  },
  {
    q: "Azonnal beköltözhetek / kiadható a ház?",
    a: "Az alapár mellett a ház azonnal használható és lakható; birtokbaadás legkorábban 2026. november 10-től. A kétütemű novemberi kedvezménynél a 2. részlet 2027. január 4–8. között esedékes; a birtokbaadás és a tulajdonjog-átruházás a 2. részlet beérkezése után, 2027 januárjában történik. A jelenlegi piaci helyzetben az eklektikus berendezés ellenére is kiadható hosszú távú albérlőnek.",
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
    body: "Választás: kétütemű novemberi kedvezmény (28.800.000 Ft) vagy alapár (30.000.000 Ft).",
  },
  {
    title: "Szerződéskötés",
    body: "Ügyvéd előtt. Kedvezménynél: aláírás és 10% első részlet legkésőbb 2026. november 30-ig.",
  },
  {
    title: "Fizetés és birtokbaadás",
    body: "Kedvezménynél a 90% 2027. január 4–8. között; birtokbaadás a 2. részlet után, 2027 januárjában. Alapárnál: szerződés szerinti ütem, legkorábban 2026. november 10.",
  },
] as const;

export const COMMUTE_TIMES = [
  { label: "Budapest XIII. kerület", value: "35–38 perc" },
  { label: "Budapest XI. kerület (csúcs)", value: "1:15–1:30 óra" },
  { label: "Budapest XI. kerület (nem csúcs)", value: "0:50–1:00 óra" },
  { label: "Vác (Nagy Lidl)", value: "15–20 perc" },
  { label: "Esztergom", value: "45 perc" },
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
