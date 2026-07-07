import { useState, useMemo } from 'react'
import { Laptop, ShoppingBag, Layers, Shield, CreditCard, Bell, Database, MessageSquare, Brain, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/LanguageContext'

export function AppCalculator() {
  const { t } = useLanguage()

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

    const text = `¡Hola Gonzalo! 👋 Configuré los requerimientos para mi proyecto y me gustaría solicitar una cotización:\n\n` +
      `💻 Tipo de Proyecto: ${typeLabel}\n` +
      `🛡️ Panel de Admin: ${adminLabel}\n` +
      `📏 Pantallas estimadas: ${screens}\n` +
      `⚡ Funciones Extra: ${activeFeatures || 'Ninguna adicional'}\n\n` +
      `¿Podemos coordinar para hablar de los detalles?`

    // WhatsApp link for Gonzalo
    return `https://wa.me/5493816242482?text=${encodeURIComponent(text)}`
  }, [projectType, needAdmin, screens, features])

  const activeFeaturesList = Object.entries(features)
    .filter(([_, active]) => active)
    .map(([name]) => name);

  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-white/5 bg-(--color-surface) bg-dots-pattern p-6 md:p-10 shadow-[0_0_50px_rgba(34,197,94,0.05)] font-bold **:font-bold relative overflow-hidden">
      {/* Subtle green ambient glow */}
      <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-green-500/10 blur-[120px] pointer-events-none" />
      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        {/* Left Column: Form Controls */}
        <div className="space-y-8">
          {/* Section title */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-(--color-accent)">
              {t('calc.subtitle')}
            </span>
            <h3 className="mt-2 text-2xl font-black text-(--color-foreground) md:text-3xl">
              {t('calc.title')}
            </h3>
            <p className="mt-2 text-sm text-(--color-muted)">
              {t('calc.desc')}
            </p>
          </div>

          {/* 1. Project Type Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-(--color-foreground)">
              {t('calc.step1')}
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { id: 'landing', label: t('calc.type.landing'), desc: t('calc.type.landing.desc'), icon: Laptop },
                { id: 'ecommerce', label: t('calc.type.ecommerce'), desc: t('calc.type.ecommerce.desc'), icon: ShoppingBag },
                { id: 'fullstack', label: t('calc.type.fullstack'), desc: t('calc.type.fullstack.desc'), icon: Layers },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setProjectType(item.id as any)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-3 rounded-2xl border p-4 text-center transition-all duration-300 cursor-pointer',
                      projectType === item.id
                        ? 'border-(--color-accent) bg-(--color-surface-2) text-(--color-foreground) shadow-md'
                        : 'border-(--color-border) bg-(--color-background) text-(--color-muted) hover:border-(--color-accent) hover:text-(--color-foreground)'
                    )}
                  >
                    <Icon className="h-6 w-6 stroke-[1.5]" />
                    <div>
                      <p className="text-xs font-bold">{item.label}</p>
                      <p className="mt-0.5 text-[10px] opacity-70">{item.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Admin Panel Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-(--color-foreground)">
              {t('calc.step2')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: false, label: t('calc.admin.no'), desc: t('calc.admin.no.desc') },
                { value: true, label: t('calc.admin.yes'), desc: t('calc.admin.yes.desc') },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setNeedAdmin(item.value)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition-all duration-300 cursor-pointer',
                    needAdmin === item.value
                      ? 'border-(--color-accent) bg-(--color-surface-2) text-(--color-foreground) shadow-md'
                      : 'border-(--color-border) bg-(--color-background) text-(--color-muted) hover:border-(--color-accent) hover:text-(--color-foreground)'
                  )}
                >
                  <Database className="h-5 w-5 stroke-[1.5]" />
                  <div>
                    <p className="text-xs font-bold">{item.label}</p>
                    <p className="mt-0.5 text-[10px] opacity-70">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Screens slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-(--color-foreground)">
                {t('calc.step3')}
              </label>
              <span className="rounded-md bg-(--color-accent)/10 px-2.5 py-1 text-xs font-bold text-(--color-accent)">
                {screens} {screens === 1 ? t('calc.screens.unit') : t('calc.screens.units')}
              </span>
            </div>
            <p className="text-[10px] text-(--color-muted)">
              {t('calc.screens.desc')}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-(--color-muted)">1</span>
              <input
                type="range"
                min="1"
                max="20"
                value={screens}
                onChange={(e) => setScreens(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-(--color-border) accent-(--color-accent)"
              />
              <span className="text-xs text-(--color-muted)">20+</span>
            </div>
          </div>

          {/* 4. Features grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-(--color-foreground)">
              {t('calc.step4')}
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { key: 'auth', label: t('calc.feat.auth'), desc: t('calc.feat.auth.desc'), icon: Shield },
                { key: 'payments', label: t('calc.feat.payments'), desc: t('calc.feat.payments.desc'), icon: CreditCard },
                { key: 'notifications', label: t('calc.feat.notifications'), desc: t('calc.feat.notifications.desc'), icon: Bell },
                { key: 'chat', label: t('calc.feat.chat'), desc: t('calc.feat.chat.desc'), icon: MessageSquare },
                { key: 'ai', label: t('calc.feat.ai'), desc: t('calc.feat.ai.desc'), icon: Brain },
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
                        ? 'border-(--color-accent) bg-(--color-surface-2) text-(--color-foreground) shadow-md'
                        : 'border-(--color-border) bg-(--color-background) text-(--color-muted) hover:border-(--color-accent) hover:text-(--color-foreground)'
                    )}
                  >
                    <div className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300',
                      isSelected ? 'bg-(--color-accent)/20 text-(--color-accent)' : 'bg-border/50 text-(--color-muted)'
                    )}>
                      <Icon className="h-5 w-5 stroke-[1.5]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{item.label}</p>
                      <p className="mt-0.5 text-[10px] opacity-70">{item.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Project Summary Block */}
        <div className="relative flex flex-col justify-between rounded-2xl border border-white/5 bg-(--color-surface-2) p-6 md:p-8 shadow-2xl overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-green-500/5 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              {t('calc.summary.realtime')}
            </span>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
                {t('calc.summary.investment')}
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                    {t('calc.summary.projectType')}
                  </span>
                  <h4 className="text-lg font-bold text-white leading-none">
                    {t(`calc.type.${projectType}`)}
                  </h4>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                    {t('calc.summary.adminPanel')}
                  </span>
                  <h4 className="text-base font-bold text-white/90 leading-none">
                    {needAdmin ? t('calc.admin.yes') : t('calc.admin.no')}
                  </h4>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                    {t('calc.summary.screens')}
                  </span>
                  <h4 className="text-base font-bold text-white/90 leading-none">
                    {screens} {screens === 1 ? t('calc.screens.unit') : t('calc.screens.units')}
                  </h4>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                    {t('calc.summary.features')}
                  </span>
                  <h4 className="text-sm font-bold text-white/90 leading-relaxed">
                    {activeFeaturesList.length > 0
                      ? activeFeaturesList.map(f => t(`calc.feat.${f}` as any)).join(', ')
                      : t('calc.summary.noFeatures')}
                  </h4>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  {t('calc.summary.methodology')}
                </p>
                <p className="mt-1 text-base font-extrabold text-white">
                  {t('calc.summary.methodology.val')}
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-neutral-300">
                {t('calc.summary.includes')}
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                <li className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> {t('calc.inc.code')}</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> {t('calc.inc.structure')}</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> {t('calc.inc.hosting')}</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> {t('calc.inc.support')}</li>
              </ul>
            </div>
          </div>

          <div className="relative z-10 mt-8 space-y-3">
            <Button
              asChild
              variant="primary"
              size="xl"
              className="w-full justify-center text-sm font-bold shadow-md bg-success hover:bg-[#16a34a] text-white border-0 cursor-pointer"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                💬 {t('calc.btn.whatsapp')}
              </a>
            </Button>
            <p className="text-center text-[10px] text-neutral-500">
              {t('calc.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppCalculator
