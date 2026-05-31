"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"

/**
 * The primary visual element. Fixed to the viewport so it never disappears
 * and content floats above it. Layers parallax slowly with scroll to keep
 * a constant sense of travel through a cinematic world.
 */
export function CosmicBackground() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20 })

  // The base photo drifts a little to feel alive without ever leaving frame.
  const photoX = useTransform(smooth, [0, 1], ["0%", "-8%"])
  const photoScale = useTransform(smooth, [0, 0.5, 1], [1.12, 1.18, 1.12])

  // Atmospheric color washes shift across the journey.
  const amberX = useTransform(smooth, [0, 1], ["-10%", "30%"])
  const tealX = useTransform(smooth, [0, 1], ["40%", "-15%"])
  const hue = useTransform(smooth, [0, 0.4, 0.7, 1], [0, -12, 8, 0])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background" aria-hidden="true">
      {/* base deep-space photo */}
      <motion.div
        style={{ x: photoX, scale: photoScale }}
        className="absolute inset-0"
      >
        <div
          className="h-full w-full bg-cover bg-center opacity-90"
          style={{ backgroundImage: "url(/cosmos.png)" }}
        />
      </motion.div>

      {/* darkening + vignette so floating glass always reads */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 50%, transparent 45%, rgba(6,7,9,0.7) 100%)",
        }}
      />

      {/* drifting amber light */}
      <motion.div
        style={{ x: amberX }}
        className="animate-drift-a absolute -top-40 left-1/4 h-[70vh] w-[70vh] rounded-full blur-[120px]"
      >
        <div className="h-full w-full rounded-full bg-accent/30" />
      </motion.div>

      {/* drifting teal light */}
      <motion.div
        style={{ x: tealX }}
        className="animate-drift-b absolute bottom-[-20vh] right-1/4 h-[60vh] w-[60vh] rounded-full blur-[140px]"
      >
        <div className="h-full w-full rounded-full bg-glow/25" />
      </motion.div>

      {/* subtle hue shift wash tied to journey */}
      <motion.div
        style={{ rotate: hue }}
        className="absolute left-1/2 top-1/2 h-[160vh] w-[160vh] -translate-x-1/2 -translate-y-1/2 opacity-40"
      >
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(217,164,65,0.06),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(79,214,196,0.05),transparent_55%)]" />
      </motion.div>

      {/* fine starfield grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.6), transparent), radial-gradient(1px 1px at 120px 80px, rgba(255,255,255,0.4), transparent), radial-gradient(1.5px 1.5px at 200px 160px, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 300px 50px, rgba(255,255,255,0.35), transparent)",
          backgroundRepeat: "repeat",
          backgroundSize: "360px 360px",
        }}
      />

      {/* film grain */}
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  )
}
