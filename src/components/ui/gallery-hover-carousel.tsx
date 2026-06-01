import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface GalleryItem {
  id: string
  title: string
  summary: string
  url: string
  image: string
}

export interface GalleryHoverCarouselProps {
  heading?: string
  items?: GalleryItem[]
  className?: string
}

/* ─── Default items ─────────────────────────────────────────────────────── */

const DEFAULT_ITEMS: GalleryItem[] = [
  {
    id: 'item-1',
    title: 'Diseño UI/UX Premium',
    summary: 'Interfaces que enamoran a primera vista. Sistemas de diseño completos, accesibles y mobile-first.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=700&q=80',
  },
  {
    id: 'item-2',
    title: 'E-Commerce Escalable',
    summary: 'Plataformas de venta con pagos integrados, gestión de inventario y analytics en tiempo real.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=80',
  },
  {
    id: 'item-3',
    title: 'App Móvil Nativa',
    summary: 'Aplicaciones iOS y Android de alto rendimiento con experiencias de usuario excepcionales.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80',
  },
  {
    id: 'item-4',
    title: 'Dashboard Analytics',
    summary: 'Paneles de control con visualización de datos avanzada para decisiones basadas en métricas.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80',
  },
  {
    id: 'item-5',
    title: 'SaaS Enterprise',
    summary: 'Soluciones SaaS escalables con arquitectura cloud, multi-tenant y seguridad nivel empresa.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80',
  },
]

/* ─── GalleryHoverCarousel ──────────────────────────────────────────────── */

export function GalleryHoverCarousel({
  heading = 'Proyectos Destacados',
  items = DEFAULT_ITEMS,
  className,
}: GalleryHoverCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('select', onSelect)
    api.on('reInit', onSelect)
    return () => { api.off('select', onSelect); api.off('reInit', onSelect) }
  }, [api, onSelect])

  return (
    <section className={cn('w-full py-16', className)}>
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold leading-snug tracking-tight text-[var(--color-foreground)] md:text-3xl">
              {heading}{' '}
              <span className="font-normal text-[var(--color-muted)] text-lg md:text-xl">
                — Explorá nuestra colección de soluciones innovadoras.
              </span>
            </h3>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Anterior"
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] transition-all duration-200',
                'hover:border-[var(--color-accent)] hover:bg-[rgba(167,139,250,0.08)] hover:text-[var(--color-accent)]',
                'disabled:cursor-not-allowed disabled:opacity-30',
              )}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Siguiente"
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] transition-all duration-200',
                'hover:border-[var(--color-accent)] hover:bg-[rgba(167,139,250,0.08)] hover:text-[var(--color-accent)]',
                'disabled:cursor-not-allowed disabled:opacity-30',
              )}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{ align: 'start', dragFree: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-[85%] pl-4 sm:basis-[55%] md:basis-[45%] md:pl-6 lg:basis-[34%]"
              >
                <a
                  href={item.url}
                  className="group relative block h-[320px] md:h-[380px]"
                >
                  <Card className="relative h-full w-full overflow-hidden rounded-3xl border-[var(--color-border)]">

                    {/* Image — full height, shrinks on hover */}
                    <div className="relative h-full w-full overflow-hidden transition-all duration-500 group-hover:h-1/2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* fade at bottom on hover */}
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    {/* Text panel — slides up on hover */}
                    <div className="absolute inset-x-0 bottom-0 flex h-0 flex-col justify-center overflow-hidden bg-[var(--color-surface)]/95 px-5 backdrop-blur-sm transition-all duration-500 group-hover:h-1/2 group-hover:py-4">
                      <h3 className="mb-1.5 text-base font-bold leading-tight text-[var(--color-foreground)] md:text-lg">
                        {item.title}
                      </h3>
                      <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-muted)]">
                        {item.summary}
                      </p>
                      {/* Arrow CTA */}
                      <button
                        className={cn(
                          'absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full',
                          'border border-[var(--color-border)] text-[var(--color-accent)]',
                          'transition-transform duration-300 group-hover:-rotate-45',
                        )}
                        aria-label={`Ver proyecto ${item.title}`}
                        tabIndex={-1}
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>

                  </Card>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

      </div>
    </section>
  )
}

export default GalleryHoverCarousel
