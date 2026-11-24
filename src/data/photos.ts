/*
  Every photograph below is a licensed STAND-IN from Wikimedia Commons (credits in /crediti).
  Replace each one with the client's own photograph before the site ships; keep the same key.
*/
export type Photo = {
  id: string
  src: string
  srcSet: string
  w: number
  h: number
  alt: string
}

const jpg = (id: string, sizes: number[], full?: { w: number; h: number }): Pick<Photo, 'src' | 'srcSet'> => {
  const parts = sizes.map((s) => `/img/photo-${id}-${s}.jpg ${s}w`)
  if (full) parts.push(`/img/photo-${id}.jpg ${full.w}w`)
  return { src: full ? `/img/photo-${id}.jpg` : `/img/photo-${id}-${sizes[sizes.length - 1]}.jpg`, srcSet: parts.join(', ') }
}

export const photos = {
  // hero: shoot the shop from the door or Raffaella's bench
  heroHands: {
    id: 'm138226685',
    src: '/img/photo-m138226685-1800.webp',
    srcSet: '/img/photo-m138226685-1200.webp 1200w, /img/photo-m138226685-1800.webp 1800w, /img/photo-m138226685-2400.webp 2400w',
    w: 2400,
    h: 1600,
    alt: 'Mani che tagliano gli steli di un mazzo di verde sul banco da lavoro, secchi di fiori sullo sfondo',
  },
  wrapping: {
    id: 'm138226686',
    src: '/img/photo-m138226686-1200.webp',
    srcSet: '/img/photo-m138226686-1200.webp 1200w',
    w: 1200,
    h: 800,
    alt: 'Fiorista che rifila gli steli di un bouquet avvolto in carta crema',
  },
  bucket: {
    id: 'm183016636',
    src: '/img/photo-m183016636-1200.webp',
    srcSet: '/img/photo-m183016636-1200.webp 1200w',
    w: 1200,
    h: 900,
    alt: 'Boccioli di leucadendron color rame e verde in un secchio nero',
  },
  poppies: { id: 'f59392803', ...jpg('f59392803', [500, 960]), w: 960, h: 1380, alt: 'Papaveri rossi in un vaso di vetro rosso su fondo chiaro' },
  bride: { id: 'f61711770', ...jpg('f61711770', [500, 960], { w: 1280, h: 853 }), w: 1280, h: 853, alt: 'Sposa in pizzo che tiene un bouquet di rose rosa e bianche' },
  brideTwo: { id: 'f89574706', ...jpg('f89574706', [500, 960]), w: 960, h: 1439, alt: 'Bouquet da sposa con rose pallide ed eucalipto davanti a un abito rosa' },
  vase: { id: 'f148558316', ...jpg('f148558316', [500, 960]), w: 960, h: 720, alt: 'Mazzo di fiori gialli e arancio in un vaso di vetro alla luce del pomeriggio' },
  daisies: { id: 'f30481104', ...jpg('f30481104', [500, 960]), w: 960, h: 720, alt: 'Margherite bianche e gypsophila raccolte in un mazzo' },
  tulip: { id: 'f23563941', ...jpg('f23563941', [500, 960], { w: 1280, h: 960 }), w: 1280, h: 960, alt: 'Tulipano arancio aperto tra tulipani bianchi e viola' },
  jug: { id: 'f91116230', ...jpg('f91116230', [500, 960]), w: 960, h: 1440, alt: 'Fiori di campo viola e rosa in una brocca di ceramica sul davanzale' },
  table: { id: 'f189923665', ...jpg('f189923665', [500, 960]), w: 960, h: 1438, alt: 'Tavolo di nozze apparecchiato con centrotavola di rose rosse e verde' },
  christmas: { id: 'f122960066', ...jpg('f122960066', [500, 960]), w: 960, h: 720, alt: 'Bouquet natalizio con gerbere arancio e rose bianche vicino all’albero' },
} satisfies Record<string, Photo>
