import { CinematicLandingHero } from '@/components/ui/cinematic-landing-hero'
import { Navbar } from '@/components/ui/navbar'
import { SocialIcons } from '@/components/ui/social-icons'
import { D, Label } from '@/components/ui/primitives'
import { StatCounter } from '@/components/ui/stat-counter'
import { SERVICES, STATS, PORTFOLIO_PROJECTS, FEATURES_ACCORDION_DATA } from '@/data/constants'
import { motion, type Variants } from 'framer-motion'
import React, { Suspense, lazy } from 'react'
import { useLanguage } from '@/context/LanguageContext'

// Lazy loaded components for better performance
const GalleryHoverCarousel = lazy(() => import('@/components/ui/gallery-hover-carousel').then(m => ({ default: m.GalleryHoverCarousel })))
const ServiceCard = lazy(() => import('@/components/ui/service-card').then(m => ({ default: m.ServiceCard })))
const ProcessTimeline = lazy(() => import('@/components/ui/process-timeline').then(m => ({ default: m.ProcessTimeline })))
const AppCalculator = lazy(() => import('@/components/ui/app-calculator').then(m => ({ default: m.AppCalculator })))
const FAQAccordion = lazy(() => import('@/components/ui/faq-accordion').then(m => ({ default: m.FAQAccordion })))
const ContactForm = lazy(() => import('@/components/ui/contact-form').then(m => ({ default: m.ContactForm })))
const GoogleGeminiEffectDemo = lazy(() => import('@/components/ui/google-gemini-demo').then(m => ({ default: m.GoogleGeminiEffectDemo })))
const BackgroundPaths = lazy(() => import('@/components/ui/background-paths').then(m => ({ default: m.BackgroundPaths })))
const FeaturesAccordion = lazy(() => import('@/components/ui/features-accordion').then(m => ({ default: m.FeaturesAccordion })))
const ProfessionalMetrics = lazy(() => import('@/components/ui/professional-metrics').then(m => ({ default: m.ProfessionalMetrics })))

// Animaciones de entrada al hacer scroll (scroll-driven animations)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}


export default function App() {
  const { t } = useLanguage()

  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>}>
      {/* 0. STICKY GLASS NAVIGATION BAR */}
      <Navbar brandName="Gonzalo M." />

      <div id="inicio">
        {/* ══════════════════════════════════════════════════════════════
            1. CINEMATIC HERO
           ══════════════════════════════════════════════════════════════ */}
        <CinematicLandingHero
          brandName={t('hero.brandName')}
          tagline1={t('hero.tagline1')}
          tagline2={
            <>
              {t('hero.tagline2')}
              <span className="text-gradient-glow inline-block">
                {t('hero.tagline2.highlight')}
              </span>
            </>
          }
          cardHeading={t('hero.cardHeading')}
          cardDescription={t('hero.cardDescription')}
          metricValue={t('hero.metricValue')}
          metricLabel={t('hero.metricLabel')}
          ctaHeading={t('hero.ctaHeading')}
          ctaDescription={t('hero.ctaDescription')}
          onWhatsAppClick={() => window.dispatchEvent(new Event('open-whatsapp-modal'))}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          2. STANDALONE SECTIONS (traditional vertical scroll with Framer Motion reveals)
         ══════════════════════════════════════════════════════════════ */}
      <div className="w-full">

        {/* ── 01 · QUIÉNES SOMOS ──────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          aria-label="Quiénes somos"
          className="relative z-10 flex w-full flex-col justify-center gap-6 px-[4vw] py-16 md:py-24 border-t border-(--color-border)"
          style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}
        >
          {/* Animated floating mesh gradients for extreme premium design */}

          <div className="relative z-10 flex flex-col gap-8 w-full" id="quienes-somos">
            <div>
              <Label>{t('about.label')}</Label>
              <D className="mt-4" />
            </div>

            <h1 className="text-[clamp(3.1rem,9vw,10rem)] font-black uppercase leading-[0.85] tracking-tight">
              {t('about.title')}
            </h1>

            <D />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-[50ch] text-[clamp(0.95rem,1.8vw,1.5rem)] font-normal leading-relaxed text-(--color-muted)">
                {t('about.description')}
              </p>
              <div className="flex shrink-0 flex-col items-end gap-1 text-right opacity-70">
                <span className="text-xs font-bold uppercase tracking-widest">{t('about.location')}</span>
                <span className="text-xs font-bold uppercase tracking-widest">{t('about.role')}</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── 02 · SERVICIOS A MEDIDA ─────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          aria-label="Servicios"
          className="relative z-20 flex w-full flex-col justify-center gap-6 px-[4vw] py-16 md:py-24 border-t border-(--color-border)"
          style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}
        >

          <div className="relative z-10 flex flex-col gap-8 w-full" id="servicios">
            <div>
              <Label>{t('services.label')}</Label>
              <D className="mt-4" />
            </div>

            <h2 className="text-[clamp(3.1rem,9vw,10rem)] font-black uppercase leading-[0.85] tracking-tight text-center">
              {t('services.title')}
            </h2>

            <D />

            {/* Staggered load for services list */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {SERVICES.map(({ icon, title, desc }) => (
                <motion.div variants={fadeInUp} key={title} className="h-full">
                  <ServiceCard
                    title={t(title as any)}
                    desc={t(desc as any)}
                    iconName={icon}
                  />
                </motion.div>
              ))}
            </motion.div>

            <D />

            <p className="ml-auto max-w-[48ch] text-right text-[clamp(0.95rem,1.8vw,1.3rem)] font-medium leading-relaxed text-(--color-muted)">
              {t('services.description')}
            </p>
          </div>
        </motion.section>

        {/* ── 03 · METODOLOGÍA DE TRABAJO ────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          aria-label="Proceso"
          className="relative z-30 flex w-full flex-col justify-center gap-6 px-[4vw] py-16 md:py-24 border-t border-(--color-border)"
          style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}
        >

          <div className="relative z-10 flex flex-col gap-8 w-full" id="proceso">
            <div>
              <Label>{t('process.label')}</Label>
              <D className="mt-4 opacity-15" />
            </div>

            <h2 className="text-[clamp(3.1rem,9vw,10rem)] font-black uppercase leading-[0.85] tracking-tight text-left text-(--color-foreground)">
              {t('process.title').split('. ').map((part: string, i: number, arr: string[]) => (
                <React.Fragment key={i}>
                  {part}{i < arr.length - 1 ? '.' : ''}
                  {i === 0 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <D className="opacity-15" />

            {/* Premium Vertical Connected Progress Timeline */}
            <ProcessTimeline />
          </div>
        </motion.section>

      </div>

      {/* ══════════════════════════════════════════════════════════════
          3. SCROLL PORTFOLIO & BUDGET WIDGETS
         ══════════════════════════════════════════════════════════════ */}

      {/* ── PORTFOLIO / CASOS DE ÉXITO ─────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        id="portfolio"
        aria-label="Portafolio"
        style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}
        className="relative z-40 w-full overflow-x-hidden px-[4vw] py-16 md:py-24 dots-pattern border-t border-(--color-border)"
      >

        <div className="mb-8 flex flex-col gap-4">
          <Label>{t('portfolio.label')}</Label>
          <D />
          <h2 className="text-[clamp(3rem,9vw,10rem)] font-black uppercase leading-[0.85] tracking-tight text-(--color-foreground)">
            {t('portfolio.title')}
          </h2>
          <D />
        </div>

        <GalleryHoverCarousel
          heading={t('portfolio.carousel.heading')}
          items={PORTFOLIO_PROJECTS}
          className="mx-[-4vw]"
        />

        <div className="mt-24 mb-8 flex flex-col gap-4">
          <Label>{t('portfolio.solutions.label')}</Label>
          <D />
          <h2 className="text-[clamp(2.5rem,6vw,8rem)] font-black uppercase leading-[0.85] tracking-tight text-(--color-foreground)" dangerouslySetInnerHTML={{ __html: t('portfolio.solutions.title') }} />
          <D />
        </div>

        <div className="flex w-full items-center justify-center">
          <FeaturesAccordion features={FEATURES_ACCORDION_DATA} />
        </div>
      </motion.section>

      <GoogleGeminiEffectDemo />

      {/* ── COTIZADOR DE PRESUPUESTO ───────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        id="cotizador"
        aria-label="Calculadora de presupuesto"
        style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-foreground)' }}
        className="relative z-50 w-full px-[4vw] py-16 md:py-24 dots-pattern border-t border-(--color-border)"
      >
        {/* Visual cosmic background orbs */}

        <div className="relative z-10 mb-10 flex flex-col gap-4">
          <Label>{t('calculator.label')}</Label>
          <D />
          <h2 className="text-[clamp(3rem,8vw,8.5rem)] font-black uppercase leading-[0.85] tracking-tight">
            {t('calculator.title')}
          </h2>
          <D />
        </div>

        <AppCalculator />
      </motion.section>

      {/* ══════════════════════════════════════════════════════════════
          4. METRICS, FAQ & CONTACT (vertical scroll)
         ══════════════════════════════════════════════════════════════ */}
      <div className="w-full">

        {/* ── 06 · NÚMEROS ────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          aria-label="Resultados"
          className="relative z-60 flex w-full flex-col justify-center gap-6 px-[4vw] py-16 md:py-24 dots-pattern border-t border-(--color-border)"
          style={{ background: 'var(--color-surface-2)', color: 'var(--color-foreground)' }}
        >

          <div className="flex flex-col gap-8 w-full relative z-10">
            <div>
              <Label>{t('metrics.label')}</Label>
              <D className="mt-4" />
            </div>

            <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-black uppercase leading-[0.85] tracking-tight">
              {t('metrics.title')}
            </h2>

            <D />

            <ProfessionalMetrics 
              metrics={[
                {
                  icon: 'rocket',
                  value: '15+',
                  label: t('metrics.card1.label'),
                  description: t('metrics.card1.desc'),
                },
                {
                  icon: 'shield',
                  value: '100%',
                  label: t('metrics.card2.label'),
                  description: t('metrics.card2.desc'),
                },
                {
                  icon: 'clock',
                  value: '24h',
                  label: t('metrics.card3.label'),
                  description: t('metrics.card3.desc'),
                },
                {
                  icon: 'star',
                  value: '5★',
                  label: t('metrics.card4.label'),
                  description: t('metrics.card4.desc'),
                }
              ]}
            />

            <D />

            <p className="max-w-[50ch] text-[clamp(0.95rem,2vw,1.5rem)] font-normal leading-relaxed opacity-85">
              {t('metrics.description')}
            </p>
          </div>
        </motion.section>

        {/* ── FAQ SECTION ────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          aria-label="Preguntas Frecuentes"
          className="relative z-70 flex w-full flex-col justify-center gap-6 px-[4vw] py-16 md:py-24 dots-pattern border-t border-(--color-border)"
          style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}
        >

          <div className="flex flex-col gap-8 w-full relative z-10" id="faq">
            <div>
              <Label>{t('faq.label')}</Label>
              <D className="mt-4" />
            </div>

            <h2 className="text-[clamp(3.1rem,10vw,11rem)] font-black uppercase leading-[0.85] tracking-tight">
              {t('faq.title')}
            </h2>

            <D />

            <FAQAccordion />

            <D />

            <p className="max-w-[48ch] text-[clamp(0.85rem,1.5vw,1.1rem)] text-(--color-muted)">
              {t('faq.description')}
            </p>
          </div>
        </motion.section>

        {/* ── CONTACTO Y FORMULARIO ───────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          aria-label="Llamada a la acción y contacto"
          className="relative z-80 flex w-full flex-col justify-center gap-6 px-[4vw] py-16 md:py-24 overflow-hidden border-t border-(--color-border)"
          style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}
        >
          {/* Background Paths effect */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
            <BackgroundPaths />
          </div>

          <div className="relative z-10 flex flex-col gap-8 w-full" id="contacto">
            <div>
              <Label>{t('contact.label')}</Label>
              <D className="mt-4" />
            </div>

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.85] tracking-tight">
                  {t('contact.title')}
                </h2>
                <p className="mt-6 max-w-[40ch] text-[clamp(0.95rem,2vw,1.4rem)] font-normal leading-relaxed text-(--color-muted)">
                  {t('contact.description')}
                </p>

                {/* Instant Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/5493816242482?text=Hola%20Gonzalo!%20Vi%20tu%20porfolio%20de%20CreAPP%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-success to-[#16a34a] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-green-500/20 transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    💬 {t('contact.btn.whatsapp')}
                  </a>
                  <a
                    href="mailto:gonchimartinez9@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-background) px-6 py-3 text-xs font-bold uppercase tracking-wider text-(--color-foreground) transition-transform duration-300 hover:border-(--color-accent) hover:bg-(--color-surface-2) hover:-translate-y-0.5 cursor-pointer"
                  >
                    📧 {t('contact.btn.email')}
                  </a>
                </div>
              </div>

              {/* Senior-grade Interactive Lead Capture Form */}
              <ContactForm />
            </div>

            <D />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-(--color-muted)">
              <span>● {t('contact.schedule1')}</span>
              <span>● {t('contact.schedule2')}</span>
            </div>
          </div>
        </motion.section>

      </div>

      {/* ══════════════════════════════════════════════════════════════
          Footer
         ══════════════════════════════════════════════════════════════ */}
      <footer className="relative z-90 flex flex-col gap-4 bg-(--color-surface-2) border-t border-(--color-border) px-[4vw] py-12 text-sm text-(--color-muted)">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 lg:flex-row lg:justify-between">

          {/* Column 1: Logo (Standalone, large, centered vertically) */}
          <div className="flex shrink-0 items-center justify-center lg:justify-start">
            <img src="/LOGO PROFESIONAL.webp" alt="Logo" loading="lazy" decoding="async" className="h-28 w-28 md:h-36 md:w-36 rounded-full object-cover bg-white shadow-2xl" />
          </div>

          {/* Column 2: Brand Text */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4 max-w-[320px]">
            <span className="text-2xl md:text-3xl font-black uppercase tracking-tight text-(--color-foreground)">
              {t('footer.brandName')}
            </span>
            <p className="text-xs leading-relaxed text-(--color-muted)">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-green-600">
                {t('footer.status')}
              </span>
            </div>
          </div>

          {/* Column 3: Social Icons Vertical */}
          <div className="flex shrink-0 items-center justify-center">
            <SocialIcons vertical={false} className="md:flex-col!" />
          </div>

          {/* Column 4: Navigation Links (Side-by-side on desktop, stacked on mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-foreground)">{t('footer.nav.title')}</p>
              <ul className="space-y-2 text-xs text-(--color-muted) flex flex-col items-center sm:items-start">
                <li><a href="#quienes-somos" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.about')}</a></li>
                <li><a href="#servicios" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.services')}</a></li>
                <li><a href="#proceso" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.process')}</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-foreground)">{t('footer.tools.title')}</p>
              <ul className="space-y-2 text-xs text-(--color-muted) flex flex-col items-center sm:items-start">
                <li><a href="#cotizador" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.calculator')}</a></li>
                <li><a href="#portfolio" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.portfolio')}</a></li>
                <li><a href="#contacto" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.contact')}</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-(--color-foreground)">{t('footer.legal.title')}</p>
              <ul className="space-y-2 text-xs text-(--color-muted) flex flex-col items-center sm:items-start">
                <li><a href="#" className="hover:text-(--color-accent) transition-colors duration-200">{t('footer.legal.terms')}</a></li>
                <li><a href="#" className="hover:text-(--color-accent) transition-colors duration-200">{t('footer.legal.privacy')}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1000px] h-px bg-(--color-border) my-6" />

        <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center justify-between gap-3 md:flex-row text-[11px] text-(--color-muted)">
          <span>© {new Date().getFullYear()} Gonzalo Martínez. {t('footer.rights')}</span>
          <span className="hidden sm:block">{t('footer.copyright')}</span>
          <span className="text-(--color-accent) font-semibold">{t('footer.madeBy')}</span>
        </div>
      </footer>
    </Suspense>
  )
}
