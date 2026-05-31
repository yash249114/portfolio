"use client"

import { motion } from "framer-motion"

type SceneProps = {
  children: React.ReactNode
  /** width of the scene in viewport widths */
  vw?: number
  className?: string
  id?: string
}

/**
 * A single cinematic scene. Content fades in from the environment, floats into
 * position, and dissolves back out as it leaves the horizontal viewport.
 */
export function Scene({ children, vw = 100, className = "", id }: SceneProps) {
  return (
    <section
      id={id}
      style={{ width: `${vw}vw` }}
      className={`relative flex h-screen flex-none items-center justify-center px-8 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(14px)", scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ amount: 0.15, once: false }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full"
      >
        {children}
      </motion.div>
    </section>
  )
}

/** Pure-atmosphere spacer between scenes — only the background shows. */
export function Gap({ vw = 90, label }: { vw?: number; label?: string }) {
  return (
    <div
      style={{ width: `${vw}vw` }}
      className="relative flex h-screen flex-none items-center justify-center"
      aria-hidden="true"
    >
      {label ? (
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.16 }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 1.4 }}
          className="select-none font-serif text-[10vw] font-light italic tracking-tight text-foreground"
        >
          {label}
        </motion.span>
      ) : null}
    </div>
  )
}
