"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Scene, Gap } from "@/components/scene"
import { HeroScene } from "@/components/scenes/hero-scene"
import { AboutScene } from "@/components/scenes/about-scene"
import { FinFlowScene } from "@/components/scenes/finflow-scene"
import { SkillsScene } from "@/components/scenes/skills-scene"
import { LoomScene, AlbusScene } from "@/components/scenes/showcase-scene"
import { ContactScene } from "@/components/scenes/contact-scene"

export function HorizontalExperience() {
  const targetRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(0)
  const [viewportH, setViewportH] = useState(0)

  const { scrollYProgress } = useScroll({ target: targetRef })

  // Smooth the scroll so horizontal travel feels cinematic, never abrupt.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 26,
    mass: 0.6,
  })

  const x = useTransform(smooth, [0, 1], [0, -scrollRange])
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    function measure() {
      const track = trackRef.current
      if (!track) return
      setScrollRange(track.scrollWidth - window.innerWidth)
      setViewportH(window.innerHeight)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  return (
    <>
      {/* progress rail */}
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-foreground/5">
        <motion.div
          style={{ scaleX: progressScale, transformOrigin: "0%" }}
          className="h-full bg-gradient-to-r from-accent to-glow"
        />
      </div>

      {/* tall vertical track that drives horizontal motion */}
      <div ref={targetRef} style={{ height: `${scrollRange + viewportH}px` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-screen w-max items-center will-change-transform"
          >
            <Scene id="hero" vw={100}>
              <HeroScene />
            </Scene>

            <Gap vw={70} />

            <Scene id="about" vw={90}>
              <AboutScene />
            </Scene>

            <Gap vw={80} label="Flagship" />

            <Scene id="finflow" vw={150}>
              <FinFlowScene />
            </Scene>

            <Gap vw={80} />

            <Scene id="skills" vw={130}>
              <SkillsScene />
            </Scene>

            <Gap vw={70} />

            <Scene id="loom" vw={110}>
              <LoomScene />
            </Scene>

            <Gap vw={60} />

            <Scene id="albus" vw={110}>
              <AlbusScene />
            </Scene>

            <Gap vw={70} />

            <Scene id="contact" vw={100}>
              <ContactScene />
            </Scene>

            <Gap vw={20} />
          </motion.div>
        </div>
      </div>
    </>
  )
}
