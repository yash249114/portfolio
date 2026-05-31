"use client"

import { FloatingGlass } from "@/components/floating-glass"

const facts = [
  { label: "Focus", value: "AI Engineer" },
  { label: "Also", value: "Software · Backend" },
  { label: "Degree", value: "B.Tech AI & Data Science" },
  { label: "University", value: "KL University" },
  { label: "Based in", value: "Vijayawada, India" },
]

export function AboutScene() {
  return (
    <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
      <FloatingGlass
        className="glass glass-edge rounded-[2rem] p-10 sm:p-14"
        intensity={6}
        floatDuration={10}
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-accent">
          Who is Yaswanth
        </p>
        <h2 className="font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl">
          I build intelligent systems that think, reason, and ship.
        </h2>
        <p className="mt-6 max-w-md text-pretty text-base font-light leading-relaxed text-muted sm:text-lg">
          An AI Engineer turning research-grade ideas into production software —
          from backend architecture to AI products people actually use.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">
                {f.label}
              </dt>
              <dd className="mt-1 text-base font-medium text-foreground sm:text-lg">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </FloatingGlass>
    </div>
  )
}
