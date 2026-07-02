import { CinematicLandingHero } from '@/components/ui/cinematic-landing-hero'
import { GalleryHoverCarousel } from '@/components/ui/gallery-hover-carousel'
import { Navbar } from '@/components/ui/navbar'
import { ServiceCard } from '@/components/ui/service-card'
import { ProcessTimeline } from '@/components/ui/process-timeline'
import { AppCalculator } from '@/components/ui/app-calculator'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { ContactForm } from '@/components/ui/contact-form'
import { GoogleGeminiEffectDemo } from '@/components/ui/google-gemini-demo'
import { SocialIcons } from '@/components/ui/social-icons'
import { BackgroundPaths } from '@/components/ui/background-paths'

// Importaciones modulares extraídas
import { SERVICES, STATS, PORTFOLIO_PROJECTS } from '@/data/constants'
import { D, Label } from '@/components/ui/primitives'
import { StatCounter } from '@/components/ui/stat-counter'
import { motion, type Variants } from 'framer-motion'
import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

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
    <>
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
              <span className="text-[#a86d23] inline-block">
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
          className="relative min-h-screen z-10 flex w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(5rem,8vw,4vw)] pb-[4vw] dots-pattern border-t border-(--color-border)"
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
          className="relative min-h-screen z-20 flex w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(5rem,8vw,4vw)] pb-[4vw] dots-pattern border-t border-(--color-border)"
          style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-foreground)' }}
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
                    title={title}
                    desc={desc}
                    iconName={icon}
                  />
                </motion.div>
              ))}
            </motion.div>

            <D />

            <p className="ml-auto max-w-[48ch] text-right text-[clamp(0.95rem,1.8vw,1.3rem)] font-medium leading-relaxed text-[var(--color-muted)]">
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
          className="relative min-h-screen z-30 flex w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(5rem,8vw,4vw)] pb-[4vw] dots-pattern border-t border-[var(--color-border)]"
          style={{ backgroundColor: 'var(--color-surface-2)', color: 'var(--color-foreground)' }}
        >

          <div className="relative z-10 flex flex-col gap-8 w-full" id="proceso">
            <div>
              <Label>{t('process.label')}</Label>
              <D className="mt-4 opacity-15" />
            </div>

            <h2 className="text-[clamp(3.1rem,9vw,10rem)] font-black uppercase leading-[0.85] tracking-tight text-left text-[var(--color-foreground)]">
              Paso A Paso.<br />Metodología Ágil.
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
        className="relative min-h-screen z-40 w-full overflow-x-hidden px-[4vw] pt-[clamp(5rem,8vw,6rem)] pb-[clamp(3rem,8vw,6rem)] dots-pattern border-t border-[var(--color-border)]"
      >

        <div className="mb-8 flex flex-col gap-4">
          <Label>{t('portfolio.label')}</Label>
          <D />
          <h2 className="text-[clamp(3rem,9vw,10rem)] font-black uppercase leading-[0.85] tracking-tight text-[var(--color-foreground)]">
            {t('portfolio.title')}
          </h2>
          <D />
        </div>

        <GalleryHoverCarousel
          heading="Proyectos destacados"
          items={PORTFOLIO_PROJECTS}
          className="mx-[-4vw]"
        />
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
        style={{ backgroundColor: '#1a1a1a', color: 'var(--color-foreground)' }}
        className="relative min-h-screen z-50 w-full px-[4vw] py-[clamp(5rem,10vw,8rem)] dots-pattern border-t border-[var(--color-border)]"
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
          className="relative min-h-screen z-[60] flex w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(5rem,8vw,4vw)] pb-[4vw] dots-pattern border-t border-[var(--color-border)]"
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

            {/* Staggered stat count loaders */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-x-[4vw] gap-y-6 md:grid-cols-4"
            >
              {STATS.map(({ value, label }) => (
                <motion.div variants={fadeInUp} key={label}>
                  <StatCounter
                    value={value}
                    label={label}
                  />
                </motion.div>
              ))}
            </motion.div>

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
          className="relative min-h-screen z-[70] flex w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(5rem,8vw,4vw)] pb-[4vw] dots-pattern border-t border-(--color-border)"
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
          className="relative min-h-screen z-80 flex w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(5rem,8vw,4vw)] pb-[4vw] overflow-hidden border-t border-(--color-border)"
          style={{ backgroundColor: '#000000', color: 'var(--color-foreground)' }}
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
      <footer className="relative z-90 flex flex-col gap-4 bg-(--color-surface-2) border-t border-(--color-border) px-[4vw] py-8 text-sm text-(--color-muted)">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/LOGO PROFESIONAL.webp" alt="Logo" className="h-7 w-7 rounded-full object-cover bg-white" />
              <span className="text-base font-black uppercase tracking-tight text-(--color-foreground)">
                {t('footer.brandName')}
              </span>
            </div>
            <p className="max-w-[30ch] text-xs leading-relaxed text-(--color-muted)">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-green-600">
                {t('footer.status')}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <SocialIcons />
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
            <div className="space-y-2.5">
              <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-foreground)">{t('footer.nav.title')}</p>
              <ul className="space-y-1.5 text-xs text-(--color-muted)">
                <li><a href="#quienes-somos" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.about')}</a></li>
                <li><a href="#servicios" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.services')}</a></li>
                <li><a href="#proceso" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.process')}</a></li>
              </ul>
            </div>
            <div className="space-y-2.5">
              <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-foreground)">{t('footer.tools.title')}</p>
              <ul className="space-y-1.5 text-xs text-(--color-muted)">
                <li><a href="#cotizador" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.calculator')}</a></li>
                <li><a href="#faq" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.portfolio')}</a></li>
                <li><a href="#contacto" className="hover:text-(--color-accent) transition-colors duration-200">{t('nav.contact')}</a></li>
              </ul>
            </div>
            <div className="space-y-2.5 col-span-2 sm:col-span-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-foreground)">{t('footer.legal.title')}</p>
              <ul className="space-y-1.5 text-xs text-(--color-muted)">
                <li><a href="#" className="hover:text-(--color-accent) transition-colors duration-200">{t('footer.legal.terms')}</a></li>
                <li><a href="#" className="hover:text-(--color-accent) transition-colors duration-200">{t('footer.legal.privacy')}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1000px] h-px bg-(--color-border) my-2" />

        <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center justify-between gap-3 md:flex-row text-[11px] text-(--color-muted)">
          <span>© {new Date().getFullYear()} Gonzalo Martínez. Todos los derechos reservados.</span>
          <span className="hidden sm:block">{t('footer.copyright')}</span>
          <span className="text-(--color-accent) font-semibold">{t('footer.madeBy')}</span>
        </div>
      </footer>
    </>
  )
}
