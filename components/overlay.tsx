"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

/**
 * Fixed cinematic HUD that floats above the experience: a persistent
 * nameplate, and a scroll cue that dissolves once the journey begins.
 */
export function Overlay() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 120)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* top-left nameplate */}
      <div className="pointer-events-none fixed left-6 top-5 z-40 flex items-center gap-3 sm:left-10">
        <span className="h-2 w-2 animate-pulse-soft rounded-full bg-accent" />
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/80">
          Yaswanth
        </span>
      </div>

      {/* top-right status */}
      <div className="pointer-events-none fixed right-6 top-5 z-40 hidden sm:block">
        <span className="text-xs font-light tracking-[0.2em] text-muted">
          AI ENGINEER · VIJAYAWADA
        </span>
      </div>

      {/* scroll cue */}
      <AnimatePresence>
        {!scrolled ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="pointer-events-none fixed bottom-8 left-1/2 z-40 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-[0.65rem] uppercase tracking-[0.4em] text-muted">
                Scroll to travel
              </span>
              <div className="relative h-10 w-[1px] overflow-hidden bg-foreground/15">
                <motion.div
                  animate={{ y: [-40, 40] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 h-4 bg-accent"
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
