"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AccordionFeature {
  id: string
  title: string
  count: number
  iconSrc: string
  imageSrc: string
  subtitle: string
  link?: string
}

interface FeaturesAccordionProps {
  features: AccordionFeature[]
  className?: string
}

export function FeaturesAccordion({ features, className }: FeaturesAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <div className={cn("w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#0B0B0C] p-4 md:p-6 shadow-2xl", className)}>
      <div className="flex flex-col gap-2">
        {features.map((feature, idx) => {
          const isOpen = openIndex === idx

          return (
            <div
              key={feature.id}
              className={cn(
                "group flex flex-col rounded-2xl transition-colors duration-300",
                isOpen ? "" : "hover:bg-white/5"
              )}
            >
              {/* Accordion Header */}
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="flex w-full items-center justify-between p-4 md:p-5 outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl"
              >
                <div className="flex items-center gap-4">
                  {/* Small Icon Thumbnail */}
                  <div className="flex h-10 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/10 border border-white/5 shadow-inner">
                    <img
                      src={feature.iconSrc}
                      alt={feature.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-left text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                    {feature.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-neutral-400">
                  <span className="text-sm font-medium">({feature.count})</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-6 md:px-5 md:pb-8 pt-2">
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 relative aspect-video">
                        <img
                          src={feature.imageSrc}
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-6 text-center text-[clamp(1rem,1.5vw,1.2rem)] font-medium text-neutral-300">
                        {feature.subtitle}
                        {feature.link && (
                          <a
                            href={feature.link}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 block text-accent-400 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors"
                          >
                            Ver Proyecto ↗
                          </a>
                        )}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Divider line (unless it's the last item and it's not open) */}
              {idx !== features.length - 1 && (
                <div className="h-[1px] w-[calc(100%-2rem)] mx-auto bg-white/5 mt-1" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
