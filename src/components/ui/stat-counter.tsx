import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface StatCounterProps {
  value: string
  label: string
}

export function StatCounter({ value, label }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  const target = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500 // 1.5 seconds
    const increment = target / (duration / 16) // ~60fps
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
    <div className="flex flex-col gap-1">
      <span ref={ref} className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-none tracking-tight">
        {count}
        {suffix}
      </span>
      <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] opacity-60">
        {label}
      </span>
    </div>
  )
}
