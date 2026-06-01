import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

/* ─── Visual styles ─────────────────────────────────────────────────────── */
const EFFECT_STYLES = `
  .ch-film-grain {
    position: absolute; inset: 0; pointer-events: none; z-index: 2;
    opacity: 0.045; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
  }

  .ch-dot-grid {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background-image: radial-gradient(circle, rgba(0, 245, 212, 0.12) 1px, transparent 1px);
    background-size: 30px 30px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
  }

  .ch-silver-text {
    background: linear-gradient(175deg, #FFFFFF 0%, rgba(250,250,250,0.45) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 6px 16px rgba(255,255,255,0.08));
  }

  .ch-iphone-shell {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #52525B,
      inset 0 0 0 7px #000,
      0 60px 120px -15px rgba(0,0,0,0.99),
      0 25px 40px -5px rgba(0,0,0,0.8);
  }

  .ch-hw-side {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8),
      inset -1px 0 1px rgba(255,255,255,0.15),
      inset  1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.05);
  }

  .ch-screen-glare {
    background: linear-gradient(112deg, rgba(255,255,255,0.07) 0%, transparent 45%);
  }

  .ch-app-widget {
    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow: 0 8px 16px rgba(0,0,0,0.25),
      inset 0  1px 1px rgba(255,255,255,0.05),
      inset 0 -1px 1px rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.04);
  }

  .ch-float-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.1),
      0 20px 40px -10px rgba(0,0,0,0.85),
      inset 0  1px 1px rgba(255,255,255,0.18),
      inset 0 -1px 1px rgba(0,0,0,0.4);
  }

  .ch-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
  }

  .ch-btn-light {
    font-family: inherit; font-weight: 700; border: none; cursor: pointer;
    background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
    color: #0F172A;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1),
      0 12px 24px -4px rgba(0,0,0,0.28),
      inset 0  1px 1px rgba(255,255,255,1),
      inset 0 -3px 6px rgba(0,0,0,0.05);
    transition: all 0.35s cubic-bezier(0.25,1,0.5,1);
  }
  .ch-btn-light:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 8px 16px -2px rgba(0,0,0,0.16),
      0 24px 40px -8px rgba(0,0,0,0.38),
      inset 0  1px 1px rgba(255,255,255,1),
      inset 0 -3px 6px rgba(0,0,0,0.05);
  }
  .ch-btn-light:active { transform: translateY(1px); background: #E2E8F0; }

  .ch-btn-dark {
    font-family: inherit; font-weight: 700; border: none; cursor: pointer;
    background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
    color: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.09), 0 2px 4px rgba(0,0,0,0.55),
      0 12px 24px -4px rgba(0,0,0,0.88),
      inset 0  1px 1px rgba(255,255,255,0.14),
      inset 0 -3px 6px rgba(0,0,0,0.75);
    transition: all 0.35s cubic-bezier(0.25,1,0.5,1);
  }
  .ch-btn-dark:hover {
    transform: translateY(-3px);
    background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.13), 0 8px 16px -2px rgba(0,0,0,0.65),
      0 24px 40px -8px rgba(0,0,0,1),
      inset 0  1px 1px rgba(255,255,255,0.18),
      inset 0 -3px 6px rgba(0,0,0,0.75);
  }
  .ch-btn-dark:active { transform: translateY(1px); background: #18181B; }
`

/* ─── Props ─────────────────────────────────────────────────────────────── */
export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?:      string
  tagline1?:       string
  tagline2?:       string
  cardHeading?:    string
  metricValue?:    number
  metricLabel?:    string
  ctaHeading?:     string
  ctaDescription?: string
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export function CinematicHero({
  brandName      = 'CreAPP',
  tagline1       = 'Creamos tu app ideal',
  tagline2       = 'para tus clientes.',
  cardHeading    = 'Experiencias digitales, redefinidas.',
  metricValue    = 50,
  metricLabel    = 'Apps Lanzadas',
  ctaHeading     = 'Empezá tu proyecto.',
  ctaDescription = 'Sin compromisos — solo buenas ideas y ejecución impecable.',
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mockupRef    = useRef<HTMLDivElement>(null)
  const rafRef       = useRef<number>(0)

  /* ── Mouse 3-D tilt on phone ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 3) return
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!mockupRef.current) return
        const xv = (e.clientX / window.innerWidth  - 0.5) * 2
        const yv = (e.clientY / window.innerHeight - 0.5) * 2
        gsap.to(mockupRef.current, {
          rotationY: xv * 12, rotationX: -yv * 12,
          ease: 'power3.out', duration: 1.4,
        })
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* ── Scroll timeline ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* — Initial states — */
      gsap.set('.ch-t1',      { autoAlpha: 0, y: 55, filter: 'blur(18px)' })
      gsap.set('.ch-t2',      { autoAlpha: 0, y: 55, filter: 'blur(18px)' })
      gsap.set('.ch-subdesc', { autoAlpha: 0, y: 24 })
      gsap.set('.ch-phone',   { autoAlpha: 0, y: 130, rotationX: 48, z: -350, scale: 0.78 })
      gsap.set('.ch-widget',  { autoAlpha: 0, y: 28, scale: 0.88 })
      gsap.set('.ch-badge',   { autoAlpha: 0, y: 65, scale: 0.6, rotationZ: -10 })
      gsap.set('.ch-brand',   { autoAlpha: 0, x: 55 })
      gsap.set('.ch-cta',     { autoAlpha: 0, scale: 0.88, filter: 'blur(24px)' })

      /* — On-load intro (no scroll needed) — */
      gsap.timeline({ delay: 0.25 })
        .to('.ch-t1',      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' })
        .to('.ch-t2',      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' }, '-=0.9')
        .to('.ch-subdesc', { autoAlpha: 1, y: 0, duration: 1,         ease: 'power3.out' }, '-=0.7')

      /* — Scroll-driven timeline (one pinned section, everything inside) — */
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top', end: '+=5500',
          pin: true, scrub: 1, anticipatePin: 1,
        },
      })
        /* Phone rises in with 3-D spin */
        .to('.ch-phone', {
          autoAlpha: 1, y: 0, rotationX: 0, z: 0, scale: 1,
          ease: 'expo.out', duration: 2.5,
        }, 0)
        /* Widgets stagger in */
        .to('.ch-widget', {
          autoAlpha: 1, y: 0, scale: 1,
          stagger: 0.12, ease: 'back.out(1.3)', duration: 1.5,
        }, '-=1.6')
        /* Ring fills + counter counts */
        .to('.ch-ring',    { strokeDashoffset: 55, duration: 2, ease: 'power3.inOut' }, '-=1.2')
        .to('.ch-counter', { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: 'expo.out' }, '<')
        /* Badges pop in */
        .to('.ch-badge', {
          autoAlpha: 1, y: 0, scale: 1, rotationZ: 0,
          stagger: 0.2, ease: 'back.out(1.6)', duration: 1.4,
        }, '-=1.6')
        /* Brand name slides in */
        .to('.ch-brand', { autoAlpha: 1, x: 0, ease: 'power4.out', duration: 1.5 }, '-=1.2')
        /* Hold — all visible */
        .to({}, { duration: 2.8 })
        /* Fade everything out */
        .to(['.ch-t1', '.ch-t2', '.ch-subdesc', '.ch-phone', '.ch-badge', '.ch-widget', '.ch-brand', '.ch-dot-grid'], {
          autoAlpha: 0, scale: 0.94, filter: 'blur(8px)',
          ease: 'power2.in', duration: 1.2,
        })
        /* CTA appears */
        .to('.ch-cta', {
          autoAlpha: 1, scale: 1, filter: 'blur(0px)',
          ease: 'expo.out', duration: 1.8,
        }, '-=0.4')
        /* Hold CTA */
        .to({}, { duration: 2 })

    }, containerRef)

    return () => ctx.revert()
  }, [metricValue])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-screen w-screen items-center justify-center overflow-hidden antialiased',
        className,
      )}
      style={{
        background: 'linear-gradient(145deg, #1f0a02 0%, #020b12 50%, #030107 100%)',
        perspective: '1400px',
        fontFamily: 'var(--font-sans)',
        color: '#fafafa',
      }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: EFFECT_STYLES }} />
      <div className="ch-film-grain" aria-hidden />
      <div className="ch-dot-grid"   aria-hidden />

      {/* ── 3-column grid (left: text | center: phone | right: brand) ── */}
      <div className="relative z-10 grid h-full w-full max-w-[1400px] grid-cols-1 items-center gap-6 px-[4vw] py-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:py-0">

        {/* ── Col 1 · Taglines + description ── */}
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <p className="mb-4 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-accent">
            {brandName} — Studio
          </p>
          <h1 className="ch-t1 ch-silver-text text-[clamp(2.6rem,5.5vw,5rem)] font-black leading-[0.92] tracking-[-0.03em]">
            {tagline1}
          </h1>
          <h1 className="ch-t2 ch-silver-text text-[clamp(2.6rem,5.5vw,5rem)] font-black leading-[0.92] tracking-[-0.03em]">
            {tagline2}
          </h1>
          <p className="ch-subdesc mt-5 max-w-[34ch] text-[clamp(0.85rem,1.25vw,1rem)] leading-relaxed text-neutral-400">
            {cardHeading}
          </p>
        </div>

        {/* ── Col 2 · iPhone mockup ── */}
        <div
          className="ch-phone order-1 relative flex h-[310px] items-center justify-center lg:order-2 lg:h-[560px]"
          style={{ perspective: '1200px' }}
        >
          <div
            ref={mockupRef}
            className="ch-iphone-shell relative flex h-[540px] w-[260px] shrink-0 flex-col rounded-[3rem]"
            style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
          >
            {/* Hardware side buttons */}
            {[
              { side: 'left',  top: 118, h: 24 },
              { side: 'left',  top: 158, h: 44 },
              { side: 'left',  top: 218, h: 44 },
              { side: 'right', top: 168, h: 68 },
            ].map(({ side, top, h }, i) => (
              <div
                key={i}
                className={`ch-hw-side absolute w-[3px] ${
                  side === 'left'
                    ? '-left-[3px] rounded-l-sm'
                    : '-right-[3px] scale-x-[-1] rounded-r-sm'
                }`}
                style={{ top, height: h }}
                aria-hidden
              />
            ))}

            {/* Screen */}
            <div className="absolute inset-[7px] z-10 overflow-hidden rounded-[2.5rem] bg-[#07040d] text-white shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
              <div className="ch-screen-glare absolute inset-0 z-40 pointer-events-none" aria-hidden />

              {/* Dynamic island */}
              <div className="absolute left-1/2 top-[5px] z-50 flex h-[28px] w-[94px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              </div>

              {/* App content */}
              <div className="flex h-full flex-col px-5 pb-8 pt-12">
                {/* Top bar */}
                <div className="ch-widget mb-6 flex items-center justify-between">
                  <div>
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Hoy</p>
                    <p className="text-xl font-bold tracking-tight">Proyectos</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-bold shadow-lg shadow-black/50">
                    CA
                  </div>
                </div>

                {/* Ring counter */}
                <div
                  className="ch-widget relative mx-auto mb-6 flex h-44 w-44 items-center justify-center"
                  style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.9))' }}
                >
                  <svg className="absolute inset-0 h-full w-full" aria-hidden>
                    <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="12" />
                    <circle className="ch-ring" cx="88" cy="88" r="64" fill="none" stroke="var(--color-primary-2)" strokeWidth="12" />
                  </svg>
                  <div className="z-10 flex flex-col items-center text-center">
                    <span className="ch-counter text-4xl font-extrabold tracking-[-0.04em] text-white">0</span>
                    <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-accent">
                      {metricLabel}
                    </span>
                  </div>
                </div>

                {/* App widgets */}
                {[
                  { color: 'rgba(255,122,0', stroke: '#ff7a00', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', wL: 16, wD: 12 },
                  { color: 'rgba(0,245,212',  stroke: '#00f5d4', d: 'M5 13l4 4L19 7', wL: 14, wD: 20 },
                ].map(({ color, stroke, d, wL, wD }, wi) => (
                  <div key={wi} className="ch-widget ch-app-widget mb-2.5 flex items-center rounded-2xl p-3 last:mb-0">
                    <div
                      className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                      style={{
                        background:   `linear-gradient(135deg, ${color},0.18) 0%, ${color},0.05) 100%)`,
                        borderColor: `${color},0.2)`,
                      }}
                    >
                      <svg className="h-4 w-4" style={{ color: stroke }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div style={{ height: 8, width: `${wL * 4}px` }} className="mb-2 rounded-full bg-neutral-300" />
                      <div style={{ height: 6, width: `${wD * 4}px` }} className="rounded-full bg-neutral-600" />
                    </div>
                  </div>
                ))}

                {/* Home bar */}
                <div className="absolute bottom-2 left-1/2 h-[4px] w-[110px] -translate-x-1/2 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          {/* ── Floating glass badges (relative to phone column) ── */}
          <div className="ch-badge ch-float-badge absolute -left-2 top-8 flex items-center gap-3 rounded-2xl p-3 lg:-left-20 lg:top-16">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-gradient-to-b from-accent/20 to-accent/5 text-xl">
              🚀
            </div>
            <div>
              <p className="whitespace-nowrap text-[13px] font-bold text-white">App Lanzada</p>
              <p className="text-[11px] text-accent/70">Entrega exitosa</p>
            </div>
          </div>

          <div className="ch-badge ch-float-badge absolute -right-2 bottom-14 flex items-center gap-3 rounded-2xl p-3 lg:-right-20 lg:bottom-20">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-3/30 bg-gradient-to-b from-accent-3/20 to-accent-3/5 text-xl">
              ⭐
            </div>
            <div>
              <p className="whitespace-nowrap text-[13px] font-bold text-white">98% Satisfacción</p>
              <p className="text-[11px] text-accent-3/70">Clientes felices</p>
            </div>
          </div>
        </div>

        {/* ── Col 3 · Brand name ── */}
        <div className="ch-brand order-3 flex flex-col items-end justify-center text-right">
          <h2
            className="text-[clamp(3rem,7vw,7.5rem)] font-black uppercase leading-none tracking-[-0.04em]"
            style={{
              background: 'linear-gradient(175deg, #FFFFFF 0%, #6B7280 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.95)) drop-shadow(0 4px 8px rgba(0,0,0,0.7))',
            }}
          >
            {brandName}
          </h2>
          <p className="mt-3 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-accent/60">
            Digital Studio
          </p>
        </div>

      </div>

      {/* ── CTA overlay (fades in at end of scroll) ── */}
      <div
        className="ch-cta pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        style={{ pointerEvents: 'auto' }}
      >
        <h2 className="ch-silver-text mb-5 text-[clamp(1.8rem,5vw,4rem)] font-black leading-tight tracking-[-0.025em]">
          {ctaHeading}
        </h2>
        <p className="mb-10 max-w-[38ch] text-base font-normal leading-relaxed text-[#a1a1aa] md:text-lg">
          {ctaDescription}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            className="ch-btn-light flex items-center gap-3 rounded-[1.25rem] px-7 py-3.5 text-[0.95rem]"
            aria-label="Contactar por WhatsApp"
          >
            <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>
          <button
            className="ch-btn-dark flex items-center gap-3 rounded-[1.25rem] px-7 py-3.5 text-[0.95rem]"
            aria-label="Agendar llamada"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Agendar llamada
          </button>
        </div>
      </div>

    </div>
  )
}

export default CinematicHero
