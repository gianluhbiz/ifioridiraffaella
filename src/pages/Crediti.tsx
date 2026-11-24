import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { PageTransition } from '../components/motion'
import { ease } from '../lib/ease'
import credits from '../data/credits.json'

export default function Crediti() {
  useEffect(() => {
    document.title = 'Fotografie: autori e licenze · I fiori di Raffaella'
  }, [])

  return (
    <PageTransition>
      <section aria-labelledby="c-title" className="min-h-[70svh] py-14 md:py-20" data-enter>
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-6">
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <h1 id="c-title" className="text-[clamp(32px,4vw,48px)] leading-[1.08]">
              Fotografie: autori e licenze
            </h1>
            <p className="mt-5 text-muted">Le fotografie del sito vengono da Wikimedia Commons, con queste licenze.</p>
          </motion.div>
          <ul className="border-t border-line md:col-span-8">
            {credits.map((c, i) => (
              <motion.li
                key={c.id}
                className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.1 + 0.03 * i }}
              >
                <a href={c.page} target="_blank" rel="noreferrer" className="u-draw min-w-0 break-words">
                  {c.by}
                </a>
                <a href={c.licenceUrl} target="_blank" rel="noreferrer" className="u-draw text-muted">
                  {c.licence}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  )
}
