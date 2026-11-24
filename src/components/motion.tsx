import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from '../lib/ease'


type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number; children: ReactNode }

/** Rises once when it comes into view. Never tied to scroll position. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** A statement whose words settle from half ink to ink, once, when it enters the view. */
export function WordsSettle({ text, strong = [], className, moment }: { text: string; strong?: string[]; className?: string; moment?: string }) {
  const words = text.split(' ')
  return (
    <motion.p
      className={className}
      data-moment={moment}
      initial="rest"
      whileInView="on"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.045 }}
    >
      {words.map((w, i) => {
        const isStrong = strong.includes(w.replace(/[.,:;]/g, ''))
        return (
          <motion.span
            key={i}
            className={isStrong ? 'text-walnut' : undefined}
            variants={{ rest: { opacity: 0.28 }, on: { opacity: 1 } }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        )
      })}
    </motion.p>
  )
}

/** Page transition: a soft fade and lift between routes. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main
      id="contenuto"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease }}
    >
      {children}
    </motion.main>
  )
}
