import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, MessageCircle, Send, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { WhatsAppModal } from '@/components/ui/whatsapp-modal'
import { ChatbotModal } from '@/components/ui/chatbot-modal'
import { useLanguage } from '@/context/LanguageContext'

export interface NavbarProps {
  brandName?: string
}

export function Navbar({ brandName = 'CreAPP' }: NavbarProps) {
  const { t, language, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsDrawerOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Section tracking for active state
      const sections = ['inicio', 'quienes-somos', 'servicios', 'proceso', 'portfolio', 'cotizador', 'contacto']
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Global event listener to open WhatsApp modal from other components (like CinematicHero)
  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true)
    window.addEventListener('open-whatsapp-modal', handleOpenModal)
    return () => window.removeEventListener('open-whatsapp-modal', handleOpenModal)
  }, [])

  const navLinks = [
    { id: 'quienes-somos', label: t('nav.about'), num: '01' },
    { id: 'servicios', label: t('nav.services'), num: '02' },
    { id: 'proceso', label: t('nav.process'), num: '03' },
    { id: 'portfolio', label: t('nav.portfolio'), num: '04' },
    { id: 'cotizador', label: t('nav.calculator'), num: '05' },
    { id: 'contacto', label: t('nav.contact'), num: '06' },
  ]

  const WHATSAPP_URL = "https://wa.me/5493816242482?text=Hola%20Gonzalo!%20Vi%20tu%20porfolio%20de%20CreAPP%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20contigo."

  return (
    <>
      {/* ── HEADER NAVIGATION BAR ── */}
      <header
        className={cn(
          'fixed left-1/2 -translate-x-1/2 z-100 transition-all duration-500 w-[96%] max-w-[1200px] rounded-4xl px-4 sm:px-6',
          isScrolled
            ? 'top-4 sm:top-6 bg-black/60 backdrop-blur-xl border border-white/10 py-3 shadow-2xl shadow-black/60'
            : 'top-4 sm:top-8 bg-transparent py-4'
        )}
      >
        <div className="mx-auto flex w-full items-center justify-between">
          {/* Logo (WhatsApp Modal Trigger) */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-4 select-none cursor-pointer"
            aria-label="Abrir formulario de contacto por WhatsApp"
          >
            {/* Logo image placeholder */}
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-transparent transition-transform duration-300 group-hover:scale-105">
              <img src="/LOGO PROFESIONAL.webp" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-widest text-white/90 uppercase transition-colors duration-200 group-hover:text-white">
              {brandName}
            </span>
          </button>

          {/* Center-Right Quick CTA Elements */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] sm:text-xs font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 cursor-pointer"
              aria-label="Cambiar idioma"
            >
              {language.toUpperCase()}
            </button>

            {/* Quick Email Link - Header */}
            <a
              href="mailto:gonchimartinez9@gmail.com?subject=Quiero%20crear%20una%20app"
              className="hidden sm:inline-flex items-center gap-1 sm:gap-2.5 rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-sm font-semibold tracking-wide text-blue-400 transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400/40"
            >
              <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden min-[375px]:inline">{t('nav.emailBtn')}</span>
            </a>

            {/* Quick WhatsApp Link - Header (Opens Modal) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 sm:gap-2.5 rounded-full border border-[#25D366]/20 bg-[#25D366]/10 px-2 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-sm font-semibold tracking-wide text-[#25D366] transition-all duration-300 hover:bg-[#25D366]/20 hover:border-[#25D366]/40 cursor-pointer"
            >
              <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden min-[375px]:inline">{t('nav.whatsappBtn')}</span>
            </button>

            {/* Slide-out Menu Trigger Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent cursor-pointer group"
              aria-label="Abrir menú"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-105" />
            </button>
          </div>
        </div>
      </header>

      {/* ── LATERAL SIDE DRAWER OVERLAY ── */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={cn(
          'fixed inset-0 z-110 bg-black/60 backdrop-blur-sm transition-opacity duration-500',
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* ── LATERAL SIDE DRAWER PANEL (SLIDES IN FROM THE RIGHT) ── */}
      <div
        className={cn(
          'fixed right-0 top-0 bottom-0 z-110 flex h-full w-full max-w-[390px] flex-col border-l border-white/10 bg-linear-to-b from-[#0c0614] to-[#040108] px-8 pt-6 pb-8 shadow-2xl transition-transform duration-500 ease-out select-none',
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Drawer Header */}
        <div className="shrink-0 flex items-center justify-between border-b border-white/5 pb-5">
          <div className="flex items-center gap-3 text-md font-black uppercase tracking-tight text-white">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-transparent">
              <img src="/LOGO PROFESIONAL.webp" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span>{t('footer.nav.title')}</span>
          </div>

          <button
            onClick={() => setIsDrawerOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white hover:border-accent hover:bg-accent/15 hover:text-accent cursor-pointer"
            aria-label="Cerrar menú"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Fixed Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col pt-6 pb-2">
          {/* Vertical Links List */}
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(e, link.id)}
                className={cn(
                  'group flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-black tracking-wide uppercase transition-all duration-300',
                  activeSection === link.id
                    ? 'text-white bg-white/10'
                    : 'text-neutral-500 hover:text-white hover:bg-white/5 hover:pl-6'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    'text-xs font-mono tracking-widest',
                    activeSection === link.id ? 'text-accent' : 'text-neutral-600'
                  )}>
                    {link.num}
                  </span>
                  <span>{link.label}</span>
                </div>
                <ArrowUpRight className={cn(
                  'h-4 w-4 opacity-0 transition-all duration-300',
                  activeSection === link.id ? 'opacity-100 text-accent' : 'group-hover:opacity-100 group-hover:text-white'
                )} />
              </a>
            ))}
          </div>

          {/* Drawer Bottom - Contact Cards */}
          <div className="mt-auto flex flex-col gap-3 pb-6 pt-4 border-t border-white/5">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-2 mb-1">
              Contacto Directo
            </span>
            <div className="grid grid-cols-2 gap-3 px-2">
              <a
                href="mailto:gonchimartinez9@gmail.com?subject=Quiero%20crear%20una%20app"
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 p-4 transition-all hover:-translate-y-1"
              >
                <Send className="h-5 w-5 text-blue-400" />
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Email</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-success/20 bg-success/5 hover:bg-success/10 p-4 transition-all hover:-translate-y-1"
              >
                <MessageCircle className="h-5 w-5 text-success" />
                <span className="text-[10px] font-bold text-success uppercase tracking-wider">WhatsApp</span>
              </a>
            </div>

            <div className="mt-2 flex justify-between text-[10px] text-neutral-600 px-3 shrink-0 font-medium">
              <span>{t('nav.drawer.responseRate')}</span>
              <span>{t('nav.drawer.studio')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY "QUIEN SOY" BUTTON (LEFT EDGE) ── */}
      <a
        href="https://mi-portafolioblogg.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-1/2 left-0 z-99 -translate-y-1/2 flex items-center justify-center bg-surface border border-[#ff7a00] border-l-0 text-[#ff7a00] px-2 py-6 rounded-r-xl shadow-[4px_0_20px_rgba(255,122,0,0.15)] hover:bg-[#ff7a00] hover:text-white transition-colors duration-300 cursor-pointer group backdrop-blur-md"
        aria-label="Ver mi portafolio"
      >
        <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          ¿Quién Soy?
        </span>
      </a>

      {/* ── FLOATING BUTTONS CONTAINER (BOTTOM-LEFT) ── */}
      <div className="fixed bottom-6 left-6 z-99 flex flex-col items-center gap-6 pointer-events-none">
        {/* Contact/Social Button - Spinning Logo */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group pointer-events-auto overflow-hidden p-0.5"
          aria-label="Abrir redes de contacto"
        >
          {/* Logo animado. Usamos fallback si no existe la imagen */}
          <img
            src="/LogoPerfil.jpg"
            alt="Logo"
            className="w-full h-full rounded-full object-cover object-center scale-[1.15] animate-spin-slow group-hover:animate-none"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <MessageCircle className="h-6 w-6 text-white hidden" />
        </button>
      </div>

      {/* ── FLOATING BOT BUTTON CONTAINER (BOTTOM-RIGHT) ── */}
      <div className="fixed bottom-6 right-6 z-99 flex flex-col items-center gap-6 pointer-events-none">
        {/* AI Chatbot Button */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="relative flex h-[60px] w-[60px] md:h-[64px] md:w-[64px] items-center justify-center rounded-2xl bg-[#ff7a00] text-white shadow-[0_8px_32px_rgba(255,122,0,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer animate-bounce-x hover:animate-none group pointer-events-auto"
          aria-label="Abrir asistente virtual"
          style={{
            boxShadow: '0 8px 32px rgba(255, 122, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          <span className="absolute inset-0 rounded-2xl bg-[#ff7a00] opacity-40 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
          <Bot className="h-7 w-7 md:h-8 md:w-8 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        </button>
      </div>

      {/* ── MODALS ── */}
      <WhatsAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  )
}

export default Navbar
