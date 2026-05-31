"use client"

import { motion } from "framer-motion"

const lineVariants = {
  hidden: { opacity: 0, y: 80, filter: "blur(18px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function HeroScene() {
  return (
    <div className="relative mx-auto flex max-w-[88vw] flex-col items-start">
      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={{ opacity: 1, letterSpacing: "0.45em" }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="mb-6 ml-1 text-xs font-medium uppercase text-accent sm:text-sm"
      >
        A Cinematic Portfolio
      </motion.span>

      <h1 className="font-serif font-light leading-[0.82] tracking-[-0.03em] text-foreground cinematic-glow">
        {["Sana", "Yaswanth", "Raj Mouli"].map((word, i) => (
          <motion.span
            key={word}
            custom={i}
            variants={lineVariants}
            initial="hidden"
            animate="show"
            className="block text-[clamp(3.2rem,12vw,11rem)]"
          >
            {word}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-base font-light text-muted sm:text-xl"
      >
        {["AI Engineer", "Software Engineer", "Backend Engineer", "AI Product Engineer"].map(
          (role, i) => (
            <span key={role} className="flex items-center gap-4">
              {i > 0 ? <span className="h-1 w-1 rounded-full bg-accent" /> : null}
              {role}
            </span>
          ),
        )}
      </motion.div>
    </div>
  )
}
