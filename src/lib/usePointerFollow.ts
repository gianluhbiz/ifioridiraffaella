import { useMotionValue, useSpring } from 'framer-motion'

/** Spring-smoothed pointer coordinates for a follower element (hover lists). */
export function usePointerFollow() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })
  return { x, y, sx, sy }
}
