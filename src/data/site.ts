/*
  Facts from the shop's Instagram profile (@i_fiori_di_raffaella):
  florist in Paullo since 1995, Raffaella Medioli, weddings and events,
  home delivery, Interflora and Too Good To Go.
  ASSUMED (confirm with the client): opening hours, the e-mail address.
*/
export const site = {
  name: 'I fiori di Raffaella',
  owner: 'Raffaella Medioli',
  town: 'Paullo',
  area: 'Paullo, città metropolitana di Milano',
  since: 1995,
  // TODO client: real address, phone and e-mail
  email: 'ordini@ifioridiraffaella.example',
  instagram: 'https://www.instagram.com/i_fiori_di_raffaella/',
  instagramHandle: '@i_fiori_di_raffaella',
  interflora: 'https://www.interflora.it/',
  tgtg: 'https://www.toogoodtogo.com/it',
  hours: [
    { days: 'Lunedì', time: 'Chiuso' },
    { days: 'Martedì – Sabato', time: '8:30 – 12:30 · 15:30 – 19:30' },
    { days: 'Domenica', time: '8:30 – 12:30' },
  ],
}
