"use client";
import React from "react";
import { ParticleNetwork } from "@/components/ui/particle-network";
import { BentoGridFeatures } from "@/components/ui/bento-grid-features";

export function GoogleGeminiEffectDemo() {
  return (
    <div className="min-h-screen w-full relative border-t border-(--color-border) bg-[#030303] py-24 flex flex-col justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <ParticleNetwork />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <div className="text-4xl md:text-6xl lg:text-8xl font-bold pb-4 bg-clip-text text-transparent bg-linear-to-b from-neutral-100 to-neutral-500 uppercase tracking-tight mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          CONECTÁ TU NEGOCIO
        </div>
        <div className="text-base md:text-xl font-medium text-neutral-400 mt-4 max-w-3xl mx-auto leading-relaxed">
          Llevá tus procesos manuales al siguiente nivel con una integración 100% digital.
        </div>

        <BentoGridFeatures />
      </div>
    </div>
  );
}
