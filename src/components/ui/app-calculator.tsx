import { useState, useMemo } from 'react'
import { Laptop, ShoppingBag, Layers, Shield, CreditCard, Bell, Database, MessageSquare, Brain, LayoutGrid, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function AppCalculator() {
  // Project Type selection
  const [projectType, setProjectType] = useState<'landing' | 'ecommerce' | 'fullstack'>('landing')
  // Admin panel selection
  const [needAdmin, setNeedAdmin] = useState<boolean>(false)
  // Screens slider
  const [screens, setScreens] = useState<number>(3)

  // Feature selections (Checkboxes)
  const [features, setFeatures] = useState({
    auth: false,
    payments: false,
    notifications: false,
    chat: false,
    ai: false,
  })

  // Costs mapping
  const costs = useMemo(() => {
    let basePrice = 0
    let devWeeks = 0

    // Project Type Base
    if (projectType === 'landing') {
      basePrice = 500
      devWeeks = 1.5
    } else if (projectType === 'ecommerce') {
      basePrice = 800
      devWeeks = 3
    } else {
      basePrice = 1000
      devWeeks = 5
    }

    // Admin Panel option
    if (needAdmin) {
      basePrice += 300
      devWeeks += 1
    }

    // Extra views/sections (base includes 3 views/sections)
    if (screens > 3) {
      basePrice += (screens - 3) * 40
      devWeeks += Math.ceil((screens - 3) / 5) * 0.5
    }

    // Features
    if (features.auth) {
      basePrice += 150
      devWeeks += 0.5
    }
    if (features.payments) {
      basePrice += 250
      devWeeks += 0.5
    }
    if (features.notifications) {
      basePrice += 100
      devWeeks += 0.5
    }
    if (features.chat) {
      basePrice += 200
      devWeeks += 1
    }
    if (features.ai) {
      basePrice += 350
      devWeeks += 1
    }

    // Ranges for realistic estimates
    const minPrice = Math.round(basePrice * 0.95)
    const maxPrice = Math.round(basePrice * 1.1)
    const minWeeks = Math.max(1, Math.round(devWeeks * 0.85))
    const maxWeeks = Math.ceil(devWeeks * 1.15)

    return { minPrice, maxPrice, minWeeks, maxWeeks }
  }, [projectType, needAdmin, screens, features])

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Pre-fill WhatsApp message link generator for Gonzalo
  const whatsappUrl = useMemo(() => {
    const typeLabel = projectType === 'landing' ? 'Landing Page Profesional' : projectType === 'ecommerce' ? 'E-Commerce Autogestionable' : 'App Fullstack Completa'
    const adminLabel = needAdmin ? 'Sí, incluye administrador' : 'No requiere'
    const activeFeatures = Object.entries(features)
      .filter(([_, active]) => active)
      .map(([name]) => {
        const labels: Record<string, string> = {
          auth: 'Registro / Login',
          payments: 'Pasarela de Pagos',
          notifications: 'Notificaciones Push',
          chat: 'Chat en Tiempo Real',
          ai: 'Integración IA',
        }
        return labels[name] || name
      })
      .join(', ')

    const text = `¡Hola Gonzalo! 👋 Usé tu cotizador de proyectos y me gustaría hablar sobre un desarrollo:\n\n` +
      `💻 Proyecto: ${typeLabel}\n` +
      `🛡️ Panel de Admin: ${adminLabel}\n` +
      `📏 Vistas/Secciones: ~${screens} vistas\n` +
      `⚡ Funciones: ${activeFeatures || 'Básicas'}\n\n` +
      `💵 Estimado: $${costs.minPrice.toLocaleString()} - $${costs.maxPrice.toLocaleString()} USD\n` +
      `⏱️ Plazo: ${costs.minWeeks} - ${costs.maxWeeks} semanas\n\n` +
      `¿Cuándo podríamos coordinar una reunión de descubrimiento?`

    // WhatsApp link for Gonzalo
    return `https://wa.me/5491122334455?text=${encodeURIComponent(text)}`
  }, [projectType, needAdmin, screens, features, costs])

  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-white/5 bg-background/40 p-6 backdrop-blur-md md:p-10 shadow-2xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        {/* Left Column: Form Controls */}
        <div className="space-y-8">
          {/* Section title */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-(--color-accent)">
              Cotizador Inteligente
            </span>
            <h3 className="mt-2 text-2xl font-black text-white md:text-3xl">
              Configurá tu Proyecto
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              Selecciona las opciones necesarias y estima el presupuesto ideal para el desarrollo de tu plataforma al instante.
            </p>
          </div>

          {/* 1. Project Type Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              1. Tipo de Proyecto / Plataforma
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { id: 'landing', label: 'Landing Page', desc: 'Profesional (Base $500)', icon: Laptop },
                { id: 'ecommerce', label: 'E-Commerce', desc: 'Tienda Online (Base $800)', icon: ShoppingBag },
                { id: 'fullstack', label: 'App Fullstack', desc: 'Híbrida/Negocios (Base $1000)', icon: Layers },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setProjectType(item.id as any)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-3 rounded-2xl border p-4 text-center transition-all duration-300 cursor-pointer',
                      projectType === item.id
                        ? 'border-(--color-accent) bg-[rgba(167,139,250,0.08)] text-white'
                        : 'border-white/5 bg-white/2 text-neutral-400 hover:border-white/10 hover:text-white'
                    )}
                  >
                    <Icon className="h-6 w-6 stroke-[1.5]" />
                    <div>
                      <p className="text-xs font-bold">{item.label}</p>
                      <p className="mt-0.5 text-[10px] text-neutral-500">{item.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Admin Panel Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              2. ¿Necesitás Panel de Administrador?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: false, label: 'No Requiere', desc: 'Gestión estándar' },
                { value: true, label: 'Incluir Panel Admin', desc: 'Base de datos y ABM (+$300)' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setNeedAdmin(item.value)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition-all duration-300 cursor-pointer',
                    needAdmin === item.value
                      ? 'border-(--color-accent) bg-[rgba(167,139,250,0.08)] text-white'
                      : 'border-white/5 bg-white/2 text-neutral-400 hover:border-white/10 hover:text-white'
                  )}
                >
                  <Database className="h-5 w-5 stroke-[1.5]" />
                  <div>
                    <p className="text-xs font-bold">{item.label}</p>
                    <p className="mt-0.5 text-[10px] text-neutral-500">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Screens slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-300">
                3. Cantidad de Secciones o Vistas
              </label>
              <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-bold text-(--color-accent)">
                {screens} {screens === 1 ? 'sección / vista' : 'secciones / vistas'}
              </span>
            </div>
            <p className="text-[10px] text-neutral-400">
              (El base incluye 3 vistas. Cada vista adicional agrega $40 USD)
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-neutral-500">1</span>
              <input
                type="range"
                min="1"
                max="20"
                value={screens}
                onChange={(e) => setScreens(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-(--color-accent)"
              />
              <span className="text-xs text-neutral-500">20+</span>
            </div>
          </div>

          {/* 4. Features grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              4. Módulos & Funcionalidades Extra
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { key: 'auth', label: 'Registro / Login', desc: 'Email, Google e historial (+$150)', icon: Shield },
                { key: 'payments', label: 'Cobros e Integraciones', desc: 'Stripe, PayPal, MercadoPago (+$250)', icon: CreditCard },
                { key: 'notifications', label: 'Notificaciones Push', desc: 'Alertas en tiempo real (+$100)', icon: Bell },
                { key: 'chat', label: 'Chat Integrado', desc: 'Mensajería y soporte interno (+$200)', icon: MessageSquare },
                { key: 'ai', label: 'Motores de IA', desc: 'Automatización y asistentes GPT (+$350)', icon: Brain },
              ].map((item) => {
                const Icon = item.icon
                const isSelected = (features as any)[item.key]
                return (
                  <button
                    key={item.key}
                    onClick={() => toggleFeature(item.key as any)}
                    className={cn(
                      'flex items-center gap-4 rounded-2xl border p-3.5 text-left transition-all duration-300 cursor-pointer',
                      isSelected
                        ? 'border-(--color-accent) bg-[rgba(167,139,250,0.08)] text-white'
                        : 'border-white/5 bg-white/2 text-neutral-400 hover:border-white/10 hover:text-white'
                    )}
                  >
                    <div className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300',
                      isSelected ? 'bg-accent/20 text-(--color-accent)' : 'bg-white/5 text-neutral-500'
                    )}>
                      <Icon className="h-5 w-5 stroke-[1.5]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{item.label}</p>
                      <p className="mt-0.5 text-[10px] text-neutral-500">{item.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Price Summary Block */}
        <div className="flex flex-col justify-between rounded-2xl bg-white/2 p-6 md:p-8 border border-white/5">
          <div className="space-y-6">
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-green-400">
              ● Presupuesto en tiempo real
            </span>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Inversión Estimada
              </p>
              <h4 className="mt-3 text-3xl font-black text-white md:text-5xl leading-none tracking-tight">
                ${costs.minPrice.toLocaleString()}{' '}
                <span className="text-lg md:text-2xl font-normal text-neutral-400">
                  - ${costs.maxPrice.toLocaleString()}
                </span>
                <span className="ml-1 text-sm font-bold text-neutral-500 uppercase tracking-widest block mt-2">
                  USD final
                </span>
              </h4>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Tiempo de Entrega
                </p>
                <p className="mt-1 text-base font-extrabold text-white">
                  {costs.minWeeks} a {costs.maxWeeks} semanas
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Metodología
                </p>
                <p className="mt-1 text-base font-extrabold text-white">
                  Scrum Ágil (Gonzalo M.)
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-(--color-accent)">
                ¿Qué incluye tu presupuesto?
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                <li>✓ Código fuente y repositorio en Github</li>
                <li>✓ Estructura de vistas optimizada</li>
                <li>✓ Configuración inicial de hosting</li>
                <li>✓ Soporte técnico directo por 30 días</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button
              asChild
              variant="primary"
              size="xl"
              className="w-full justify-center text-sm font-bold shadow-[0_8px_30px_rgba(124,58,237,0.35)]"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                💬 Enviar cotización a Gonzalo
              </a>
            </Button>
            <p className="text-center text-[10px] text-neutral-500">
              Análisis y asesoramiento 100% gratuito sin compromiso.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppCalculator
