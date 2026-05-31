"use client"

import { motion } from "framer-motion"

type Cap = {
  name: string
  // position in %
  x: number
  y: number
  size: "sm" | "md" | "lg"
  dur: number
  amp: number
  drift: number
  delay: number
}

const capsules: Cap[] = [
  { name: "Python", x: 12, y: 22, size: "lg", dur: 11, amp: 22, drift: 14, delay: 0 },
  { name: "AI Agents", x: 32, y: 60, size: "lg", dur: 13, amp: 26, drift: -16, delay: 1 },
  { name: "LangChain", x: 50, y: 18, size: "md", dur: 10, amp: 18, drift: 10, delay: 0.5 },
  { name: "RAG", x: 64, y: 52, size: "lg", dur: 12, amp: 24, drift: -12, delay: 1.4 },
  { name: "OpenAI", x: 80, y: 28, size: "md", dur: 14, amp: 20, drift: 12, delay: 0.8 },
  { name: "FastAPI", x: 22, y: 78, size: "md", dur: 9, amp: 16, drift: -10, delay: 0.3 },
  { name: "TypeScript", x: 44, y: 84, size: "sm", dur: 11, amp: 18, drift: 14, delay: 1.2 },
  { name: "React", x: 73, y: 76, size: "md", dur: 12, amp: 22, drift: -14, delay: 0.6 },
  { name: "Next.js", x: 90, y: 58, size: "sm", dur: 10, amp: 16, drift: 10, delay: 1.6 },
  { name: "Node.js", x: 6, y: 52, size: "sm", dur: 13, amp: 20, drift: 12, delay: 0.9 },
  { name: "PostgreSQL", x: 58, y: 36, size: "sm", dur: 11, amp: 18, drift: -10, delay: 1.1 },
  { name: "MongoDB", x: 38, y: 38, size: "sm", dur: 14, amp: 22, drift: 12, delay: 0.4 },
  { name: "Docker", x: 84, y: 84, size: "sm", dur: 12, amp: 18, drift: -12, delay: 1.5 },
  { name: "AWS", x: 16, y: 90, size: "sm", dur: 10, amp: 16, drift: 10, delay: 0.7 },
  { name: "Java", x: 68, y: 12, size: "sm", dur: 13, amp: 20, drift: -10, delay: 1.3 },
  { name: "JavaScript", x: 4, y: 74, size: "sm", dur: 11, amp: 18, drift: 12, delay: 0.2 },
]

const sizeClasses: Record<Cap["size"], string> = {
  sm: "text-sm px-5 py-2.5",
  md: "text-base px-6 py-3 sm:text-lg",
  lg: "text-lg px-7 py-3.5 sm:text-2xl",
}

export function SkillsScene() {
  return (
    <div className="relative mx-auto w-full max-w-[78vw]">
      <div className="pointer-events-none mb-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.5em] text-accent">
          Capabilities
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-tight text-foreground">
          A toolkit in orbit
        </h2>
      </div>

      <div className="relative mx-auto h-[58vh] w-full">
        {capsules.map((c) => (
          <motion.div
            key={c.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            animate={{ y: [0, -c.amp, 0], x: [0, c.drift, 0] }}
            transition={{
              duration: c.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: c.delay,
            }}
          >
            <motion.span
              whileHover={{ scale: 1.12 }}
              className={`glass glass-edge inline-block cursor-default rounded-full font-light text-foreground ${sizeClasses[c.size]}`}
            >
              {c.name}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
