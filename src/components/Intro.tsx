import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ease } from '../lib/ease'
import { INTRO_KEY as KEY } from '../lib/intro'

/** First visit of the session: the name rises, then the panel lifts off the page. ~1.6 s. */
export default function Intro() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem(KEY)
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (!show) return
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* private mode */
    }
    const t = window.setTimeout(() => setShow(false), reduce ? 200 : 1500)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(t)
      document.documentElement.style.overflow = ''
    }
  }, [show, reduce])

  const words = ['I', 'fiori', 'di', 'Raffaella']

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center bg-walnut text-paper"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease }}
          aria-hidden="true"
        >
          <div className="flex flex-wrap justify-center gap-x-[0.28em] px-6 font-[family-name:var(--font-display)] text-[clamp(44px,9vw,128px)] leading-none tracking-[-0.035em]">
            {words.map((w, i) => (
              <span key={w} className="overflow-hidden pb-[0.1em]">
                <motion.span
                  className={`inline-block ${w === 'fiori' ? 'italic' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.09 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </div>
          <motion.p
            className="absolute bottom-10 text-[14px] tracking-[0.2em] text-paper/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            PAULLO · DAL 1995
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
