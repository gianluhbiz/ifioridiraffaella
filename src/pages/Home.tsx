import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import OrderForm from '../components/OrderForm'
import Photo from '../components/Photo'
import { ClipReveal, Counter, Magnetic, Marquee, RotatingWord, SpinBadge, SplitLetters } from '../components/fx'
import { usePointerFollow } from '../lib/usePointerFollow'
import { PageTransition, Reveal, WordsSettle } from '../components/motion'
import { ease } from '../lib/ease'
import { INTRO_DELAY } from '../lib/intro'
import { photos, type Photo as PhotoData } from '../data/photos'
import { site } from '../data/site'

const D = INTRO_DELAY

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay: D + delay },
  })

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-72px)] items-center pt-10 pb-20 lg:py-12"
      data-enter
    >
      <div className="wrap grid items-center gap-16 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <motion.p
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[15px]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
            </span>
            Fiorista a Paullo dal {site.since}
          </motion.p>

          <h1 id="hero-title" className="mt-6 text-[clamp(46px,7.2vw,112px)] leading-[0.98]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease, delay: D + 0.05 }}
              >
                Il negozio di
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="flex flex-wrap items-center gap-x-[0.22em]"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease, delay: D + 0.15 }}
              >
                <em className="text-walnut">fiori</em>
                <motion.span
                  aria-hidden="true"
                  className="inline-block h-[0.78em] overflow-hidden rounded-full bg-surface"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '1.7em', opacity: 1 }}
                  transition={{ duration: 1, ease, delay: D + 0.7 }}
                >
                  <img src={photos.tulip.src} alt="" className="h-full w-[1.7em] max-w-none object-cover" />
                </motion.span>
                <span>di Paullo</span>
              </motion.span>
            </span>
          </h1>

          <motion.p {...rise(0.35)} className="display mt-5 text-[clamp(24px,2.6vw,36px)] leading-tight text-muted">
            per <RotatingWord className="text-ink italic" words={['un regalo', 'la tua laurea', 'il matrimonio', 'la casa', 'Natale']} />
          </motion.p>

          <motion.p {...rise(0.45)} className="mt-6 max-w-[48ch] text-[18px] leading-[1.6] text-muted">
            Bouquet, flower box e composizioni preparati a mano da {site.owner}. Consegna a domicilio a Paullo e dintorni,
            in tutta Italia con Interflora.
          </motion.p>

          <motion.div {...rise(0.55)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <a id="hero-cta" href="#ordina" className="btn w-full sm:w-auto">
                Ordina un bouquet <i className="ri-arrow-right-line" />
              </a>
            </Magnetic>
            <Link to="/matrimoni" className="btn btn--ghost">
              Matrimoni ed eventi
            </Link>
          </motion.div>
        </div>

        {/* collage */}
        <div className="relative lg:col-span-5">
          <ClipReveal onLoad delay={D + 0.2} className="relative ml-auto w-[86%] sm:w-[70%] lg:w-[88%]">
            <Photo photo={photos.heroHands} priority sizes="(min-width: 1024px) 480px, 80vw" className="aspect-[4/5]" position="38% 50%" />
          </ClipReveal>

          <motion.div
            className="absolute bottom-[-8%] left-0 w-[44%] sm:w-[36%] lg:w-[46%]"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: D + 0.7 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: D + 1.8 }}
              className="rounded-[26px] bg-paper p-2 shadow-[0_30px_60px_-30px_rgb(42_38_34/0.45)]"
            >
              <Photo photo={photos.poppies} sizes="240px" className="aspect-[3/4]" />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute top-[-4%] left-[6%] sm:left-[14%] lg:left-[-2%]"
            initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease, delay: D + 0.9 }}
          >
            <SpinBadge text="FIORI FRESCHI · PAULLO · DAL 1995 · " className="h-24 w-24 sm:h-32 sm:w-32" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Marquee ───────────────────────── */

function Ticker() {
  const items = ['Bouquet', 'Flower box', 'Lauree', 'Matrimoni', 'Eventi', 'Piante', 'Consegna a domicilio', 'Interflora']
  return (
    <div className="bg-ink py-5 text-paper md:py-7">
      <Marquee speed={42}>
        {items.map((t) => (
          <span key={t} className="display flex items-center text-[clamp(26px,3.4vw,48px)] italic">
            <span className="px-6 md:px-10">{t}</span>
            <i className="ri-flower-fill text-[0.6em] text-blush" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}

/* ───────────────────────── Story ───────────────────────── */

function Story() {
  const years = new Date().getFullYear() - site.since
  const facts = [
    { icon: 'ri-hand-heart-line', title: 'Composti a mano', text: 'Ogni mazzo nasce sul banco del negozio.' },
    { icon: 'ri-truck-line', title: 'Consegna a domicilio', text: 'A Paullo e nei paesi vicini.' },
    { icon: 'ri-earth-line', title: 'Interflora', text: 'Fiori spediti in tutta Italia.' },
    { icon: 'ri-leaf-line', title: 'Too Good To Go', text: 'I fiori di fine giornata a prezzo ridotto.' },
  ]
  return (
    <section id="storia" aria-labelledby="storia-title" className="py-24 md:py-32">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <h2 id="storia-title" className="sr-only">
              La storia del negozio
            </h2>
            <Reveal>
              <p className="mb-6 text-[15px] font-medium text-walnut">La bottega</p>
            </Reveal>
            <WordsSettle
              moment="word-highlight"
              className="display text-[clamp(30px,3.8vw,54px)] leading-[1.14]"
              text="Dal 1995 Raffaella Medioli lavora i fiori a Paullo: mazzi per la casa, regali, lauree, matrimoni ed eventi."
              strong={['1995', 'Paullo']}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
            <Reveal className="flex flex-col justify-between rounded-[28px] bg-walnut p-6 text-paper md:p-8">
              <p className="text-[15px] text-paper/80">Anni a Paullo</p>
              <p className="display mt-6 text-[clamp(64px,8vw,120px)] leading-none tracking-[-0.05em]">
                <Counter to={years} />
              </p>
            </Reveal>
            <ClipReveal delay={0.15}>
              <Photo photo={photos.wrapping} sizes="(min-width: 1024px) 400px, 50vw" className="aspect-square lg:aspect-[4/3]" position="42% 70%" />
            </ClipReveal>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {facts.map((f, i) => (
            <motion.li
              key={f.title}
              className="group rounded-[28px] bg-surface p-6 transition-transform duration-300 hover:-translate-y-0.5 md:p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease, delay: 0.08 * i }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-[22px] text-walnut transition-transform duration-500 group-hover:rotate-[20deg]">
                <i className={f.icon} />
              </span>
              <h3 className="mt-6 text-[19px] font-medium">{f.title}</h3>
              <p className="mt-1 text-muted">{f.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────────── Services: hover list with a follower picture ───────────────────────── */

const services: { title: string; text: string; photo: PhotoData }[] = [
  { title: 'Bouquet e mazzi', text: 'Composti al momento con i fiori arrivati in settimana.', photo: photos.vase },
  { title: 'Flower box', text: 'Fiori sistemati in scatola, da regalare senza pensare al vaso.', photo: photos.daisies },
  { title: 'Lauree', text: 'Corone d’alloro e mazzi per il giorno della proclamazione.', photo: photos.tulip },
  { title: 'Piante', text: 'Verde da appartamento e piante fiorite di stagione.', photo: photos.bucket },
  { title: 'Natale', text: 'Centrotavola, rami, bacche e composizioni per la casa.', photo: photos.christmas },
]

function Services() {
  const listRef = useRef<HTMLUListElement>(null)
  const { x, y, sx, sy } = usePointerFollow()
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="fiori" aria-labelledby="fiori-title" className="bg-surface py-24 md:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="mb-4 text-[15px] font-medium text-walnut">In negozio</p>
            <h2 id="fiori-title" className="text-[clamp(40px,5.4vw,80px)] leading-[1]">
              Cosa prepariamo <em className="text-walnut">in bottega</em>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="text-[18px] text-muted">
              Passa a scegliere o scrivici l’occasione: prepariamo il mazzo e lo teniamo pronto per il ritiro, oppure lo
              portiamo noi.
            </p>
          </Reveal>
        </div>

        <ul
          ref={listRef}
          className="relative mt-12 border-t border-ink/15 md:mt-16"
          onPointerMove={(e) => {
            const r = listRef.current?.getBoundingClientRect()
            if (!r) return
            x.set(e.clientX - r.left)
            y.set(e.clientY - r.top)
          }}
          onPointerLeave={() => setActive(null)}
        >
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              className="border-b border-ink/15"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease, delay: 0.05 * i }}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
            >
              <a
                href="#ordina"
                className="group grid grid-cols-[64px_1fr_auto] items-center gap-4 py-5 md:grid-cols-[64px_1fr_1fr_auto] md:gap-6 md:py-7 lg:grid-cols-[80px_1fr_1fr_auto]"
              >
                <span className="frame aspect-square w-16 rounded-2xl! lg:hidden">
                  <img src={s.photo.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </span>
                <span className="hidden text-[15px] text-muted tabular-nums lg:block">0{i + 1}</span>
                <span className="min-w-0">
                  <span className="display block text-[clamp(26px,3.6vw,54px)] leading-[1.05] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-[15px] text-muted md:hidden">{s.text}</span>
                </span>
                <span className="hidden max-w-[36ch] text-muted md:block">{s.text}</span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 text-[20px] transition-colors duration-300 group-hover:border-walnut group-hover:bg-walnut group-hover:text-paper">
                  <i className="ri-arrow-right-up-line transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
            </motion.li>
          ))}

          {/* follower picture, mouse only */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 z-10 hidden h-[300px] w-[240px] lg:block"
            style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <div className="frame h-full w-full shadow-[0_40px_80px_-30px_rgb(42_38_34/0.5)]">
                    <img src={services[active].photo.src} alt="" className="h-full w-full object-cover" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────────── Weddings ───────────────────────── */

function Weddings() {
  const steps = [
    { n: '01', t: 'Ci vediamo in negozio', d: 'Colori, luogo, data: guardiamo insieme cosa offre la stagione.' },
    { n: '02', t: 'Ricevi il progetto', d: 'Le composizioni una per una, con il prezzo finale.' },
    { n: '03', t: 'Allestiamo noi', d: 'Chiesa e sala pronte prima che arrivino gli invitati.' },
  ]
  return (
    <section id="matrimoni" aria-labelledby="matrimoni-title" className="overflow-hidden bg-night py-24 text-paper md:py-32">
      <div className="wrap grid gap-20 lg:grid-cols-12 lg:gap-6">
        <div className="relative lg:col-span-6">
          <Link to="/matrimoni" aria-label="Matrimoni ed eventi" className="block">
            <Photo photo={photos.bride} develops sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[4/5]" position="50% 40%" />
          </Link>
          <ClipReveal delay={0.5} className="absolute right-0 -bottom-10 w-[42%] rounded-[24px] bg-night p-2 lg:-right-16">
            <Photo photo={photos.brideTwo} sizes="260px" className="aspect-[3/4]" />
          </ClipReveal>
        </div>

        <div className="flex flex-col lg:col-span-5 lg:col-start-8 lg:pt-6">
          <Reveal>
            <p className="mb-4 text-[15px] font-medium text-blush">Matrimoni ed eventi</p>
            <h2 id="matrimoni-title" className="text-[clamp(40px,5vw,72px)] leading-[1]">
              Il giorno del sì, <em className="text-blush">fiore per fiore</em>
            </h2>
            <p className="mt-6 text-[18px] text-paper/75">
              Bouquet della sposa, bottoniere, addobbi per la chiesa e centrotavola per il ricevimento, seguiti da Raffaella
              dal primo incontro all’allestimento.
            </p>
          </Reveal>

          <ol className="mt-10 border-t border-paper/15">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                className="grid grid-cols-[48px_1fr] gap-4 border-b border-paper/15 py-5"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease, delay: 0.1 * i }}
              >
                <span className="text-[15px] text-blush tabular-nums">{s.n}</span>
                <span>
                  <span className="block text-[19px] font-medium">{s.t}</span>
                  <span className="mt-1 block text-paper/70">{s.d}</span>
                </span>
              </motion.li>
            ))}
          </ol>

          <Reveal className="mt-10" delay={0.2}>
            <Link to="/matrimoni" className="btn btn--light">
              Scopri i matrimoni <i className="ri-arrow-right-line" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Gallery: drag rail ───────────────────────── */

function Gallery() {
  const outer = useRef<HTMLDivElement>(null)
  const dragged = useRef(false)
  const items: { p: PhotoData; w: string; pos?: string }[] = [
    { p: photos.jug, w: 'w-[64vw] sm:w-[340px]', pos: '50% 60%' },
    { p: photos.vase, w: 'w-[84vw] sm:w-[520px]' },
    { p: photos.table, w: 'w-[64vw] sm:w-[340px]' },
    { p: photos.daisies, w: 'w-[84vw] sm:w-[520px]' },
    { p: photos.poppies, w: 'w-[64vw] sm:w-[340px]' },
    { p: photos.christmas, w: 'w-[84vw] sm:w-[520px]' },
    { p: photos.bucket, w: 'w-[84vw] sm:w-[520px]' },
  ]
  return (
    <section id="bottega" aria-labelledby="bottega-title" className="overflow-hidden py-24 md:py-32">
      <div className="wrap flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="mb-4 text-[15px] font-medium text-walnut">Dal banco del negozio</p>
          <h2 id="bottega-title" className="text-[clamp(40px,5.4vw,80px)] leading-[1]">
            Composizioni <em className="text-walnut">di stagione</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="flex items-center gap-6">
          <span className="hidden items-center gap-2 text-muted md:inline-flex">
            <i className="ri-drag-move-2-line text-[20px]" /> Trascina
          </span>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="link-arrow">
            Altre su Instagram <i className="ri-arrow-right-line" />
          </a>
        </Reveal>
      </div>

      <div ref={outer} className="wrap mt-12 md:mt-16">
        <motion.ul
          className="flex w-max cursor-grab gap-4 active:cursor-grabbing md:gap-6"
          drag="x"
          dragConstraints={outer}
          dragElastic={0.08}
          onDragStart={() => {
            dragged.current = true
          }}
          onDragEnd={() => {
            window.setTimeout(() => (dragged.current = false), 50)
          }}
        >
          {items.map(({ p, w, pos }, i) => (
            <motion.li
              key={p.id}
              className={`${w} shrink-0`}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease, delay: 0.06 * i }}
            >
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Vedi su Instagram"
                draggable={false}
                onClick={(e) => dragged.current && e.preventDefault()}
                className="block"
              >
                <Photo photo={p} sizes="520px" className="frame--zoom h-[80vw] max-h-[440px] sm:h-[440px]" position={pos} />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* ───────────────────────── Visit: bento ───────────────────────── */

function Visit() {
  const card = (i: number) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease, delay: 0.07 * i },
  })
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('I fiori di Raffaella Paullo')}`

  return (
    <section id="visita" aria-labelledby="visita-title" className="pb-24 md:pb-32">
      <div className="wrap grid gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-6">
        <motion.div
          {...card(0)}
          className="flex min-h-[380px] flex-col justify-between rounded-[32px] bg-walnut p-8 text-paper md:col-span-6 lg:col-span-5 lg:row-span-2 lg:p-10"
        >
          <div>
            <p className="text-[15px] text-paper/80">Vieni a trovarci</p>
            <h2 id="visita-title" className="mt-4 text-[clamp(40px,4.6vw,64px)] leading-[1]">
              Il negozio è a <em className="text-blush">Paullo</em>
            </h2>
            <p className="mt-5 max-w-[36ch] text-paper/80">
              Scegli i fiori dai secchi e Raffaella li compone davanti a te, nella città metropolitana di Milano.
            </p>
          </div>
          <a href={maps} target="_blank" rel="noreferrer" className="btn btn--light mt-10 self-start">
            <i className="ri-map-pin-2-line" /> Apri su Google Maps
          </a>
        </motion.div>

        <motion.div {...card(1)} className="rounded-[32px] bg-surface p-8 md:col-span-3 lg:col-span-4" data-assumed="hours">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-[22px] text-walnut">
            <i className="ri-time-line" />
          </span>
          <h3 className="mt-6 text-[19px] font-medium">Orari del negozio</h3>
          <dl className="mt-4 grid gap-3">
            {site.hours.map((h) => (
              <div key={h.days} className="flex flex-wrap justify-between gap-x-4 border-b border-line pb-3 last:border-0 last:pb-0">
                <dt>{h.days}</dt>
                <dd className="text-muted">{h.time}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div {...card(2)} className="md:col-span-3 lg:col-span-3">
          <Photo photo={photos.tulip} sizes="(min-width: 1024px) 300px, 50vw" className="frame--zoom aspect-square h-full rounded-[32px]!" />
        </motion.div>

        <motion.div {...card(3)} className="rounded-[32px] bg-blush p-8 md:col-span-3 lg:col-span-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-[22px] text-walnut">
            <i className="ri-truck-line" />
          </span>
          <h3 className="mt-6 text-[19px] font-medium">Consegne</h3>
          <p className="mt-2 text-ink/80">
            A domicilio a Paullo e nei paesi vicini. In tutta Italia con{' '}
            <a href={site.interflora} target="_blank" rel="noreferrer" className="u-draw font-medium text-walnut">
              Interflora
            </a>
            .
          </p>
        </motion.div>

        <motion.div {...card(4)} className="rounded-[32px] bg-sage-soft p-8 md:col-span-3 lg:col-span-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-[22px] text-sage">
            <i className="ri-leaf-line" />
          </span>
          <h3 className="mt-6 text-[19px] font-medium">Fine giornata</h3>
          <p className="mt-2 text-ink/80">
            I fiori rimasti vanno nelle box di{' '}
            <a href={site.tgtg} target="_blank" rel="noreferrer" className="u-draw font-medium text-sage">
              Too Good To Go
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────────────────── Order ───────────────────────── */

function Order() {
  return (
    <section id="ordina" aria-labelledby="ordina-title" className="bg-surface py-24 md:py-32">
      <div className="wrap">
        <div className="grid gap-10 rounded-[36px] bg-paper p-6 sm:p-10 lg:grid-cols-12 lg:gap-6 lg:p-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-4 text-[15px] font-medium text-walnut">Ordini</p>
              <h2 id="ordina-title" className="text-[clamp(36px,4.4vw,64px)] leading-[1.02]">
                Ordina un bouquet <em className="text-walnut">o una composizione</em>
              </h2>
              <p className="mt-5 max-w-[52ch] text-[18px] text-muted">
                Scrivici cosa ti serve e per quando: ti rispondiamo con una proposta e il prezzo.
              </p>
            </Reveal>
            <Reveal className="mt-10" delay={0.1}>
              <OrderForm />
            </Reveal>
          </div>
          <div className="relative hidden lg:col-span-4 lg:col-start-9 lg:block">
            <ClipReveal className="h-full" delay={0.2}>
              <Photo photo={photos.heroHands} sizes="420px" className="h-full min-h-[560px]" position="60% 50%" />
            </ClipReveal>
            <motion.div
              className="absolute -bottom-4 -left-8 rounded-[22px] bg-ink px-5 py-4 text-paper shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.7 }}
            >
              <p className="flex items-center gap-2 text-[15px]">
                <i className="ri-flower-line text-blush" /> Ogni mazzo è composto a mano
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Close ───────────────────────── */

function Close() {
  return (
    <section aria-labelledby="close-title" className="overflow-hidden bg-walnut pt-20 pb-10 text-paper md:pt-28">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 id="close-title" className="max-w-[16ch] text-[clamp(32px,3.6vw,52px)] leading-[1.05]">
              Le composizioni della settimana <em className="text-blush">su Instagram</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Magnetic>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="btn btn--light">
                <i className="ri-instagram-line" /> Segui {site.instagramHandle}
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
      <p aria-hidden="true" className="display mt-16 text-center text-[min(9.4vw,150px)] leading-[0.9] tracking-[-0.05em] whitespace-nowrap md:mt-24">
        <SplitLetters text="I fiori di Raffaella" />
      </p>
    </section>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = 'I fiori di Raffaella · Fiorista a Paullo dal 1995'
  }, [])
  return (
    <PageTransition>
      <Hero />
      <Ticker />
      <Story />
      <Services />
      <Weddings />
      <Gallery />
      <Visit />
      <Order />
      <Close />
    </PageTransition>
  )
}
