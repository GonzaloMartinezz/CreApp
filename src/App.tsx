import { CinematicHero } from '@/components/ui/cinematic-hero'
import { GalleryHoverCarousel } from '@/components/ui/gallery-hover-carousel'
import { Navbar } from '@/components/ui/navbar'
import { ServiceCard } from '@/components/ui/service-card'
import { ProcessTimeline } from '@/components/ui/process-timeline'
import { AppCalculator } from '@/components/ui/app-calculator'
import { FAQAccordion } from '@/components/ui/faq-accordion'

// Importaciones modulares extraídas
import { SERVICES, STATS, PORTFOLIO_PROJECTS } from '@/data/constants'
import { D, Label } from '@/components/ui/primitives'
import { StatCounter } from '@/components/ui/stat-counter'
import { ContactForm } from '@/components/ui/contact-form'
import { motion, type Variants } from 'framer-motion'

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
  return (
    <>
      {/* 0. STICKY GLASS NAVIGATION BAR */}
      <Navbar brandName="Gonzalo M." />

      <div id="inicio">
        {/* ══════════════════════════════════════════════════════════════
            1. CINEMATIC HERO
           ══════════════════════════════════════════════════════════════ */}
        <CinematicHero
          brandName="Gonzalo Martínez"
          tagline1="Desarrollo tu app ideal"
          tagline2="para tus clientes."
          cardHeading="Soluciones digitales a medida: aplicaciones móviles, sistemas de escritorio y web que impulsan la conversión y digitalizan tu negocio."
          metricValue={15}
          metricLabel="Proyectos Entregados"
          ctaHeading="Llevemos tu negocio al siguiente nivel."
          ctaDescription="Agenda una sesión de consultoría técnica conmigo sin cargo y definamos la arquitectura ideal para tu plataforma."
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          2. STANDALONE SECTIONS (traditional vertical scroll with Framer Motion reveals)
         ══════════════════════════════════════════════════════════════ */}
      <div className="w-full overflow-x-hidden">

        {/* ── 01 · QUIÉNES SOMOS ──────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          aria-label="Quiénes somos"
          className="relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw] overflow-hidden dots-pattern"
          style={{ backgroundColor: '#040108', color: '#fff' }}
        >
          {/* Animated floating mesh gradients for extreme premium design */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,122,0,0.05),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            <div className="absolute left-[-10%] top-[-10%] h-[60vw] w-[60vw] rounded-full bg-primary blur-[150px] mix-blend-screen animate-orb-float-1" />
            <div className="absolute right-[-15%] bottom-[-15%] h-[55vw] w-[55vw] rounded-full bg-primary-2 blur-[130px] mix-blend-screen animate-orb-float-2" />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full gap-6 w-full" id="quienes-somos">
            <div>
              <Label>01 — Quiénes somos</Label>
              <D className="mt-4" />
            </div>

            <h1 className="text-[clamp(3.1rem,9vw,10rem)] font-black uppercase leading-[0.85] tracking-tight">
              Código<br />Con<br />Propósito
            </h1>

            <D />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-[50ch] text-[clamp(0.95rem,1.8vw,1.5rem)] font-normal leading-relaxed text-neutral-300">
                Hola, soy Gonzalo Martínez. Como desarrollador semi-junior, me especializo en construir aplicaciones robustas e interfaces inmersivas. Ayudo a negocios a vender más y a organizarse eficientemente mediante la digitalización de sus operaciones.
              </p>
              <div className="flex shrink-0 flex-col items-end gap-1 text-right opacity-70">
                <span className="text-xs font-bold uppercase tracking-widest">Buenos Aires, Argentina</span>
                <span className="text-xs font-bold uppercase tracking-widest">Desarrollador Fullstack</span>
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
          className="relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw] overflow-hidden dots-pattern"
          style={{ backgroundColor: '#010609', color: '#fafafa' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(0,245,212,0.05),transparent_65%)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col justify-between h-full gap-6 w-full" id="servicios">
            <div>
              <Label>02 — Servicios de Desarrollo</Label>
              <D className="mt-4" />
            </div>

            <h2 className="text-[clamp(3.1rem,9vw,10rem)] font-black uppercase leading-[0.85] tracking-tight">
              Qué Hago<br />Por Tu<br />Negocio
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

            <p className="ml-auto max-w-[48ch] text-right text-[clamp(0.95rem,1.8vw,1.3rem)] font-medium leading-relaxed text-neutral-400">
              Desarrollo plataformas robustas con tecnologías modernas para asegurar la máxima velocidad de carga, escalabilidad y la mejor experiencia de usuario.
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
          className="relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw] overflow-hidden dots-pattern"
          style={{ backgroundColor: '#090401', color: '#fff' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,0,0.035),transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col justify-between h-full gap-6 w-full" id="proceso">
            <div>
              <Label>03 — Cómo construimos tu app</Label>
              <D className="mt-4 opacity-15" />
            </div>

            <h2 className="text-[clamp(3.1rem,9vw,10rem)] font-black uppercase leading-[0.85] tracking-tight text-white">
              Paso A Paso.<br />Metodología<br />Ágil.
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
        style={{ backgroundColor: '#010609', color: '#fafafa' }}
        className="relative w-full overflow-x-hidden px-[4vw] pt-[clamp(3rem,8vw,6rem)] pb-[clamp(3rem,8vw,6rem)] dots-pattern"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,254,0.04),transparent_65%)] pointer-events-none" />
        
        <div className="mb-8 flex flex-col gap-4">
          <Label>Casos de Éxito</Label>
          <D />
          <h2 className="text-[clamp(3rem,9vw,10rem)] font-black uppercase leading-[0.85] tracking-tight text-white">
            Proyectos<br />Extraordinarios
          </h2>
          <D />
        </div>

        <GalleryHoverCarousel
          heading="Portfolio Seleccionado"
          items={PORTFOLIO_PROJECTS}
          className="mx-[-4vw]"
        />
      </motion.section>

      {/* ── COTIZADOR DE PRESUPUESTO ───────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        id="cotizador"
        aria-label="Calculadora de presupuesto"
        style={{ backgroundColor: '#0a0401', color: '#fff' }}
        className="relative w-full overflow-hidden px-[4vw] py-[clamp(4rem,10vw,8rem)] dots-pattern"
      >
        {/* Visual cosmic background orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,245,212,0.05),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute right-[5%] top-[10%] h-[35vw] w-[35vw] rounded-full bg-primary-3 blur-[140px] mix-blend-screen animate-orb-float-3" />
        </div>

        <div className="relative z-10 mb-10 flex flex-col gap-4">
          <Label>Presupuesto Transparente</Label>
          <D />
          <h2 className="text-[clamp(3rem,8vw,8.5rem)] font-black uppercase leading-[0.85] tracking-tight">
            Calcula tu<br />Inversión
          </h2>
          <D />
        </div>

        <AppCalculator />
      </motion.section>

      {/* ══════════════════════════════════════════════════════════════
          4. METRICS, FAQ & CONTACT (vertical scroll)
         ══════════════════════════════════════════════════════════════ */}
      <div className="w-full overflow-x-hidden">

        {/* ── 06 · NÚMEROS ────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          aria-label="Resultados"
          className="relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw] overflow-hidden dots-pattern"
          style={{ background: 'linear-gradient(135deg, #10061a 0%, #030107 100%)', color: '#fff' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,122,0,0.08),transparent_65%)] pointer-events-none" />
          
          <div className="flex flex-col justify-between h-full gap-6 w-full relative z-10">
            <div>
              <Label>04 — Métricas Operativas</Label>
              <D className="mt-4" />
            </div>

            <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-black uppercase leading-[0.85] tracking-tight">
              Números<br />Que<br />Importan
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
              Cada desarrollo está respaldado por altos estándares de calidad de código y un compromiso inquebrantable de entrega en los plazos acordados.
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
          className="relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw] overflow-hidden dots-pattern"
          style={{ backgroundColor: '#020709', color: '#fafafa' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(0,245,212,0.04),transparent_60%)] pointer-events-none" />
          
          <div className="flex flex-col justify-between h-full gap-6 w-full relative z-10" id="faq">
            <div>
              <Label>05 — Preguntas Frecuentes</Label>
              <D className="mt-4" />
            </div>

            <h2 className="text-[clamp(3.1rem,10vw,11rem)] font-black uppercase leading-[0.85] tracking-tight">
              Dudas<br />Resueltas
            </h2>

            <D />

            <FAQAccordion />

            <D />

            <p className="max-w-[48ch] text-[clamp(0.85rem,1.5vw,1.1rem)] text-neutral-400">
              ¿Tenés alguna otra duda? Estoy disponible para charlar por WhatsApp y asesorarte en la mejor opción para tu negocio.
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
          className="relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw] overflow-hidden dots-pattern"
          style={{ backgroundColor: '#030107', color: '#fafafa' }}
        >
          {/* Neon moving glow in background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,122,0,0.06),transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35">
            <div className="absolute left-[30%] top-[40%] h-[40vw] w-[40vw] rounded-full bg-primary blur-[150px] mix-blend-screen animate-orb-float-1" />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full gap-6 w-full" id="contacto">
            <div>
              <Label>06 — Comienza tu proyecto</Label>
              <D className="mt-4" />
            </div>

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.85] tracking-tight">
                  ¿Listo<br />Para<br />Crear?
                </h2>
                <p className="mt-6 max-w-[40ch] text-[clamp(0.95rem,2vw,1.4rem)] font-normal leading-relaxed text-neutral-400">
                  Escribime hoy mismo y coordinemos una sesión técnica virtual sin costo. Analizaremos las necesidades operativas de tu empresa y estimaremos plazos con total claridad.
                </p>

                {/* Instant Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/5493816242482?text=Hola%20Gonzalo!%20Vi%20tu%20porfolio%20de%20CreAPP%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#22c55e] to-[#16a34a] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-green-500/20 transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    💬 WhatsApp Directo
                  </a>
                  <a
                    href="mailto:hola@creapp.com"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-transform duration-300 hover:border-white/20 hover:bg-white/8 hover:-translate-y-0.5 cursor-pointer"
                  >
                    📧 Escribir Email
                  </a>
                </div>
              </div>

              {/* Senior-grade Interactive Lead Capture Form */}
              <ContactForm />
            </div>

            <D />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500">
              <span>● Horario de atención: Lun a Vie de 9h a 19h</span>
              <span>● Tasa de respuesta comercial: ~30 minutos</span>
            </div>
          </div>
        </motion.section>

      </div>

      {/* ══════════════════════════════════════════════════════════════
          Footer
         ══════════════════════════════════════════════════════════════ */}
      <footer className="flex flex-col gap-6 bg-[#020104] border-t border-surface px-[4vw] py-10 text-sm text-neutral-500">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 md:flex-row md:justify-between">
          <div className="space-y-4">
            <span className="text-lg font-black uppercase tracking-tight text-white">
              Gonzalo M.
            </span>
            <p className="max-w-[30ch] text-xs leading-relaxed text-neutral-400">
              Desarrollo de software y aplicaciones móviles de alto impacto diseñadas para digitalizar y automatizar operaciones comerciales.
            </p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                Servicios disponibles y operando
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4 sm:grid-cols-3">
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white">Navegación</p>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                <li><a href="#quienes-somos" className="hover:text-white transition-colors duration-200">Nosotros</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors duration-200">Servicios</a></li>
                <li><a href="#proceso" className="hover:text-white transition-colors duration-200">Metodología</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white">Herramientas</p>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                <li><a href="#cotizador" className="hover:text-white transition-colors duration-200">Cotizador</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors duration-200">Preguntas</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors duration-200">Contacto</a></li>
              </ul>
            </div>
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white">Legal</p>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Términos de Servicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Política de Privacidad</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1400px] h-px bg-white/5 my-4" />

        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-4 md:flex-row text-xs text-neutral-600">
          <span>© {new Date().getFullYear()} Gonzalo Martínez. Todos los derechos reservados.</span>
          <span className="hidden sm:block">Transformando ideas audaces en soluciones digitales eficientes.</span>
          <span className="text-accent font-semibold">Realizado por Gonzalo Martinez</span>
        </div>
      </footer>
    </>
  )
}
