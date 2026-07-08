"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { MessageCircle, Calendar } from "lucide-react";
import { ParticleNetwork } from "@/components/ui/particle-network";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (Restored 3D Depth)
  ---------------------------------------------------------------------- */
  
  /* OUTSIDE THE CARD: Theme-aware text (Shadow in Light Mode, Glow in Dark Mode) */
  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow: 
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent), 
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0); /* Hardware acceleration to prevent WebKit clipping bug */
      filter: 
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) 
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  /* INSIDE THE CARD: Hardcoded Silver/White for the dark background, deep rich shadows */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep Physical Card with Dynamic Mouse Lighting */
  .premium-depth-card {
      background: linear-gradient(145deg, #162C6D 0%, #0A101D 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Realistic iPhone Mockup Hardware */
  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  /* Physical Tactile Buttons */
  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.02);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #18181B;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: React.ReactNode;
  tagline2?: React.ReactNode;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  onWhatsAppClick?: () => void;
}

export function CinematicLandingHero({
  brandName = "CreAPP",
  tagline1 = "Creamos tu app ideal,",
  tagline2 = "para tus clientes.",
  cardHeading = "Experiencias digitales, redefinidas.",
  cardDescription = <><span className="text-white font-semibold">CreAPP</span> desarrolla aplicaciones móviles y plataformas web de alto impacto para escalar tu negocio de forma inteligente.</>,
  metricValue = 50,
  metricLabel = "Apps Lanzadas",
  ctaHeading = "Empezá tu proyecto.",
  ctaDescription = "Sin compromisos — solo buenas ideas y ejecución impecable.",
  onWhatsAppClick,
  className,
  ...props
}: CinematicHeroProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // 1. High-Performance Mouse Interaction Logic (Using requestAnimationFrame)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Complex Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=9000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        // Responsive card pullback sizing
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to({}, { duration: 6 })
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-black text-foreground font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="absolute inset-0 z-[-1] pointer-events-none opacity-100">
        <ParticleNetwork />
      </div>

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 mt-24 md:mt-0 will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal bg-clip-text text-transparent bg-linear-to-b from-neutral-100 to-neutral-500 uppercase text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2 pt-4 pb-4 leading-[1.1]">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal bg-clip-text text-transparent bg-linear-to-b from-neutral-100 to-neutral-500 uppercase text-[2.8rem] md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter pt-4 pb-4 leading-[1.1]">
          {tagline2}
        </h1>
      </div>

      {/* BACKGROUND LAYER 2: Tactile CTA Buttons */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 mt-6 lg:mb-12 lg:mt-10 tracking-tight text-silver-matte max-w-6xl mx-auto px-4">
          {ctaHeading}
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-4xl mx-auto font-light leading-relaxed px-4 text-balance">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center min-h-[80px]">
          <button
            onClick={onWhatsAppClick}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_10px_24px_-4px_rgba(37,211,102,0.5)] transition-all duration-300 hover:-translate-y-1"
          >
            <MessageCircle className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-white/80 uppercase mb-[-2px]">Contactar por</div>
              <div className="text-xl font-bold leading-none tracking-tight">WhatsApp</div>
            </div>
          </button>

          {showDatePicker ? (
            <div className="btn-modern-dark flex flex-col sm:flex-row items-center justify-center gap-3 px-6 py-3 rounded-[1.25rem] animate-in fade-in zoom-in duration-300">
              <input
                type="datetime-local"
                className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 w-full sm:w-auto"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (!selectedDate) return;
                    const dateObj = new Date(selectedDate);
                    const formattedDate = dateObj.toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' });
                    const message = `Hola Gonzalo! Me gustaría agendar una llamada de consultoría para el día ${formattedDate}.`;
                    window.open(`https://wa.me/5493816242482?text=${encodeURIComponent(message)}`, '_blank');
                    setShowDatePicker(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-colors w-full sm:w-auto"
                >
                  Confirmar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDatePicker(true)}
              className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background"
            >
              <Calendar className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
              <div className="text-left">
                <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-[-2px]">Agendar una</div>
                <div className="text-xl font-bold leading-none tracking-tight">Llamada</div>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Blue Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID: Flex-col on mobile to force order, Grid on desktop */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0 lg:translate-y-12">

            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full mt-16 md:mt-0 translate-x-0 lg:translate-x-24 xl:translate-x-32 opacity-40 blur-[1px] md:opacity-100 md:blur-none">
              <h2 className="text-6xl md:text-[5rem] lg:text-[5rem] xl:text-[6rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0 flex flex-col items-center lg:items-end">
                <span className="block">{brandName.split(' ')[0]}</span>
                <span className="block lg:-mt-2">{brandName.split(' ')[1]}</span>
              </h2>
            </div>

            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): IPHONE MOCKUP */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>

              {/* Inner wrapper for safe CSS scaling that doesn't conflict with GSAP */}
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">

                {/* The iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
                >
                  {/* Physical Hardware Buttons */}
                  <div className="absolute top-[120px] left-[-3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] left-[-3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] left-[-3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] right-[-3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen Container */}
                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island Notch */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                    </div>

                    {/* App Interface - GM Branded */}
                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      {/* Header: Tu App */}
                      <div className="phone-widget flex justify-between items-center mb-5 pl-3">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-0.5">Dashboard</span>
                          <div className="flex items-center gap-2">
                            <img src="/LOGO PROFESIONAL.webp" alt="App Logo" className="h-6 w-6 rounded-full object-cover bg-white" />
                            <span className="text-lg font-black tracking-tight text-white drop-shadow-md">Tu App</span>
                          </div>
                        </div>
                      </div>

                      {/* Feature Cards */}
                      <div className="space-y-3 flex-1">
                        {/* 1. Chatbot IA - Purple/Blue */}
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500/30 to-blue-600/20 flex items-center justify-center mr-3 border border-purple-400/30 shadow-inner">
                            <svg className="w-5 h-5 text-purple-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-[11px] font-bold text-white tracking-tight">Chatbot IA</p>
                            <p className="text-[9px] text-purple-300/60 font-medium">Asistente inteligente 24/7</p>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
                        </div>

                        {/* 2. WhatsApp Business - Green */}
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500/30 to-green-600/20 flex items-center justify-center mr-3 border border-emerald-400/30 shadow-inner">
                            <svg className="w-5 h-5 text-emerald-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-[11px] font-bold text-white tracking-tight">WhatsApp Business</p>
                            <p className="text-[9px] text-emerald-300/60 font-medium">Integración directa</p>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                        </div>

                        {/* 3. Análisis Completo - Orange */}
                        <div className="phone-widget widget-depth rounded-2xl p-3.5 border border-orange-500/20">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500/30 to-amber-600/20 flex items-center justify-center mr-3 border border-orange-400/30 shadow-inner">
                              <svg className="w-5 h-5 text-orange-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] font-bold text-orange-300 tracking-tight">Análisis Completo</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 ml-[52px]">
                            <span className="px-2 py-0.5 rounded-full bg-orange-500/15 text-[8px] font-bold text-orange-300 border border-orange-500/20">+Vistas</span>
                            <span className="px-2 py-0.5 rounded-full bg-orange-500/15 text-[8px] font-bold text-orange-300 border border-orange-500/20">+Ventas</span>
                          </div>
                        </div>

                        {/* 4. Lógica de Negocio */}
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500/30 to-blue-600/20 flex items-center justify-center mr-3 border border-indigo-400/30 shadow-inner">
                            <svg className="w-4 h-4 text-indigo-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold text-indigo-300 tracking-tight">Lógica de Negocio</p>
                          </div>
                        </div>

                        {/* 5. Integración Digital */}
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-8 h-8 rounded-xl bg-linear-to-br from-cyan-500/30 to-teal-600/20 flex items-center justify-center mr-3 border border-cyan-400/30 shadow-inner">
                            <svg className="w-4 h-4 text-cyan-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold text-cyan-300 tracking-tight">Integración Digital</p>
                          </div>
                        </div>
                      </div>

                      {/* Home indicator */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Floating Badges on edges of phone */}
                {/* Top Left: +15 Apps */}
                <div className="floating-badge absolute flex top-[90px] left-[-60px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-2.5 lg:p-3 items-center gap-2.5 lg:gap-3 z-30">
                  <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-linear-to-b from-orange-500/20 to-orange-900/10 flex items-center justify-center border border-orange-400/30 shadow-inner">
                    <span className="text-sm lg:text-base drop-shadow-lg" aria-hidden="true">🚀</span>
                  </div>
                  <div>
                    <p className="text-white text-[10px] lg:text-xs font-bold tracking-tight">+15 Apps</p>
                    <p className="text-orange-200/50 text-[8px] lg:text-[10px] font-medium">Entregas Exitosas</p>
                  </div>
                </div>

                {/* Top Right: Proceso Personalizado */}
                <div className="floating-badge absolute flex top-[120px] right-[-60px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-2.5 lg:p-3 items-center gap-2.5 lg:gap-3 z-30" style={{ animationDelay: '0.5s' }}>
                  <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-linear-to-b from-emerald-500/20 to-emerald-900/10 flex items-center justify-center border border-emerald-400/30 shadow-inner">
                    <span className="text-sm lg:text-base drop-shadow-lg" aria-hidden="true">🎯</span>
                  </div>
                  <div>
                    <p className="text-white text-[10px] lg:text-xs font-bold tracking-tight">Proceso Personalizado</p>
                    <p className="text-emerald-200/50 text-[8px] lg:text-[10px] font-medium">Análisis de Negocios</p>
                  </div>
                </div>

                {/* Bottom Right: 100% Satisfacción */}
                <div className="floating-badge absolute flex bottom-[60px] right-[-50px] lg:right-[-70px] floating-ui-badge rounded-xl lg:rounded-2xl p-2.5 lg:p-3 items-center gap-2.5 lg:gap-3 z-30" style={{ animationDelay: '1s' }}>
                  <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-linear-to-b from-indigo-500/20 to-indigo-900/10 flex items-center justify-center border border-indigo-400/30 shadow-inner">
                    <span className="text-sm lg:text-base drop-shadow-lg" aria-hidden="true">⭐</span>
                  </div>
                  <div>
                    <p className="text-white text-[10px] lg:text-xs font-bold tracking-tight">100% Satisfacción</p>
                    <p className="text-blue-200/50 text-[8px] lg:text-[10px] font-medium">Clientes Conformes</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): ACCOUNTABILITY TEXT */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              {/* HIDDEN ON MOBILE (added hidden md:block) */}
              <p className="hidden md:block text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
