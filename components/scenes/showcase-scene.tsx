"use client"

import { motion } from "framer-motion"
import { FloatingGlass } from "@/components/floating-glass"

type ShowcaseProps = {
  kicker: string
  title: string
  tag: string
  description: string
  visual: React.ReactNode
  align?: "left" | "right"
}

function Showcase({ kicker, title, tag, description, visual, align = "left" }: ShowcaseProps) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <FloatingGlass
        className="glass glass-edge overflow-hidden rounded-[2rem]"
        intensity={6}
        floatAmplitude={12}
        floatDuration={11}
      >
        <div
          className={`grid grid-cols-1 items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 ${
            align === "right" ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.45em] text-accent">
              {kicker}
            </p>
            <h2 className="font-serif text-5xl font-light leading-[0.9] text-foreground sm:text-6xl">
              {title}
            </h2>
            <span className="glass-soft mt-5 inline-block rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-glow">
              {tag}
            </span>
            <p className="mt-6 max-w-md text-pretty text-base font-light leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          </div>
          <div className="relative h-64 w-full sm:h-72">{visual}</div>
        </div>
      </FloatingGlass>
    </div>
  )
}

export function LoomScene() {
  return (
    <Showcase
      kicker="Showcase 01"
      title="Loom"
      tag="AI Coding Agent"
      description="An autonomous coding agent that reads a repository, plans changes, writes code, and opens pull requests — pairing on real engineering work, not just snippets."
      visual={<LoomVisual />}
    />
  )
}

export function AlbusScene() {
  return (
    <Showcase
      align="right"
      kicker="Showcase 02"
      title="Albus"
      tag="AI Assessment Platform"
      description="An adaptive assessment platform that authors questions, evaluates open-ended answers, and tailors difficulty in real time — grading at the depth of a human examiner."
      visual={<AlbusVisual />}
    />
  )
}

function LoomVisual() {
  const lines = [
    { w: "70%", c: "text-glow" },
    { w: "92%", c: "text-muted" },
    { w: "55%", c: "text-muted" },
    { w: "80%", c: "text-accent" },
    { w: "40%", c: "text-muted" },
  ]
  return (
    <div className="glass-soft flex h-full flex-col rounded-2xl p-4 font-mono text-xs">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
      </div>
      <div className="space-y-2.5">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: l.w, opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className={`h-2 rounded-full bg-current ${l.c}`}
          />
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 pt-4 text-glow">
        <span className="h-2 w-2 animate-pulse-soft rounded-full bg-glow" />
        agent: opening pull request…
      </div>
    </div>
  )
}

function AlbusVisual() {
  const q = [
    { label: "Conceptual depth", v: 86 },
    { label: "Code quality", v: 72 },
    { label: "Reasoning", v: 94 },
  ]
  return (
    <div className="glass-soft flex h-full flex-col justify-center gap-5 rounded-2xl p-6">
      {q.map((item, i) => (
        <div key={item.label}>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-muted">{item.label}</span>
            <span className="text-foreground">{item.v}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.v}%` }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 1, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-accent to-glow"
            />
          </div>
        </div>
      ))}
      <p className="text-xs font-light text-muted">
        Adaptive difficulty · auto-graded · human-level rubric
      </p>
    </div>
  )
}
