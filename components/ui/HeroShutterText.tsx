import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface HeroShutterTextProps {
  text: string;
  className?: string; // Wrapper styling
  textClassName?: string; // Main text styling
  shutterClassName?: string; // Shutter slice styling (colors)
}

// Cast motion.span to any to avoid type errors
const MotionSpan = motion.span as any;

export default function HeroShutterText({
  text,
  className = "",
  textClassName = "",
  shutterClassName = "",
}: HeroShutterTextProps) {
  const characters = text.split("");

  return (
    <div className={cn("relative flex flex-wrap justify-center items-center z-10", className)}>
      {characters.map((char, i) => (
        <div key={i} className="relative overflow-hidden group">
          {/* Main Character */}
          <MotionSpan
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: i * 0.04, duration: 0.8 }}
            className={cn("leading-none font-bold tracking-tighter inline-block whitespace-pre", textClassName)}
          >
            {char === " " ? "\u00A0" : char}
          </MotionSpan>

          {/* Top Slice Layer */}
          <MotionSpan
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{
              duration: 0.7,
              delay: i * 0.04,
              ease: "easeInOut",
            }}
            className={cn("absolute inset-0 leading-none font-bold z-10 pointer-events-none", textClassName, shutterClassName)}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
          >
            {char === " " ? "\u00A0" : char}
          </MotionSpan>

          {/* Middle Slice Layer */}
          <MotionSpan
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "-100%", opacity: [0, 1, 0] }}
            transition={{
              duration: 0.7,
              delay: i * 0.04 + 0.1,
              ease: "easeInOut",
            }}
            className={cn("absolute inset-0 leading-none font-bold z-10 pointer-events-none", textClassName, shutterClassName)}
            style={{
              clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </MotionSpan>

          {/* Bottom Slice Layer */}
          <MotionSpan
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{
              duration: 0.7,
              delay: i * 0.04 + 0.2,
              ease: "easeInOut",
            }}
            className={cn("absolute inset-0 leading-none font-bold z-10 pointer-events-none", textClassName, shutterClassName)}
            style={{
              clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </MotionSpan>
        </div>
      ))}
    </div>
  );
}