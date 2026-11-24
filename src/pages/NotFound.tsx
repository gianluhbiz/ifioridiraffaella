import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router'
import Photo from '../components/Photo'
import { PageTransition } from '../components/motion'
import { ease } from '../lib/ease'
import { photos } from '../data/photos'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Pagina non trovata · I fiori di Raffaella'
  }, [])

  return (
    <PageTransition>
      <section aria-labelledby="nf-title" className="flex min-h-[calc(100svh-72px)] items-center py-14" data-enter>
        <div className="wrap grid items-center gap-10 md:grid-cols-12 md:gap-6">
          <motion.div
            className="md:col-span-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-[clamp(72px,12vw,168px)] leading-none tracking-[-0.05em] text-walnut">404</p>
            <h1 id="nf-title" className="mt-4 text-[clamp(30px,3.6vw,44px)] leading-[1.1]">
              Questa pagina non è più in vaso
            </h1>
            <p className="mt-4 max-w-[40ch] text-[18px] text-muted">
              Il link è sbagliato o la pagina è stata spostata. I fiori sono tutti nella home.
            </p>
            <Link to="/" className="btn mt-8 w-full sm:w-auto">
              Torna alla home <i className="ri-arrow-right-line" />
            </Link>
          </motion.div>
          <motion.div
            className="md:col-span-5 md:col-start-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.15 }}
          >
            <Photo photo={photos.tulip} sizes="(min-width: 768px) 500px, 100vw" className="aspect-[4/3] md:aspect-square" />
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
