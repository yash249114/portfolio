"use client"

import { motion } from "framer-motion"

/**
 * Shared cinematic reveal. Content fades up from the environment with a soft
 * blur, used by both the horizontal (desktop) and vertical (mobile) layouts.
 */
export function SceneReveal({
  children,
  className = "",
  amount = 0.3,
}: {
  children: React.ReactNode
  className?: string
  amount?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(14px)", scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ amount, once: false }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full ${className}`}
    >
      {children}
    </motion.div>
  )
}
