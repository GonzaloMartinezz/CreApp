import React from 'react'

export function D({ className = '' }: { className?: string }) {
  return <div aria-hidden className={`h-px w-full bg-current opacity-[0.18] ${className}`} />
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] opacity-70">
      {children}
    </p>
  )
}
