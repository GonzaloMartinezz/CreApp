import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  cubicBezier,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* ─── Default editorial images (Unsplash) ──────────────────────────────── */

export const DEFAULT_GRID_IMAGES: readonly string[] = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
  'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=600&q=80',
  'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&q=80',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80',
  'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=600&q=80',
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
]

/* ─── Easing ────────────────────────────────────────────────────────────── */

const easeIntoFocus  = cubicBezier(0.22, 1, 0.36, 1)
const easeOutOfFocus = cubicBezier(0, 0, 0.58, 1)
const focusEase = [easeIntoFocus, easeOutOfFocus]

/* ─── Types ─────────────────────────────────────────────────────────────── */

type Side = 'L' | 'R'

interface TileConfig {
  aspectRatio: string
  perspective: number
  maxTilt: number
  maxBlur: number
  rounded: string
}

/* ─── Tile ──────────────────────────────────────────────────────────────── */

function Tile({ src, side, config }: { src: string; side: Side; config: TileConfig }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const reduce = useReducedMotion()
  const sign = side === 'L' ? -1 : 1
  const { aspectRatio, perspective, maxTilt, maxBlur, rounded } = config

  const blur     = useTransform(p, [0, 0.5, 1], [maxBlur, 0, maxBlur],              { ease: focusEase })
  const bright   = useTransform(p, [0, 0.5, 1], [0, 1, 0],                          { ease: focusEase })
  const contrast = useTransform(p, [0, 0.5, 1], [4, 1, 4],                          { ease: focusEase })
  const ty       = useTransform(p, [0, 0.5, 1], ['100%', '0%', '-100%'],            { ease: focusEase })
  const tz       = useTransform(p, [0, 0.5, 1], [300, 0, 300],                      { ease: focusEase })
  const rx       = useTransform(p, [0, 0.5, 1], [maxTilt, 0, -maxTilt],             { ease: focusEase })
  const tx       = useTransform(p, [0, 0.5, 1], [`${sign * 40}%`, '0%', `${sign * 40}%`], { ease: focusEase })
  const rot      = useTransform(p, [0, 0.5, 1], [-sign * 5, 0, sign * 5],           { ease: focusEase })
  const sk       = useTransform(p, [0, 0.5, 1], [sign * 20, 0, -sign * 20],         { ease: focusEase })
  const innerSY  = useTransform(p, [0, 0.5, 1], [1.8, 1, 1.8],                      { ease: focusEase })
  const filter   = useMotionTemplate`blur(${blur as MotionValue<number>}px) brightness(${bright as MotionValue<number>}) contrast(${contrast as MotionValue<number>})`

  if (reduce) {
    return (
      <figure ref={ref} className="relative z-10 m-0">
        <div
          className="relative w-full overflow-hidden bg-cover bg-center"
          style={{ aspectRatio, borderRadius: rounded }}
        >
          <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
      </figure>
    )
  }

  return (
    <motion.figure
      ref={ref}
      className="relative z-10 m-0"
      style={{ perspective, willChange: 'transform' }}
    >
      <motion.div
        className="relative w-full overflow-hidden will-change-[filter,transform]"
        style={{ aspectRatio, borderRadius: rounded, filter, x: tx, y: ty, z: tz, rotate: rot, rotateX: rx, skewX: sk }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url("${src}")`, scaleY: innerSY, backfaceVisibility: 'hidden' }}
        />
      </motion.div>
    </motion.figure>
  )
}

/* ─── ScrollTiltedGrid ──────────────────────────────────────────────────── */

export type MaxWidthToken = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'none'
export type GapToken = 4 | 6 | 8 | 10 | 12 | 14

const MAX_WIDTH_MAP: Record<MaxWidthToken, string> = {
  sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl',
  '2xl': 'max-w-2xl', '3xl': 'max-w-3xl', none: '',
}

const GAP_MAP: Record<GapToken, string> = {
  4: 'gap-4', 6: 'gap-6', 8: 'gap-8', 10: 'gap-10', 12: 'gap-12', 14: 'gap-14',
}

export interface ScrollTiltedGridProps {
  images?: readonly string[]
  loop?: boolean
  initialCycles?: number
  aspectRatio?: string
  maxWidth?: MaxWidthToken
  gap?: GapToken
  perspective?: number
  maxTilt?: number
  maxBlur?: number
  rounded?: string
  className?: string
}

export function ScrollTiltedGrid({
  images = DEFAULT_GRID_IMAGES,
  loop = false,
  initialCycles = 3,
  aspectRatio = '3/4',
  maxWidth = 'lg',
  gap = 10,
  perspective = 900,
  maxTilt = 70,
  maxBlur = 8,
  rounded = '0.375rem',
  className,
}: ScrollTiltedGridProps = {}) {
  const [cycles, setCycles] = useState(loop ? initialCycles : 1)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loop) return
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) setCycles((c) => c + 2) },
      { rootMargin: '1500px 0px 1500px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [loop])

  const items = useMemo(
    () => (loop ? Array.from({ length: cycles }, () => images).flat() : [...images]),
    [loop, cycles, images],
  )

  const config = useMemo<TileConfig>(
    () => ({ aspectRatio, perspective, maxTilt, maxBlur, rounded }),
    [aspectRatio, perspective, maxTilt, maxBlur, rounded],
  )

  return (
    <section className={cn('relative w-full', className)}>
      <div
        className={cn(
          'mx-auto mt-[20vh] mb-[10vh] grid w-full grid-cols-2 px-6 py-[20vh]',
          MAX_WIDTH_MAP[maxWidth],
          GAP_MAP[gap],
        )}
      >
        {items.map((src, i) => (
          <Tile key={`${i}-${src}`} src={src} side={i % 2 === 0 ? 'L' : 'R'} config={config} />
        ))}
      </div>
      {loop ? <div ref={sentinelRef} aria-hidden className="h-px w-full" /> : null}
    </section>
  )
}

export default ScrollTiltedGrid
