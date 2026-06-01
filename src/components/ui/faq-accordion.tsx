import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FAQItem {
  q: string
  a: string
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    q: '¿Cuánto tiempo se tarda en construir una aplicación móvil?',
    a: 'Normalmente, un MVP (Producto Mínimo Viable) toma entre 6 y 10 semanas desde el descubrimiento inicial hasta el lanzamiento a producción. Proyectos de gran escala con backend masivo o múltiples integraciones pueden requerir de 12 a 16 semanas.',
  },
  {
    q: '¿Se encargan del proceso de publicación en las tiendas (App Store / Play Store)?',
    a: 'Sí, absolutamente. Nos encargamos del ciclo completo de despliegue: configuración en consolas de desarrolladores, generación de certificados SSL/de tienda, cumplimiento de políticas de privacidad y acompañamiento técnico hasta que tu app sea aprobada e indexada en las tiendas.',
  },
  {
    q: '¿El código fuente del desarrollo me pertenece?',
    a: 'Sí. Todo el software desarrollado es 100% de tu propiedad intelectual. Al finalizar el proyecto, te entregamos formalmente los repositorios privados de GitHub y te damos acceso total de administrador a los servidores y consolas de base de datos.',
  },
  {
    q: '¿Cómo se estructuran los pagos del proyecto?',
    a: 'Dividimos el costo en hitos de entrega. Típicamente iniciamos con un 30% como anticipo para la fase de UX/UI, un 30% a mitad del desarrollo técnico tras probar el primer entregable funcional, un 30% al finalizar las pruebas integrales de QA, y el 10% final tras la publicación oficial.',
  },
  {
    q: '¿Qué sucede si hay fallos o actualizaciones necesarias después del lanzamiento?',
    a: 'Brindamos 30 días de soporte de garantía premium completamente gratuito para corregir cualquier anomalía. Posteriormente, ofrecemos planes flexibles de mantenimiento mensual que cubren monitoreo de servidores, optimización de base de datos, copias de seguridad automáticas y soporte técnico continuo.',
  },
]

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {DEFAULT_FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx

        return (
          <div
            key={idx}
            className={cn(
              'glass-card rounded-2xl overflow-hidden border border-white/5 bg-surface/30 transition-all duration-300',
              isOpen ? 'border-accent/305 shadow-lg' : 'hover:border-white/10'
            )}
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="flex w-full items-center justify-between p-5 text-left md:p-6"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-bold text-white transition-colors duration-200 hover:text-(--color-accent) md:text-base pr-4">
                {faq.q}
              </span>
              <span className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-transform duration-300',
                isOpen ? 'rotate-180 border-accent/30 text-(--color-accent) bg-accent/10' : ''
              )}>
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="border-t border-white/5 px-5 pb-5 pt-4 text-xs md:text-sm leading-relaxed text-neutral-400 md:px-6 md:pb-6 font-medium">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default FAQAccordion
