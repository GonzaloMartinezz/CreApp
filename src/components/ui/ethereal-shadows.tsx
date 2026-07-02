"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const EtherealShadows = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#09090b]", className)}>
      {/* Heavy SVG noise texture for the smoky feel */}
      <div 
        className="absolute inset-0 z-0 opacity-25 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>')`,
        }}
      />
      
      {/* Animated blurry shadows (Ethereal effect) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-80 pointer-events-none">
        {/* Blob 1 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 0.9, 1],
            x: ["-5%", "15%", "-10%", "-5%"],
            y: ["5%", "-15%", "10%", "5%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[70vw] h-[70vh] md:w-[50vw] md:h-[50vh] bg-neutral-600 rounded-full blur-[100px] md:blur-[140px]"
        />
        {/* Blob 2 */}
        <motion.div
          animate={{
            scale: [1.1, 0.9, 1.3, 1.1],
            x: ["15%", "-15%", "20%", "15%"],
            y: ["-15%", "20%", "-5%", "-15%"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[80vw] h-[80vh] md:w-[60vw] md:h-[60vh] bg-neutral-800 rounded-full blur-[100px] md:blur-[150px]"
        />
        {/* Blob 3 (Central focus) */}
        <motion.div
          animate={{
            scale: [0.9, 1.4, 0.8, 0.9],
            opacity: [0.4, 0.7, 0.4, 0.4],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[50vw] h-[50vh] bg-neutral-700 rounded-full blur-[90px] md:blur-[120px]"
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
