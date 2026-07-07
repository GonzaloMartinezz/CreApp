import React from "react";
import { Fingerprint, ArrowDown, Shield, Users } from "lucide-react";

export function BentoGridFeatures() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-16 px-4 pb-20 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:gap-6">

        {/* Card 1: 100% Personalizable */}
        <div className="col-span-1 md:col-span-2 bg-[#0a0a0a] hover:bg-neutral-900 active:bg-neutral-800 cursor-pointer border border-white/5 rounded-4xl p-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-6">
              <span className="text-6xl font-black tracking-tighter text-white">100%</span>
              {/* Hand-drawn style oval */}
              <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] text-neutral-600/50 -z-10" viewBox="0 0 200 100" preserveAspectRatio="none">
                <ellipse cx="100" cy="50" rx="90" ry="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Personalizable</h3>
          </div>
        </div>

        {/* Card 2: Seguridad por defecto */}
        <div className="col-span-1 md:col-span-2 bg-[#0a0a0a] hover:bg-neutral-900 active:bg-neutral-800 cursor-pointer border border-white/5 rounded-4xl p-8 flex flex-col items-center justify-center text-center min-h-[300px] relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Fingerprint className="w-8 h-8 text-neutral-300" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-3">Seguridad por defecto</h3>
            <p className="text-sm text-neutral-500 font-medium leading-relaxed max-w-[250px] mx-auto">
              Implementamos los estándares de seguridad más estrictos para proteger la información de tu negocio.
            </p>
          </div>
        </div>

        {/* Card 3: Rendimiento Superior */}
        <div className="col-span-1 md:col-span-2 bg-[#0a0a0a] hover:bg-neutral-900 active:bg-neutral-800 cursor-pointer border border-white/5 rounded-4xl p-8 flex flex-col min-h-[300px] relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />
          <div className="relative z-10 w-full h-full flex flex-col justify-between">
            <div className="w-full h-24 relative overflow-hidden flex items-end">
              <div className="w-full flex justify-between text-[10px] text-neutral-500 font-bold mb-2 uppercase tracking-widest absolute top-0">
                <span className="flex items-center gap-1"><ArrowDown className="w-3 h-3" /> Download</span>
                <span>14,34 mbps</span>
              </div>
              {/* Abstract Line Graph */}
              <svg className="w-full h-16 text-neutral-600/50" viewBox="0 0 200 50" preserveAspectRatio="none">
                <path d="M0,40 Q20,30 40,35 T80,20 T120,25 T160,10 T200,15 L200,50 L0,50 Z" fill="currentColor" opacity="0.3" />
                <path d="M0,40 Q20,30 40,35 T80,20 T120,25 T160,10 T200,15" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="text-center mt-6">
              <h3 className="text-lg font-bold text-white tracking-tight mb-3">Rendimiento Superior</h3>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed max-w-[250px] mx-auto">
                Código optimizado y arquitecturas modernas que garantizan tiempos de carga ultrarrápidos.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Métricas en Tiempo Real */}
        <div className="col-span-1 md:col-span-3 bg-[#0a0a0a] hover:bg-neutral-900 active:bg-neutral-800 cursor-pointer border border-white/5 rounded-4xl p-8 flex flex-col md:flex-row items-center gap-8 min-h-[250px] relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />

          <div className="relative z-10 flex-1 w-full text-center md:text-left">
            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 mx-auto md:mx-0">
              <Shield className="w-5 h-5 text-neutral-300" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-3">Métricas en tiempo real</h3>
            <p className="text-sm text-neutral-500 font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
              Monitoreá el estado de tu plataforma, ventas e interacciones en un dashboard intuitivo. Toma decisiones basadas en datos.
            </p>
          </div>

          <div className="relative z-10 w-full md:w-1/2 h-32 md:h-full border border-white/10 rounded-xl bg-black/50 p-4 overflow-hidden mt-6 md:mt-0">
            <div className="flex gap-1 mb-4">
              <div className="w-2 h-2 rounded-full bg-neutral-700" />
              <div className="w-2 h-2 rounded-full bg-neutral-700" />
              <div className="w-2 h-2 rounded-full bg-neutral-700" />
            </div>
            {/* Squiggly line */}
            <div className="absolute bottom-4 left-4 right-4 h-16 flex items-end">
              <svg className="w-full h-full text-white" viewBox="0 0 200 100" preserveAspectRatio="none">
                <polyline points="0,80 10,70 20,85 40,50 50,60 70,30 80,45 100,20 110,40 130,10 140,25 150,15 170,40 180,30 200,0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 5: Gestión de Usuarios */}
        <div className="col-span-1 md:col-span-3 bg-[#0a0a0a] hover:bg-neutral-900 active:bg-neutral-800 cursor-pointer border border-white/5 rounded-4xl p-8 flex flex-col md:flex-row items-center gap-8 min-h-[250px] relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />

          <div className="relative z-10 flex-1 w-full text-center md:text-left">
            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 mx-auto md:mx-0">
              <Users className="w-5 h-5 text-neutral-300" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-3">Gestión integral de usuarios</h3>
            <p className="text-sm text-neutral-500 font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
              Administrá accesos, roles y permisos de tu equipo o clientes de forma centralizada y escalable.
            </p>
          </div>

          <div className="relative z-10 w-full md:w-1/2 h-40 md:h-full flex flex-col justify-center items-center md:items-end gap-3 mt-6 md:mt-0 md:pr-4">
            <div className="flex items-center gap-2 bg-neutral-900 border border-white/10 rounded-full py-1.5 px-3 md:translate-x-4">
              <span className="text-[10px] font-bold text-white">Admin</span>
              <div className="w-6 h-6 rounded-full bg-blue-500 overflow-hidden flex items-center justify-center text-xs font-bold text-white">GM</div>
            </div>
            <div className="flex items-center gap-2 bg-neutral-900 border border-white/10 rounded-full py-1.5 px-3 md:-translate-x-8">
              <div className="w-6 h-6 rounded-full bg-emerald-500 overflow-hidden flex items-center justify-center text-xs font-bold text-white">CL</div>
              <span className="text-[10px] font-bold text-white">Cliente</span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-900 border border-white/10 rounded-full py-1.5 px-3 md:translate-x-2">
              <span className="text-[10px] font-bold text-white">Editor</span>
              <div className="w-6 h-6 rounded-full bg-purple-500 overflow-hidden flex items-center justify-center text-xs font-bold text-white">ED</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
