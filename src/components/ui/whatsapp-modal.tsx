import React from 'react'
import { X, MessageCircle, Mail } from 'lucide-react'

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

interface WhatsAppModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const WHATSAPP_URL = "https://wa.me/5493816242482?text=Hola%20Gonzalo!%20Me%20gustar%C3%ADa%20contactarme%20con%20vos."

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-all duration-300"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="whatsapp-modal-title"
    >
      <div className="absolute bottom-28 right-6 sm:bottom-32 sm:right-24 w-[calc(100%-3rem)] sm:w-full max-w-[360px] overflow-hidden rounded-3xl bg-[#0a0f16] border border-white/10 shadow-2xl shadow-black/80 animate-in slide-in-from-bottom-12 slide-in-from-right-12 fade-in zoom-in-95 duration-300 origin-bottom-right">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#121822] px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h2 id="whatsapp-modal-title" className="text-xl font-black tracking-tight">Contacto</h2>
          </div>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body - Contact Links */}
        <div className="p-6 space-y-4">
          <a 
            href={WHATSAPP_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-4 py-4 text-base font-black uppercase tracking-wider text-black shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-1 hover:shadow-[#25D366]/40 active:translate-y-0"
          >
            <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span>WhatsApp</span>
          </a>
          
          <a 
            href="mailto:gonchimartinez9@gmail.com" 
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-4 py-4 text-base font-black uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1 hover:shadow-blue-600/40 active:translate-y-0"
          >
            <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span>Email</span>
          </a>

          <a 
            href="https://instagram.com/gonzalomartinez" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#E1306C] px-4 py-4 text-base font-black uppercase tracking-wider text-white shadow-lg shadow-[#E1306C]/20 transition-all hover:-translate-y-1 hover:shadow-[#E1306C]/40 active:translate-y-0"
          >
            <InstagramIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span>Instagram</span>
          </a>

          <a 
            href="https://www.linkedin.com/in/gonzalomartinezz2004" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0077b5] px-4 py-4 text-base font-black uppercase tracking-wider text-white shadow-lg shadow-[#0077b5]/20 transition-all hover:-translate-y-1 hover:shadow-[#0077b5]/40 active:translate-y-0"
          >
            <LinkedinIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  )
}
