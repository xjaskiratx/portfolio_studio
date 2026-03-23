// ── Browser & device detection ──────────────────────────────────────────
// Import these constants wherever you need browser-conditional behaviour.
// All are safe to call client-side only — wrap in useEffect or check window.

export const isSafari =
  typeof window !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export const isIOSSafari =
  typeof window !== 'undefined' &&
  /iP(ad|hone|od)/.test(navigator.userAgent) &&
  /WebKit/.test(navigator.userAgent) &&
  !('MSStream' in window)

export const isTouch =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

export const isMobile =
  typeof window !== 'undefined' &&
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Safari version — useful for targeting specific Safari bugs
export function getSafariVersion(): number {
  if (!isSafari) return 0
  const match = navigator.userAgent.match(/Version\/(\d+)/)
  return match ? parseInt(match[1]) : 0
}

// Feature detection (better than UA sniffing where possible)
export const supportsBackdropFilter =
  typeof CSS !== 'undefined' &&
  (CSS.supports('backdrop-filter', 'blur(1px)') ||
   CSS.supports('-webkit-backdrop-filter', 'blur(1px)'))

export const supportsMixBlendMode =
  typeof CSS !== 'undefined' &&
  CSS.supports('mix-blend-mode', 'difference')

export const supportsInset =
  typeof CSS !== 'undefined' &&
  CSS.supports('inset', '0')
