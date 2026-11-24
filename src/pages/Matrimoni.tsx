import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router'
import OrderForm from '../components/OrderForm'
import Photo from '../components/Photo'
import { ClipReveal, Magnetic, Marquee, RotatingWord, SpinBadge } from '../components/fx'
import { PageTransition, Reveal, WordsSettle } from '../components/motion'
import { ease } from '../lib/ease'
import { INTRO_DELAY } from '../lib/intro'
import { photos } from '../data/photos'

const D = INTRO_DELAY

const what = [
  { icon: 'ri-heart-2-line', title: 'Bouquet della sposa', text: 'Con i fiori che scegli tu, più le bottoniere per lo sposo e i testimoni.' },
  { icon: 'ri-ancient-gate-line', title: 'Chiesa o municipio', text: 'Composizioni per l’altare, i banchi e l’ingresso.' },
  { icon: 'ri-restaurant-2-line', title: 'Ricevimento', text: 'Centrotavola, tavolo degli sposi e angoli della sala.' },
  { icon: 'ri-graduation-cap-line', title: 'Lauree e feste', text: 'Corone d’alloro e allestimenti per feste private e cene.' },
]

const steps = [
  { n: '01', title: 'Ci vediamo in negozio', text: 'Porti foto, colori, il luogo e la data. Guardiamo insieme cosa offre la stagione.' },
  { n: '02', title: 'Ricevi il progetto', text: 'Un documento con i fiori scelti, le composizioni una per una e il prezzo finale.' },
  { n: '03', title: 'Allestiamo noi', text: 'Prepariamo tutto in bottega e allestiamo chiesa e sala prima degli invitati.' },
]

function Hero() {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay: D + delay },
  })
  return (
    <section aria-labelledby="m-title" className="relative flex min-h-[calc(100svh-72px)] items-center pt-10 pb-20 lg:py-12" data-enter>
      <div className="wrap grid items-center gap-16 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[15px]">
            <i className="ri-heart-2-fill text-walnut" /> Matrimoni ed eventi a Paullo
          </motion.p>

          <h1 id="m-title" className="mt-6 text-[clamp(46px,7vw,108px)] leading-[0.98]">
            {['Fiori per il', 'vostro'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, ease, delay: D + 0.05 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.em
                className="block text-walnut"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease, delay: D + 0.25 }}
              >
                matrimonio
              </motion.em>
            </span>
          </h1>

          <motion.p {...rise(0.4)} className="display mt-5 text-[clamp(24px,2.6vw,36px)] leading-tight text-muted">
            <RotatingWord className="text-ink italic" words={['nel bouquet', 'in chiesa', 'al ricevimento', 'sul tavolo degli sposi']} />
          </motion.p>

          <motion.p {...rise(0.5)} className="mt-6 max-w-[48ch] text-[18px] leading-[1.6] text-muted">
            Raffaella Medioli segue ogni matrimonio dal primo incontro all’allestimento, a Paullo e nei comuni del sud-est
            milanese.
          </motion.p>

          <motion.div {...rise(0.6)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <a id="hero-cta" href="#richiesta" className="btn w-full sm:w-auto">
                Fissa un incontro <i className="ri-arrow-right-line" />
              </a>
            </Magnetic>
            <Link to="/#fiori" className="btn btn--ghost">
              Tutti i fiori del negozio
            </Link>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5">
          <ClipReveal onLoad delay={D + 0.2} className="relative ml-auto w-[86%] sm:w-[70%] lg:w-[88%]">
            <Photo photo={photos.brideTwo} priority sizes="(min-width: 1024px) 480px, 80vw" className="aspect-[4/5]" />
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
              <Photo photo={photos.table} sizes="240px" className="aspect-[3/4]" />
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute top-[-4%] left-[6%] sm:left-[14%] lg:left-[-2%]"
            initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease, delay: D + 0.9 }}
          >
            <SpinBadge text="MATRIMONI · EVENTI · PAULLO · " className="h-24 w-24 sm:h-32 sm:w-32" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Ticker() {
  const items = ['Bouquet della sposa', 'Bottoniere', 'Chiesa', 'Municipio', 'Centrotavola', 'Ricevimento', 'Lauree', 'Feste']
  return (
    <div className="bg-ink py-5 text-paper md:py-7">
      <Marquee speed={44}>
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

function What() {
  return (
    <section aria-labelledby="cosa-title" className="py-24 md:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="mb-4 text-[15px] font-medium text-walnut">Cosa curiamo</p>
            <h2 id="cosa-title" className="text-[clamp(40px,5.4vw,80px)] leading-[1]">
              Dal bouquet <em className="text-walnut">all’ultimo tavolo</em>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-[18px] text-muted">Un solo progetto per tutti i fiori del giorno, scelti per stare bene insieme.</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <Photo photo={photos.bride} develops sizes="(min-width: 1024px) 500px, 100vw" className="aspect-[4/5] h-full" position="50% 40%" />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-6">
            {what.map((w, i) => (
              <motion.li
                key={w.title}
                className={`group flex flex-col justify-between rounded-[32px] p-7 transition-transform duration-300 hover:-translate-y-0.5 md:p-8 ${
                  i === 0 ? 'bg-walnut text-paper' : i === 3 ? 'bg-sage-soft' : i === 1 ? 'bg-blush' : 'bg-surface'
                }`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease, delay: 0.08 * i }}
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-full text-[22px] transition-transform duration-500 group-hover:rotate-[20deg] ${
                    i === 0 ? 'bg-paper/15 text-paper' : 'bg-paper text-walnut'
                  }`}
                >
                  <i className={w.icon} />
                </span>
                <div className="mt-14">
                  <h3 className="display text-[clamp(26px,2.4vw,34px)] leading-[1.1]">{w.title}</h3>
                  <p className={`mt-2 ${i === 0 ? 'text-paper/80' : 'text-ink/75'}`}>{w.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function How() {
  return (
    <section aria-labelledby="come-title" className="overflow-hidden bg-night py-24 text-paper md:py-32">
      <div className="wrap">
        <Reveal>
          <p className="mb-4 text-[15px] font-medium text-blush">Come lavoriamo</p>
          <h2 id="come-title" className="max-w-[14ch] text-[clamp(40px,5.4vw,80px)] leading-[1]">
            Tre passi, <em className="text-blush">nessuna sorpresa</em>
          </h2>
        </Reveal>

        <div className="relative mt-14 md:mt-20">
          {/* the line that joins the steps draws once in view */}
          <motion.span
            aria-hidden="true"
            className="absolute top-7 right-0 left-0 hidden h-px origin-left bg-paper/25 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease }}
          />
          <ol className="relative grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease, delay: 0.15 + 0.12 * i }}
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-blush text-[16px] font-medium text-ink tabular-nums">
                  {s.n}
                </span>
                <div className="mt-8 rounded-[28px] border border-paper/10 bg-paper/[0.04] p-7 transition-colors duration-300 hover:bg-paper/[0.08] md:p-8">
                  <h3 className="display text-[clamp(26px,2.4vw,34px)] leading-[1.1]">{s.title}</h3>
                  <p className="mt-3 text-paper/75">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Statement() {
  return (
    <section aria-labelledby="st-title" className="py-24 md:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="lg:col-span-7">
          <h2 id="st-title" className="sr-only">
            Il primo incontro
          </h2>
          <WordsSettle
            moment="word-highlight"
            className="display text-[clamp(30px,3.8vw,54px)] leading-[1.14]"
            text="Ogni matrimonio parte da un incontro in negozio a Paullo, con i fiori della stagione sul banco."
            strong={['incontro', 'Paullo']}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:col-start-9">
          <ClipReveal>
            <Photo photo={photos.vase} sizes="(min-width: 1024px) 200px, 45vw" className="aspect-[3/4]" />
          </ClipReveal>
          <ClipReveal delay={0.15} className="mt-10">
            <Photo photo={photos.jug} sizes="(min-width: 1024px) 200px, 45vw" className="aspect-[3/4]" position="50% 60%" />
          </ClipReveal>
        </div>
      </div>
    </section>
  )
}

function Request() {
  return (
    <section id="richiesta" aria-labelledby="richiesta-title" className="bg-surface py-24 md:py-32">
      <div className="wrap">
        <div className="grid gap-10 rounded-[36px] bg-paper p-6 sm:p-10 lg:grid-cols-12 lg:gap-6 lg:p-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-4 text-[15px] font-medium text-walnut">Primo incontro</p>
              <h2 id="richiesta-title" className="text-[clamp(36px,4.4vw,64px)] leading-[1.02]">
                Raccontaci <em className="text-walnut">il vostro matrimonio</em>
              </h2>
              <p className="mt-5 max-w-[52ch] text-[18px] text-muted">Data, luogo e qualche idea sui colori bastano per iniziare.</p>
            </Reveal>
            <Reveal className="mt-10" delay={0.1}>
              <OrderForm defaultOccasion="Matrimonio" />
            </Reveal>
          </div>
          <div className="relative hidden lg:col-span-4 lg:col-start-9 lg:block">
            <ClipReveal className="h-full" delay={0.2}>
              <Photo photo={photos.table} sizes="420px" className="h-full min-h-[560px]" />
            </ClipReveal>
            <motion.div
              className="absolute -bottom-4 -left-8 rounded-[22px] bg-ink px-5 py-4 text-paper shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.7 }}
            >
              <p className="flex items-center gap-2 text-[15px]">
                <i className="ri-calendar-event-line text-blush" /> Meglio qualche mese prima
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Matrimoni() {
  useEffect(() => {
    document.title = 'Fiori per matrimoni ed eventi a Paullo · I fiori di Raffaella'
  }, [])
  return (
    <PageTransition>
      <Hero />
      <Ticker />
      <What />
      <How />
      <Statement />
      <Request />
    </PageTransition>
  )
}
