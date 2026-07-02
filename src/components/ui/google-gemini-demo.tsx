"use client";
import React from "react";
import { ParticleNetwork } from "@/components/ui/particle-network";

export function GoogleGeminiEffectDemo() {
  return (
    <div className="h-[100vh] w-full relative border-t border-[var(--color-border)]">
      <ParticleNetwork>
        <div className="flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="text-4xl md:text-6xl lg:text-8xl font-bold pb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-500 uppercase tracking-tight mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            CONECTÁ TU NEGOCIO
          </div>
          <div className="text-base md:text-xl font-medium text-neutral-400 mt-4 max-w-3xl mx-auto leading-relaxed">
            Llevá tus procesos manuales al siguiente nivel con una integración 100% digital.
          </div>
        </div>
      </ParticleNetwork>
    </div>
  );
}
