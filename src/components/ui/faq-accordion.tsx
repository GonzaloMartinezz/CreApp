import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Terminal, Cloud, Plug, Code, Server, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FAQItem {
  q: string
  a: string
  icon: React.ReactNode
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    q: '¿Qué tecnologías de desarrollo utilizas para construir las plataformas?',
    a: 'Me especializo en stacks modernos y robustos. Utilizo React, Next.js y TailwindCSS para interfaces web ultrarrápidas, React Native para aplicaciones móviles (iOS y Android), y Node.js con bases de datos SQL/NoSQL para arquitecturas backend seguras y escalables.',
    icon: <Terminal className="w-5 h-5" />
  },
  {
    q: '¿Cómo garantizas que la aplicación sea escalable si mi negocio crece?',
    a: 'Diseño la arquitectura del software desde el día uno pensando en el crecimiento. Utilizo servicios en la nube (AWS, Google Cloud o Vercel), bases de datos optimizadas y un código limpio y modularizado que permite agregar nuevas funcionalidades y soportar miles de usuarios simultáneos sin caídas.',
    icon: <Cloud className="w-5 h-5" />
  },
  {
    q: '¿Es posible integrar la app con sistemas que ya utilizo (ERPs, Pagos)?',
    a: 'Sí, totalmente. Desarrollo integraciones mediante APIs REST o Webhooks para conectar tu nueva plataforma con herramientas externas como pasarelas de pago (MercadoPago, Stripe), CRMs, o sistemas de logística e inventario internos.',
    icon: <Plug className="w-5 h-5" />
  },
  {
    q: '¿Me entregas el código fuente y la documentación técnica?',
    a: 'Por supuesto. Al finalizar el proyecto, el código fuente es 100% de tu propiedad. Te entrego los repositorios de GitHub y la documentación técnica necesaria para que cualquier otro equipo de desarrollo pueda entender y expandir la plataforma en el futuro.',
    icon: <Code className="w-5 h-5" />
  },
  {
    q: '¿Cómo es el proceso de despliegue y mantenimiento posterior?',
    a: 'Me encargo de configurar los servidores de producción y el despliegue automático (CI/CD). Una vez lanzada la app, ofrezco planes de mantenimiento que incluyen monitoreo continuo, actualizaciones de seguridad y copias de seguridad automáticas de la base de datos.',
    icon: <Server className="w-5 h-5" />
  },
  {
    q: '¿Cómo calculas los tiempos y cuál es tu metodología de trabajo?',
    a: 'Trabajo con metodologías ágiles dividiendo el proyecto en hitos entregables. Esto te permite probar módulos funcionales cada pocas semanas. Un Producto Mínimo Viable (MVP) suele tomar entre 4 y 8 semanas, asegurando iteraciones rápidas y feedback constante.',
    icon: <Clock className="w-5 h-5" />
  },
]

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="mx-auto max-w-6xl w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
        {DEFAULT_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx

          return (
            <div
              key={idx}
              className={cn(
                'rounded-[2rem] overflow-hidden border bg-[#050505] transition-all duration-300 relative group',
                isOpen ? 'border-[#b7bd7f]/30 shadow-[0_0_30px_rgba(183,189,127,0.05)]' : 'border-white/5 hover:border-white/10 hover:bg-[#0a0a0a]'
              )}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <button
                onClick={() => toggleFAQ(idx)}
                className="relative z-10 flex w-full items-center justify-between p-6 md:p-8 text-left"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4 md:gap-6 pr-4">
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-300",
                    isOpen ? "bg-[#b7bd7f]/10 border-[#b7bd7f]/30 text-[#b7bd7f]" : "bg-white/5 border-white/10 text-neutral-400 group-hover:text-white"
                  )}>
                    {faq.icon}
                  </div>
                  <span className={cn(
                    "text-sm md:text-base font-bold transition-colors duration-200 tracking-tight",
                    isOpen ? "text-white" : "text-neutral-300 group-hover:text-white"
                  )}>
                    {faq.q}
                  </span>
                </div>
                <span className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                  isOpen ? 'rotate-180 border-[#b7bd7f]/30 text-[#b7bd7f] bg-[#b7bd7f]/10' : 'border-white/10 bg-white/5 text-neutral-400 group-hover:text-white'
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
                    <div className="relative z-10 px-6 pb-8 pt-2 md:px-8 md:pb-10 md:pt-2">
                       <div className="pl-0 md:pl-[4.5rem]">
                         <p className="text-sm md:text-base leading-relaxed text-neutral-400 font-medium">
                           {faq.a}
                         </p>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FAQAccordion
