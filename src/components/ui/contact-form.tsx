import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', type: 'App Móvil', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  return (
    <div className="mx-auto max-w-lg w-full relative z-10 mt-8">
      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card flex flex-col items-center justify-center rounded-3xl p-8 text-center border border-green-500/20"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>          <h3 className="text-xl font-bold text-[var(--color-foreground)]">¡Mensaje Recibido!</h3>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Gracias por escribirnos, {formData.name}. Uno de nuestros desarrolladores senior analizará tu propuesta y se contactará contigo en menos de 24 horas.
          </p>
          <Button
            variant="secondary"
            className="mt-6 border-[var(--color-border)] hover:bg-[var(--color-surface)]"
            onClick={() => {
              setFormData({ name: '', email: '', type: 'App Móvil', message: '' })
              setStatus('idle')
            }}
          >
            Enviar otro mensaje
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 md:p-8 space-y-4 shadow-xl border border-[var(--color-border)]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-foreground)]">Nombre completo</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Martín Jhones"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors duration-200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-foreground)]">Email corporativo</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Ej. martin@empresa.com"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors duration-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-foreground)]">Tipo de Proyecto</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-foreground)] focus:border-[var(--color-accent)] focus:outline-none transition-colors duration-200"
            >
              <option value="App Móvil">App Móvil (iOS & Android)</option>
              <option value="E-Commerce">E-Commerce Completo</option>
              <option value="Plataforma Web">Plataforma Web a Medida</option>
              <option value="SaaS Enterprise">SaaS Enterprise Corporativo</option>
              <option value="Diseño UI/UX">Diseño UX/UI & Sistema de Diseño</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-foreground)]">¿Qué idea tienes en mente?</label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe brevemente tus necesidades operativas..."
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors duration-200 resize-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full justify-center text-sm font-bold shadow-md bg-[var(--color-foreground)] hover:bg-[#3d2b1f] text-black"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                Procesando...
              </span>
            ) : (
              'Enviar Consulta Comercial'
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
