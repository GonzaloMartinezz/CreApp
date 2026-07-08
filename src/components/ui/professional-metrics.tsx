"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Rocket, ShieldCheck, Clock, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CounterProps {
  value: string
}

function AnimatedCounter({ value }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  const target = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500
    const increment = target / (duration / 16)
    let timer: any

    const updateCount = () => {
      start += increment
      if (start >= target) {
        setCount(target)
      } else {
        setCount(Math.floor(start))
        timer = setTimeout(updateCount, 16)
      }
    }

    updateCount()
    return () => clearTimeout(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-md">
      {count}
      <span className="text-neutral-400">{suffix}</span>
    </span>
  )
}

interface ProfessionalMetricsProps {
  metrics: {
    icon: 'rocket' | 'shield' | 'clock' | 'star'
    value: string
    label: string
    description: string
  }[]
}

const icons = {
  rocket: Rocket,
  shield: ShieldCheck,
  clock: Clock,
  star: Star,
}

export function ProfessionalMetrics({ metrics }: ProfessionalMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mt-12 relative z-10">
      {metrics.map((metric, idx) => {
        const Icon = icons[metric.icon]
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-900/40 p-6 md:p-8 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-neutral-800/60 hover:shadow-2xl hover:shadow-white/5"
          >
            {/* Background Glow Effect on Hover */}
            <div className="absolute -inset-10 bg-linear-to-br from-white/5 to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />
            
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950/80 border border-white/10 text-neutral-300 mb-8 shadow-inner transition-colors duration-500 group-hover:border-white/30 group-hover:text-white">
              <Icon className="size-6 drop-shadow-sm" />
            </div>

            <div className="flex flex-col gap-2 relative z-10">
              <AnimatedCounter value={metric.value} />
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300 mt-2 transition-colors group-hover:text-white">
                {metric.label}
              </h3>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed mt-1">
                {metric.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
