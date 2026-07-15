import React, { useState, useEffect, useRef } from 'react'
import { X, Bot, Send, HelpCircle, MessageCircle, Briefcase, ExternalLink, Mail } from 'lucide-react'

interface ChatbotModalProps {
  isOpen: boolean
  onClose: () => void
}

interface MessageAction {
  label: string
  url: string
  icon?: 'whatsapp' | 'linkedin' | 'email'
}

interface Message {
  id: string
  text: string
  sender: 'bot' | 'user'
  actions?: MessageAction[]
}

const BOT_KNOWLEDGE = {
  about: "Soy Gonzalo Martínez, desarrollador Full Stack y fundador de CreAPP. Nos especializamos en el diseño y desarrollo de aplicaciones móviles y plataformas web de alto rendimiento, creadas estratégicamente para la escalabilidad empresarial.",
  goals: "Nuestro principal objetivo es impulsar la transformación digital de su negocio. Nos enfocamos en la optimización de procesos operativos, el incremento de ventas y la creación de una experiencia digital excepcional para sus clientes.",
  services: "Nuestros servicios abarcan el desarrollo integral de aplicaciones a medida (iOS y Android), plataformas web robustas, integración de soluciones de Inteligencia Artificial (como este chatbot), sistemas de administración completos y diseño UX/UI premium.",
  delivery: "Los plazos de ejecución se determinan según la envergadura y complejidad de cada proyecto. Por lo general, estructuramos el desarrollo para entregar una primera versión funcional (MVP) lista para el mercado en un plazo de 2 a 6 semanas.",
  contact: "Para agendar una llamada de consultoría o realizar una consulta, puede comunicarse de manera directa a través de WhatsApp al +54 9 381 624-2482 o vía correo electrónico a gonchimartinez9@gmail.com. Nuestro horario de atención es de Lunes a Viernes, de 07:00 a 20:00 hs.",
  pricing: "Las tarifas se adaptan a las especificaciones técnicas y requerimientos de su negocio. Le invitamos a contactarnos por WhatsApp para elaborar una propuesta formal y personalizada sin compromiso.",
  greeting: "¡Bienvenido! Soy el asistente virtual de CreAPP, dirigido por Gonzalo Martínez. Estoy a su entera disposición para brindarle detalles sobre nuestros servicios de desarrollo, metodologías, plazos y presupuestos. ¿En qué puedo asistirle hoy?",
  improve: "A través de nuestras soluciones de software a medida, podemos automatizar procesos manuales de su empresa, mejorar su presencia digital, facilitar la interacción con sus clientes y potenciar sus ventas. Transformamos sus ideas en herramientas tecnológicas que impulsan el crecimiento de su negocio.",
  tech: "Trabajamos con tecnologías modernas y escalables como React, Next.js, Node.js, TypeScript y bases de datos en la nube. Nos aseguramos de usar el stack tecnológico ideal para que su proyecto sea rápido, seguro y fácil de mantener.",
  maintenance: "Sí, ofrecemos servicios de mantenimiento, soporte continuo y alojamiento (hosting) una vez que su proyecto está terminado. Queremos asegurarnos de que su plataforma funcione a la perfección a largo plazo.",
  process: "Nuestro proceso consta de 4 etapas principales: 1) Descubrimiento y estrategia, 2) Diseño de Interfaces (UI/UX), 3) Desarrollo ágil y 4) Lanzamiento y pruebas. Mantenemos comunicación constante para que siempre esté al tanto del progreso.",
  portfolio: "Puede ver algunos de nuestros trabajos y casos de éxito navegando por la sección 'Portafolio' de esta misma página web. Hemos ayudado a múltiples empresas a escalar a través del software.",
  design: "Absolutamente. No solo escribimos código, sino que creamos experiencias visuales atractivas. Nuestro servicio incluye el diseño de interfaces (UI) y la experiencia de usuario (UX) para garantizar que el producto final sea muy profesional e intuitivo."
};

const PREDEFINED_QUESTIONS = [
  "¿Quién es el desarrollador?",
  "¿Qué servicios realizan?",
  "¿Cuáles son los precios o tarifas?",
  "¿Cómo es el proceso de desarrollo?",
  "¿Qué tecnologías utilizan?",
  "¿Realizan mantenimiento post-lanzamiento?",
  "¿Hacen diseño UI/UX?",
  "¿Tienen portafolio de trabajos?",
  "¿Cómo pueden mejorar mi negocio?",
  "Plazos de entrega y más",
  "¿Cómo puedo contactarte?"
];

function getBotResponse(input: string): { text: string, actions?: MessageAction[] } {
  const lowerInput = input.toLowerCase();
  
  const hasKeyword = (words: string[]) => words.some(w => lowerInput.includes(w));

  if (hasKeyword(['quien', 'quién', 'creapp', 'gonzalo', 'haces', 'hacés', 'dedicas', 'informacion', 'información', 'sobre ti', 'sobre mi', 'acerca', 'desarrollador'])) {
    return { text: `${BOT_KNOWLEDGE.about} ${BOT_KNOWLEDGE.goals}` };
  }
  if (hasKeyword(['servicio', 'ofreces', 'ofrecés', 'hacer', 'desarrollo', 'app', 'web', 'ofrecen', 'realizan', 'realiza'])) {
    return { text: BOT_KNOWLEDGE.services };
  }
  if (hasKeyword(['tiempo', 'plazo', 'demora', 'tarda', 'días', 'dias', 'semanas', 'entrega', 'entregar', 'más', 'mas'])) {
    return { text: BOT_KNOWLEDGE.delivery };
  }
  if (hasKeyword(['contacto', 'llamar', 'llamada', 'mensaje', 'whatsapp', 'email', 'correo', 'horario', 'agendar', 'hablar', 'reunion', 'contactarte', 'contactarme'])) {
    return {
      text: BOT_KNOWLEDGE.contact,
      actions: [
        { label: 'WhatsApp', url: 'https://wa.me/5493816242482', icon: 'whatsapp' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/gonzalomartinezz', icon: 'linkedin' },
        { label: 'Email', url: 'mailto:gonchimartinez9@gmail.com', icon: 'email' }
      ]
    };
  }
  if (hasKeyword(['precio', 'costo', 'cotizar', 'presupuesto', 'sale', 'pagar', 'cobras', 'tarifa', 'inversion', 'tarifas'])) {
    return { text: BOT_KNOWLEDGE.pricing };
  }
  if (hasKeyword(['mejorar', 'negocio', 'empresa', 'crecimiento', 'potenciar'])) {
    return { text: BOT_KNOWLEDGE.improve };
  }
  if (hasKeyword(['tecnologia', 'tecnología', 'tecnologias', 'stack', 'herramientas', 'utilizan', 'programar'])) {
    return { text: BOT_KNOWLEDGE.tech };
  }
  if (hasKeyword(['mantenimiento', 'soporte', 'post-lanzamiento', 'hosting', 'alojamiento'])) {
    return { text: BOT_KNOWLEDGE.maintenance };
  }
  if (hasKeyword(['proceso', 'etapas', 'pasos', 'metodologia'])) {
    return { text: BOT_KNOWLEDGE.process };
  }
  if (hasKeyword(['portafolio', 'portfolio', 'trabajos', 'ejemplos', 'experiencia'])) {
    return { text: BOT_KNOWLEDGE.portfolio };
  }
  if (hasKeyword(['diseño', 'diseno', 'ui', 'ux', 'interfaces', 'experiencia de usuario'])) {
    return { text: BOT_KNOWLEDGE.design };
  }
  if (hasKeyword(['hola', 'buenas', 'saludos', 'ayuda', 'buen dia', 'buenas tardes'])) {
    return { text: BOT_KNOWLEDGE.greeting };
  }
  
  // Default comprehensive response if no specific keyword is matched
  return { text: "A modo de resumen: En CreAPP desarrollamos soluciones de software (Apps y Webs) a medida para potenciar su negocio. Los plazos de ejecución varían entre 2 y 6 semanas. Puede solicitar una cotización o agendar una reunión contactándonos al +54 9 381 624-2482 (Atención de 07:00 a 20:00 hs). ¿Requiere información adicional sobre algún servicio o tarifa en particular?" };
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
  const [showQuestions, setShowQuestions] = useState(true)
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

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return

    const newUserMsg: Message = { id: Date.now().toString(), text, sender: 'user' }
    setMessages(prev => [...prev, newUserMsg])
    setIsTyping(true)
    setShowQuestions(false)

    // Simulate AI thinking and responding
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        actions: response.actions,
        sender: 'bot'
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 1200 + Math.random() * 800) // Random delay between 1.2s and 2s for realism
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      sendMessage(inputValue)
      setInputValue('')
    }
  }

  return (
    <div
      className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm transition-all duration-300 flex justify-end items-end sm:p-6"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="chatbot-modal-title"
    >
      <div className="w-full h-dvh sm:h-[700px] sm:max-h-[calc(100vh-2rem)] sm:max-w-[450px] flex flex-col overflow-hidden sm:rounded-3xl bg-[#0a0f16] border border-white/10 shadow-2xl shadow-black/80 animate-in slide-in-from-bottom-12 sm:slide-in-from-right-12 fade-in zoom-in-95 duration-300 sm:origin-bottom-right">

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
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-col gap-2 mt-3">
                    {msg.actions.map((action, i) => (
                      <a
                        key={i}
                        href={action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white transition-colors border border-white/10 group"
                      >
                        {action.icon === 'whatsapp' && <MessageCircle className="w-4 h-4 text-green-500" />}
                        {action.icon === 'linkedin' && <Briefcase className="w-4 h-4 text-[#0a66c2]" />}
                        {action.icon === 'email' && <Mail className="w-4 h-4 text-neutral-300" />}
                        {action.label}
                        <ExternalLink className="w-3 h-3 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                )}
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

        {/* Suggested Questions */}
        {showQuestions && (
          <div className="px-4 py-3 bg-[#121822] border-t border-white/10 shrink-0">
            <p className="text-xs text-neutral-400 mb-3 px-1">Preguntas frecuentes:</p>
            <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
              {PREDEFINED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(q)}
                  disabled={isTyping}
                  className="text-sm px-4 py-2.5 rounded-xl border border-[#ff7a00]/30 bg-[#ff7a00]/5 text-[#ff7a00] hover:bg-[#ff7a00]/20 transition-colors cursor-pointer text-left w-full flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {q}
                  <span className="text-[#ff7a00]/50 group-hover:text-[#ff7a00] transition-colors">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="px-4 pb-4 pt-2 bg-[#121822] shrink-0">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            {!showQuestions && (
              <button
                type="button"
                onClick={() => setShowQuestions(true)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Ver preguntas frecuentes"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            )}
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Preguntame sobre servicios, precios..."
                className="w-full bg-[#0a0f16] border border-white/10 rounded-full pl-4 pr-12 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#ff7a00]/50 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#ff7a00] text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
              >
                <Send className="h-4 w-4 ml-0.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

