import React, { useRef, useState, memo } from 'react'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ServiceCardProps {
  title: string
  desc: string
  iconName: string
  className?: string
}

export const ServiceCard = memo(function ServiceCard({ title, desc, iconName, className }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glowX, setGlowX] = useState(50)
  const [glowY, setGlowY] = useState(50)
  const [isHovered, setIsHovered] = useState(false)

  // Dynamically resolve icon from string
  const LucideIcon = (Icons as any)[iconName] || Icons.HelpCircle

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Mouse position relative to the element (from 0 to width/height)
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate percentage coordinates (for glow gradient)
    const percentX = (mouseX / width) * 100
    const percentY = (mouseY / height) * 100
    setGlowX(percentX)
    setGlowY(percentY)

    // Calculate 3D tilt angles (max 10 degrees)
    const degX = ((mouseY / height) - 0.5) * -12
    const degY = ((mouseX / width) - 0.5) * 12
    setRotateX(degX)
    setRotateY(degY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative flex h-full flex-col justify-between rounded-3xl p-6 md:p-8',
        'glass-card overflow-hidden transition-all duration-500 ease-out',
        className
      )}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        willChange: 'transform',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Laser light perimetral glow follows the mouse */}
      <div
        className={cn(
          'absolute inset-0 pointer-events-none transition-opacity duration-500',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          background: `radial-gradient(circle 180px at ${glowX}% ${glowY}%, rgba(139, 94, 52, 0.15), transparent 80%)`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Floating vector icon */}
      <div
        className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-surface-2) text-(--color-accent) transition-all duration-500 group-hover:border-(--color-accent) group-hover:bg-(--color-surface) group-hover:scale-110"
        style={{ transform: 'translateZ(20px)' }}
      >
        <LucideIcon className="h-7 w-7 stroke-[1.5] transition-transform duration-500 group-hover:rotate-6" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-end" style={{ transform: 'translateZ(10px)' }}>
        <h3 className="mb-3 text-lg font-bold text-(--color-foreground) transition-colors duration-300 group-hover:text-(--color-accent) md:text-xl">
          {title}
        </h3>
        <p className="text-sm font-medium leading-relaxed text-(--color-muted) group-hover:text-(--color-foreground) transition-colors duration-300">
          {desc}
        </p>
      </div>

      {/* Underline aesthetic border */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-primary to-primary-3 transition-all duration-500"
        style={{ width: isHovered ? '100%' : '0%' }}
      />
    </div>
  )
})
