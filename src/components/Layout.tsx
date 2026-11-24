import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { site } from '../data/site'
import Intro from './Intro'
import Mark from './Mark'
import { ease } from '../lib/ease'

const links = [
  { to: '/#fiori', label: 'Fiori' },
  { to: '/matrimoni', label: 'Matrimoni' },
  { to: '/#visita', label: 'Visita' },
]

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // wait for the page transition to mount the new route before scrolling
    const t = window.setTimeout(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 0 })
      }
    }, 60)
    return () => window.clearTimeout(t)
  }, [pathname, hash])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // close the menu whenever the route or hash changes (state adjusted during render)
  const [routeKey, setRouteKey] = useState(location.key)
  if (routeKey !== location.key) {
    setRouteKey(location.key)
    setOpen(false)
  }
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="wrap flex h-[72px] items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <nav aria-label="Principale" className="hidden md:block">
          <ul className="flex gap-7">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className="u-draw inline-flex min-h-11 items-center text-[16px]">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/" aria-label={`${site.name}, home`} className="justify-self-start md:justify-self-center">
          <Mark />
        </Link>

        <div className="flex items-center justify-end gap-2">
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hidden h-11 w-11 items-center justify-center rounded-lg text-[22px] transition-colors hover:bg-surface md:inline-flex"
          >
            <i className="ri-instagram-line" />
          </a>
          <Link to="/#ordina" className="btn hidden md:inline-flex">
            Ordina un bouquet
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[24px] transition-colors hover:bg-surface active:scale-95 md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <i className={open ? 'ri-close-line' : 'ri-menu-line'} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 flex flex-col bg-paper md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
          >
            <nav aria-label="Menu" className="wrap flex flex-1 flex-col pt-8 pb-10">
              <ul className="flex flex-col">
                {[...links, { to: '/#ordina', label: 'Ordina' }].map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease, delay: 0.04 * i }}
                    className="border-b border-line"
                  >
                    <Link to={l.to} className="flex min-h-16 items-center justify-between text-[32px] tracking-[-0.02em]">
                      {l.label}
                      <i className="ri-arrow-right-line text-[22px] text-muted" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="link-arrow mt-auto">
                <i className="ri-instagram-line text-[20px]" /> {site.instagramHandle}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-surface pt-16 pb-28 md:pb-10">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Mark />
            <p className="mt-5 max-w-[34ch] text-muted">
              Fiorista a {site.town} dal {site.since}. Bouquet, composizioni, matrimoni ed eventi.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[15px] font-medium text-muted">Negozio</p>
            <p className="mt-4">{site.area}</p>
            <dl className="mt-4 grid gap-2" data-assumed="hours">
              {site.hours.map((h) => (
                <div key={h.days} className="flex flex-wrap justify-between gap-x-4">
                  <dt>{h.days}</dt>
                  <dd className="text-muted">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-3">
            <p className="text-[15px] font-medium text-muted">Contatti</p>
            <ul className="mt-3 grid">
              <li>
                <a href={`mailto:${site.email}`} className="u-draw inline-flex min-h-11 items-center break-all">
                  Scrivici una mail
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noreferrer" className="u-draw inline-flex min-h-11 items-center">
                  Instagram
                </a>
              </li>
              <li>
                <Link to="/matrimoni" className="u-draw inline-flex min-h-11 items-center">
                  Matrimoni ed eventi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[14px] text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name} ·{' '}
            <Link to="/crediti" className="u-draw inline-flex min-h-11 items-center md:min-h-0">
              Fotografie: autori e licenze
            </Link>
          </p>
          <p>
            Developed and Designed by{' '}
            <a href="https://gianluh.dev" target="_blank" rel="noreferrer" className="font-bold underline">
              Gianluca De Maio<i className="ri-external-link-line" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

/** Phone action bar: steps aside while the hero's own button is on screen. */
function MobileBar() {
  const { pathname } = useLocation()
  const [heroCta, setHeroCta] = useState(false)

  useEffect(() => {
    let io: IntersectionObserver | undefined
    const t = window.setTimeout(() => {
      const el = document.getElementById('hero-cta')
      if (!el) return setHeroCta(false)
      io = new IntersectionObserver(([e]) => setHeroCta(e.isIntersecting))
      io.observe(el)
    }, 80)
    return () => {
      window.clearTimeout(t)
      io?.disconnect()
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {!heroCta && (
        <motion.nav
          aria-label="Azioni rapide"
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper p-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease }}
        >
          <div className="flex gap-3">
            <Link to="/#ordina" className="btn flex-1">
              Ordina un bouquet <i className="ri-arrow-right-line" />
            </Link>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-line text-[22px] active:scale-95"
            >
              <i className="ri-instagram-line" />
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#contenuto"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-lg bg-ink px-4 py-3 text-paper focus:translate-y-0"
      >
        Vai al contenuto
      </a>
      <Intro />
      <ScrollManager />
      <Header />
      {children}
      <Footer />
      <MobileBar />
    </>
  )
}
