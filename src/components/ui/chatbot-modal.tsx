import React, { useState, useEffect, useRef } from 'react'
import { X, Bot, Send } from 'lucide-react'

interface ChatbotModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  text: string
  sender: 'bot' | 'user'
}

const BOT_KNOWLEDGE = {
  about: "Soy Gonzalo Martínez, fundador y director de CreAPP. Nos especializamos en el diseño y desarrollo de aplicaciones móviles y plataformas web de alto rendimiento, creadas estratégicamente para la escalabilidad empresarial.",
  goals: "Nuestro principal objetivo es impulsar la transformación digital de su negocio. Nos enfocamos en la optimización de procesos operativos, el incremento de ventas y la creación de una experiencia digital excepcional para sus clientes.",
  services: "Nuestros servicios incluyen el desarrollo integral de aplicaciones a medida, plataformas web robustas, integración de soluciones de Inteligencia Artificial (como este asistente), sistemas de administración completos y diseño UX/UI premium.",
  delivery: "Los tiempos de ejecución se determinan según la envergadura y complejidad de cada proyecto. Por lo general, estructuramos el desarrollo para entregar una primera versión funcional (MVP) lista para el mercado en un plazo de 2 a 6 semanas.",
  contact: "Para agendar una llamada de consultoría o realizar una consulta, puede comunicarse de manera directa a través de WhatsApp al +54 9 381 624-2482 o vía correo electrónico a gonchimartinez9@gmail.com. Nuestro horario de atención es de Lunes a Viernes, de 07:00 a 20:00 hs.",
  pricing: "Las tarifas se adaptan a las especificaciones técnicas y requerimientos de su negocio. Le invitamos a utilizar nuestro 'Cotizador' web, o a contactarnos por WhatsApp para elaborar una propuesta formal y personalizada sin compromiso.",
  greeting: "¡Bienvenido! Soy el asistente virtual de CreAPP, dirigido por Gonzalo Martínez. Estoy a su entera disposición para brindarle detalles sobre nuestros servicios de desarrollo, metodologías, plazos y presupuestos. ¿En qué puedo asistirle hoy?"
};

function getBotResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  const hasKeyword = (words: string[]) => words.some(w => lowerInput.includes(w));

  if (hasKeyword(['quien', 'quién', 'creapp', 'gonzalo', 'haces', 'hacés', 'dedicas', 'informacion', 'información', 'sobre ti', 'sobre mi', 'acerca'])) {
    return `${BOT_KNOWLEDGE.about} ${BOT_KNOWLEDGE.goals}`;
  }
  if (hasKeyword(['servicio', 'ofreces', 'ofrecés', 'hacer', 'desarrollo', 'app', 'web', 'ofrecen', 'negocio'])) {
    return BOT_KNOWLEDGE.services;
  }
  if (hasKeyword(['tiempo', 'plazo', 'demora', 'tarda', 'días', 'dias', 'semanas', 'entrega', 'entregar'])) {
    return BOT_KNOWLEDGE.delivery;
  }
  if (hasKeyword(['contacto', 'llamar', 'llamada', 'mensaje', 'whatsapp', 'email', 'correo', 'horario', 'agendar', 'hablar', 'reunion'])) {
    return BOT_KNOWLEDGE.contact;
  }
  if (hasKeyword(['precio', 'costo', 'cotizar', 'presupuesto', 'sale', 'pagar', 'cobras', 'tarifa', 'inversion'])) {
    return BOT_KNOWLEDGE.pricing;
  }
  if (hasKeyword(['hola', 'buenas', 'saludos', 'ayuda', 'buen dia', 'buenas tardes'])) {
    return BOT_KNOWLEDGE.greeting;
  }
  
  // Default comprehensive response if no specific keyword is matched
  return "A modo de resumen: En CreAPP desarrollamos soluciones de software (Apps y Webs) a medida para potenciar su negocio. Los tiempos de ejecución varían entre 2 y 6 semanas. Puede solicitar una cotización o agendar una reunión contactándonos al +54 9 381 624-2482 (Atención de 07:00 a 20:00 hs). ¿Requiere información adicional sobre algún servicio o tarifa en particular?";
}

export function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: BOT_KNOWLEDGE.greeting,
      sender: 'bot'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userText = inputValue;
    const newUserMsg: Message = { id: Date.now().toString(), text: userText, sender: 'user' }
    setMessages(prev => [...prev, newUserMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking and responding
    setTimeout(() => {
      const responseText = getBotResponse(userText);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot'
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 1200 + Math.random() * 800) // Random delay between 1.2s and 2s for realism
  }

  return (
    <div
      className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm transition-all duration-300 flex justify-end items-end sm:p-6"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="chatbot-modal-title"
    >
      <div className="w-full h-dvh sm:h-[600px] sm:max-w-[400px] flex flex-col overflow-hidden sm:rounded-3xl bg-[#0a0f16] border border-white/10 shadow-2xl shadow-black/80 animate-in slide-in-from-bottom-12 sm:slide-in-from-right-12 fade-in zoom-in-95 duration-300 sm:origin-bottom-right">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#121822] px-6 py-4 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#ff7a00]/20 text-[#ff7a00]">
              <Bot className="h-6 w-6" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[#121822]"></span>
            </div>
            <div>
              <h2 id="chatbot-modal-title" className="text-lg font-black tracking-tight">Asistente de CreAPP</h2>
              <p className="text-xs text-neutral-400">En línea</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 cursor-pointer"
            aria-label="Cerrar chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff7a00]/20 text-[#ff7a00] mt-auto">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.sender === 'user'
                ? 'bg-[#ff7a00] text-white rounded-br-sm'
                : 'bg-white/10 text-neutral-200 rounded-bl-sm border border-white/5'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff7a00]/20 text-[#ff7a00] mt-auto">
                <Bot className="h-4 w-4" />
              </div>
              <div className="max-w-[75%] rounded-2xl px-4 py-4 text-sm bg-white/10 text-neutral-200 rounded-bl-sm border border-white/5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#121822] border-t border-white/10 shrink-0">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Preguntame sobre servicios, precios..."
              className="w-full bg-[#0a0f16] border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#ff7a00]/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#ff7a00] text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
            >
              <Send className="h-4 w-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

