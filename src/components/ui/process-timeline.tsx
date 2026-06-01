import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, PenTool, Code2, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ProcessStep {
  num: string
  title: string
  desc: string
  iconName: string
  color: string
}

const DEFAULT_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Descubrimiento & Estrategia',
    desc: 'Analizamos a fondo tu modelo de negocio, definimos las metas operativas e investigamos detalladamente la experiencia ideal para tus usuarios.',
    iconName: 'Search',
    color: 'from-[#4a2c11] to-[#78350f]',
  },
  {
    num: '02',
    title: 'Diseño UX/UI & Prototipado',
    desc: 'Creamos interfaces modernas de alta fidelidad. Diseñamos prototipos totalmente interactivos y navegables antes de comenzar a escribir código.',
    iconName: 'PenTool',
    color: 'from-[#78350f] to-[#b45309]',
  },
  {
    num: '03',
    title: 'Desarrollo de Software ágil',
    desc: 'Programamos tu app con código escalable, limpio y testeado. Realizamos entregas continuas semanales en un servidor de pruebas dedicado.',
    iconName: 'Code2',
    color: 'from-[#b45309] to-[#d97706]',
  },
  {
    num: '04',
    title: 'Lanzamiento & Escalabilidad',
    desc: 'Publicamos tu app en las tiendas de Apple y Google o en servidores Cloud optimizados, y te brindamos soporte de infraestructura post-lanzamiento.',
    iconName: 'Rocket',
    color: 'from-[#d97706] to-[#f59e0b]',
  },
]

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress inside the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Fills the vertical timeline bar based on scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const iconsMap: Record<string, any> = {
    Search: Search,
    PenTool: PenTool,
    Code2: Code2,
    Rocket: Rocket,
  }

  return (
    <div ref={containerRef} className="relative mx-auto max-w-4xl px-4 py-8">
      {/* Central Connector Line */}
      <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-white/5 md:left-1/2 md:-ml-0.25">
        {/* Scroll-Linked Fill Line */}
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute inset-x-0 top-0 bottom-0 bg-linear-to-b from-[#4a2c11] via-[#b45309] to-[#f59e0b] shadow-[0_0_12px_rgba(180,83,9,0.35)]"
        />
      </div>

      <div className="flex flex-col gap-12 md:gap-24">
        {DEFAULT_STEPS.map((step, idx) => {
          const StepIcon = iconsMap[step.iconName] || Search
          const isEven = idx % 2 === 0

          return (
            <div
              key={step.num}
              className={cn(
                'relative flex flex-col md:flex-row items-start md:items-center',
                isEven ? 'md:justify-start' : 'md:justify-end'
              )}
            >
              {/* Central Glowing Icon Node */}
              <div
                className={cn(
                  'absolute left-6 -translate-x-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-neutral-800 bg-background',
                  'md:left-1/2 md:-translate-x-1/2 shadow-lg shadow-black/80'
                )}
              >
                <div className={cn('flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr text-white shadow-inner', step.color)}>
                  <StepIcon className="h-4 w-4" />
                </div>
              </div>

              {/* Step Card Content */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={cn(
                  'w-full pl-16 md:pl-0 md:w-[42%]',
                  isEven ? 'md:text-right md:pr-0' : 'md:text-left md:pl-0'
                )}
              >
                <div className="glass-card glass-card-hover rounded-3xl p-6 md:p-8">
                  {/* Step Number Badge */}
                  <span className={cn(
                    'inline-block mb-3 rounded-full bg-linear-to-r px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white',
                    step.color
                  )}>
                    Paso {step.num}
                  </span>

                  <h3 className="mb-3 text-lg font-black text-white md:text-xl">
                    {step.title}
                  </h3>

                  <p className="text-sm font-medium leading-relaxed text-neutral-400">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProcessTimeline
