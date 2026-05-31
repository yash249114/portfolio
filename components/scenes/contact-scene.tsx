"use client"

import { FloatingGlass } from "@/components/floating-glass"

export function ContactScene() {
  return (
    <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
      <FloatingGlass
        className="glass glass-edge rounded-[2.5rem] p-12 text-center sm:p-16"
        intensity={5}
        floatDuration={12}
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.5em] text-accent">
          The End of the Journey
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,7vw,5rem)] font-light leading-[0.9] text-foreground cinematic-glow">
          Let&apos;s build something intelligent.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base font-light leading-relaxed text-muted sm:text-lg">
          Open to AI engineering roles, ambitious products, and collaborations.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:yaswanth@example.com"
            className="glass-soft rounded-full px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-background"
          >
            Get in touch
          </a>
          <span className="text-sm font-light text-muted">
            Vijayawada, India
          </span>
        </div>
      </FloatingGlass>
    </div>
  )
}
