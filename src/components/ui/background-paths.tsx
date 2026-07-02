"use client";

import { motion } from "framer-motion";

export function BackgroundPaths({ title }: { title?: string }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * Math.random()} -${189 + i * 6}C-${
      380 - i * 5 * Math.random()
    } -${189 + i * 6} -${312 - i * 5 * Math.random()} ${216 - i * 6} ${
      152 - i * 5 * Math.random()
    } ${343 - i * 6}C${616 - i * 5 * Math.random()} ${470 - i * 6} ${
      684 - i * 5 * Math.random()
    } ${875 - i * 6} ${684 - i * 5 * Math.random()} ${875 - i * 6}`,
    width: 0.5 + Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <svg
        className="w-full h-full text-white/5"
        viewBox="0 0 696 316"
        fill="none"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.2 + Math.random() * 0.2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
      {/* Reverse path animation for complexity */}
      <svg
        className="w-full h-full text-white/5 absolute inset-0 rotate-180"
        viewBox="0 0 696 316"
        fill="none"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.2 + Math.random() * 0.2}
            initial={{ pathLength: 1, opacity: 0 }}
            animate={{
              pathLength: 0,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
