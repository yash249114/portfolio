"use client"

import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion"

type FloatingGlassProps = {
  children: React.ReactNode
  className?: string
  /** how strongly the element reacts to the pointer (deg of tilt) */
  intensity?: number
  /** drift float amplitude in px */
  floatAmplitude?: number
  /** seconds for one float cycle */
  floatDuration?: number
  delay?: number
}

/**
 * A glass surface that floats slowly, tilts toward the pointer, and drifts in
 * 3D space — never static, always "alive and suspended".
 */
export function FloatingGlass({
  children,
  className = "",
  intensity = 8,
  floatAmplitude = 14,
  floatDuration = 9,
  delay = 0,
}: FloatingGlassProps) {
  const ref = useRef<HTMLDivElement>(null)

  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const rx = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 120,
    damping: 18,
  })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 120,
    damping: 18,
  })
  const tx = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 20,
  })
  const ty = useSpring(useTransform(py, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 20,
  })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onLeave() {
    px.set(0)
    py.set(0)
  }

  const style: MotionStyle = {
    rotateX: rx,
    rotateY: ry,
    x: tx,
    y: ty,
    transformPerspective: 1200,
    transformStyle: "preserve-3d",
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className="will-change-transform"
    >
      {/* gentle perpetual float, decoupled from the tilt transform */}
      <motion.div
        animate={{ y: [0, -floatAmplitude, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
