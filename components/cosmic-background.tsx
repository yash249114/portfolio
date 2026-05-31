"use client"

import { useEffect, useRef } from "react"

/**
 * The primary visual environment: a fixed, fullscreen looping video that stays
 * visible during the entire experience. Content floats above it. Subtle color
 * washes, vignette and grain are layered on top so glass surfaces always read,
 * without ever hiding the video.
 */
export function CosmicBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Some mobile browsers need an explicit play() nudge after mount.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {
      /* autoplay may be blocked until interaction; poster covers it */
    })
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background" aria-hidden="true">
      {/* primary looping video environment */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/cosmos.png"
      >
        <source src="/atmosphere.mp4" type="video/mp4" />
      </video>

      {/* readability vignette — kept light so the video stays vivid */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/55" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(135% 100% at 50% 50%, transparent 50%, rgba(6,7,9,0.6) 100%)",
        }}
      />

      {/* drifting amber light */}
      <div className="animate-drift-a absolute -top-40 left-1/4 h-[60vh] w-[60vh] rounded-full blur-[130px]">
        <div className="h-full w-full rounded-full bg-accent/20" />
      </div>

      {/* drifting teal light */}
      <div className="animate-drift-b absolute bottom-[-20vh] right-1/4 h-[55vh] w-[55vh] rounded-full blur-[150px]">
        <div className="h-full w-full rounded-full bg-glow/15" />
      </div>

      {/* film grain */}
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  )
}
