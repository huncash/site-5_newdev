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
 * Az ár és a határidő a pricingConfig.ts dátumfeloldójában él.
 * Nyilvános copy: tilos SZJA, adó, „év végi akció”.
 */

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
