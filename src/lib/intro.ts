export const INTRO_KEY = 'ifdr-intro'

/** Seconds the hero waits so its entrance plays after the intro panel lifts (0 after the first visit). */
export const INTRO_DELAY = (() => {
  try {
    return sessionStorage.getItem(INTRO_KEY) || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.35
  } catch {
    return 0
  }
})()
