import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ease } from '../lib/ease'

/** One word that changes every 2.6 s, rising out of a mask. */
export function RotatingWord({ words, className = '' }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setI((n) => (n + 1) % words.length), 2600)
    return () => window.clearInterval(t)
  }, [words.length, reduce])

  return (
    <span className={`relative inline-grid overflow-hidden pb-[0.12em] align-bottom ${className}`}>
      {/* the longest word reserves the width so the line never jumps */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1"
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-105%', opacity: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Infinite strip of items; pauses on hover. */
export function Marquee({ children, speed = 38, className = '' }: { children: ReactNode; speed?: number; className?: string }) {
  return (
    <div className={`marquee-wrap overflow-hidden ${className}`}>
      <div className="marquee" style={{ ['--marquee-speed' as string]: `${speed}s` }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}

/** Round badge with text running on a circle, turning slowly. */
export function SpinBadge({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`relative grid h-32 w-32 place-items-center rounded-full bg-blush text-ink ${className}`}>
      <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text fontSize="9.4" fontWeight="500" letterSpacing="2.2" fill="currentColor">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <i className="ri-flower-line text-[30px] text-walnut" />
      <span className="sr-only">{text}</span>
    </div>
  )
}

/** Counts up once when it comes into view. */
export function Counter({ to, from = 0, className = '' }: { to: number; from?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : from)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(from, to, { duration: 1.8, ease, onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, from, to, reduce])
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {val}
    </span>
  )
}

/** Letters rise one by one when the line enters the view. */
export function SplitLetters({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="rest"
      whileInView="on"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.035, delayChildren: delay }}
      aria-label={text}
    >
      {text.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{ rest: { y: '110%' }, on: { y: '0%' } }}
            transition={{ duration: 0.9, ease }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Wraps a block; on a mouse it leans 6px toward the pointer and springs back. */
export function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 })
  const sy = useSpring(y, { stiffness: 220, damping: 16 })
  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        x.set(((e.clientX - r.left) / r.width - 0.5) * 12)
        y.set(((e.clientY - r.top) / r.height - 0.5) * 12)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** A clip-path reveal for photographs, once, when in view (or on load with `onLoad`). */
export function ClipReveal({
  children,
  className = '',
  delay = 0,
  onLoad = false,
  from = 'bottom',
}: {
  children: ReactNode
  className?: string
  delay?: number
  onLoad?: boolean
  from?: 'bottom' | 'left'
}) {
  const hidden = from === 'bottom' ? 'inset(100% 0% 0% 0% round 20px)' : 'inset(0% 100% 0% 0% round 20px)'
  const shown = 'inset(0% 0% 0% 0% round 20px)'
  const common = {
    className,
    initial: { clipPath: hidden },
    transition: { duration: 1.2, ease, delay },
  }
  return onLoad ? (
    <motion.div {...common} animate={{ clipPath: shown }}>
      {children}
    </motion.div>
  ) : (
    <motion.div {...common} whileInView={{ clipPath: shown }} viewport={{ once: true, amount: 0.3 }}>
      {children}
    </motion.div>
  )
}
