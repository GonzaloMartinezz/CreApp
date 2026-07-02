import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, MessageCircle, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { WhatsAppModal } from '@/components/ui/whatsapp-modal'

export interface NavbarProps {
  brandName?: string
}

export function Navbar({ brandName = 'CreAPP' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    { id: 'quienes-somos', label: 'Nosotros', num: '01' },
    { id: 'servicios', label: 'Servicios', num: '02' },
    { id: 'proceso', label: 'Metodología', num: '03' },
    { id: 'portfolio', label: 'Casos de Éxito', num: '04' },
    { id: 'cotizador', label: 'Cotizador', num: '05' },
    { id: 'contacto', label: 'Contacto', num: '06' },
  ]

  const WHATSAPP_URL = "https://wa.me/5493816242482?text=Hola%20Gonzalo!%20Vi%20tu%20porfolio%20de%20CreAPP%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20contigo."

  return (
    <>
      {/* ── HEADER NAVIGATION BAR ── */}
      <header
        className={cn(
          'fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 w-[96%] max-w-[1200px] rounded-[2rem] px-4 sm:px-6',
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
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Email Link - Header */}
            <a
              href="mailto:gonchimartinez9@gmail.com?subject=Quiero%20crear%20una%20app"
              className="hidden sm:inline-flex items-center gap-2.5 rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2.5 text-sm font-semibold tracking-wide text-blue-400 transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400/40"
            >
              <Send className="h-4 w-4" />
              <span>Email</span>
            </a>

            {/* Quick WhatsApp Link - Header (Opens Modal) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/20 bg-[#25D366]/10 px-5 py-2.5 text-sm font-semibold tracking-wide text-[#25D366] transition-all duration-300 hover:bg-[#25D366]/20 hover:border-[#25D366]/40 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Slide-out Menu Trigger Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent cursor-pointer group"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5 transition-transform duration-300 group-hover:scale-105" />
            </button>
          </div>
        </div>
      </header>

      {/* ── LATERAL SIDE DRAWER OVERLAY ── */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={cn(
          'fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm transition-opacity duration-500',
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* ── LATERAL SIDE DRAWER PANEL (SLIDES IN FROM THE RIGHT) ── */}
      <div
        className={cn(
          'fixed right-0 top-0 bottom-0 z-[110] flex h-full w-full max-w-[390px] flex-col border-l border-white/10 bg-gradient-to-b from-[#0c0614] to-[#040108] px-8 pt-6 pb-8 shadow-2xl transition-transform duration-500 ease-out select-none',
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-5">
          <div className="flex items-center gap-3 text-md font-black uppercase tracking-tight text-white">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-transparent">
              <img src="/LOGO PROFESIONAL.webp" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span>Navegación</span>
          </div>

          <button
            onClick={() => setIsDrawerOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white hover:border-accent hover:bg-accent/15 hover:text-accent cursor-pointer"
            aria-label="Cerrar menú"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Vertical Links List */}
        <div className="mt-8 flex flex-col gap-1.5">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleScrollTo(e, link.id)}
              className={cn(
                'group flex items-center justify-between rounded-xl px-4 py-3 text-lg font-bold tracking-wide uppercase transition-all duration-300',
                activeSection === link.id
                  ? 'bg-accent/10 border border-accent/20 text-accent'
                  : 'text-neutral-400 border border-transparent hover:text-white hover:bg-white/5 hover:pl-5'
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
        <div className="mt-auto flex flex-col gap-3">
          {/* Email Card (Blue) */}
          <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-linear-to-b from-blue-500/8 to-blue-600/3 p-4 shadow-lg shadow-blue-500/5">
            <div className="absolute right-0 top-0 -mr-6 -mt-6 h-20 w-20 rounded-full bg-blue-500/15 blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-400">
                Formal / Asesoría
              </span>
              <Send className="h-4 w-4 text-blue-400 opacity-80" />
            </div>
            
            <h3 className="text-xs font-bold text-white mb-3">¿Prefieres un correo formal?</h3>
            
            <a
              href="mailto:gonchimartinez9@gmail.com?subject=Quiero%20crear%20una%20app"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/35 active:translate-y-0 text-center"
            >
              📧 gonchimartinez9@gmail.com
            </a>
          </div>

          {/* WhatsApp Card (Green) */}
          <div className="relative overflow-hidden rounded-2xl border border-[#22c55e]/20 bg-linear-to-b from-[#22c55e]/8 to-[#16a34a]/3 p-4 shadow-lg shadow-green-500/5">
            {/* Green glowing orb in background */}
            <div className="absolute right-0 top-0 -mr-6 -mt-6 h-20 w-20 rounded-full bg-[#22c55e]/15 blur-xl pointer-events-none" />

            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22c55e]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#22c55e]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]" />
                Online / Disponible
              </span>
              <MessageCircle className="h-5 w-5 text-[#22c55e] opacity-80" />
            </div>

            <h3 className="text-sm font-bold text-white mb-1">¿Tienes una idea en mente?</h3>
            <p className="text-[11px] text-neutral-400 leading-relaxed mb-4">
              Hablemos directamente por WhatsApp. Te asesoro en la arquitectura, plazos y costos de tu proyecto sin compromiso.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#22c55e] to-[#16a34a] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/35 active:translate-y-0 text-center"
            >
              💬 Chat: 381 624 2482
            </a>
          </div>

          <div className="mt-4 flex justify-between text-[10px] text-neutral-500 px-1">
            <span>Tasa de respuesta: ~15m</span>
            <span>Estudio Gonzalo M.</span>
          </div>
        </div>
      </div>

      {/* ── FLOATING PULSING WHATSAPP BUTTON (BOTTOM-RIGHT) ── */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-35 flex h-14 w-14 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-[0_8px_32px_rgba(34,197,94,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer animate-bounce hover:animate-none group"
        aria-label="Contactar por WhatsApp"
        style={{
          boxShadow: '0 8px 32px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
          animationDuration: '3s'
        }}
      >
        <span className="absolute inset-0 rounded-full bg-[#22c55e] opacity-40 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
        <MessageCircle className="h-6 w-6 fill-white/10 transition-transform duration-300 group-hover:rotate-12" />
      </button>
      {/* ── WHATSAPP MODAL ── */}
      <WhatsAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Navbar
