"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FloatingGlass } from "@/components/floating-glass"

/* ============================ shared shell ============================ */

function ShowcaseShell({
  kicker,
  title,
  tag,
  blurb,
  children,
  align = "left",
}: {
  kicker: string
  title: string
  tag: string
  blurb: string
  children: React.ReactNode
  align?: "left" | "right"
}) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <FloatingGlass
        className="glass glass-edge overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]"
        intensity={5}
        floatAmplitude={9}
        floatDuration={11}
      >
        <div
          className={`grid grid-cols-1 items-center gap-6 p-6 sm:gap-8 sm:p-10 lg:grid-cols-2 ${
            align === "right" ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div>
            <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-accent sm:text-xs">
              {kicker}
            </p>
            <h2 className="font-serif text-[clamp(2.6rem,7vw,4.5rem)] font-light leading-[0.9] text-foreground">
              {title}
            </h2>
            <span className="glass-soft mt-4 inline-block rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-glow">
              {tag}
            </span>
            <p className="mt-5 max-w-sm text-pretty text-sm font-light leading-relaxed text-muted sm:text-base">
              {blurb}
            </p>
          </div>
          <div className="relative w-full">{children}</div>
        </div>
      </FloatingGlass>
    </div>
  )
}

function FlowNode({
  label,
  sub,
  active,
  accent = "accent",
}: {
  label: string
  sub?: string
  active?: boolean
  accent?: "accent" | "glow"
}) {
  const ring = accent === "accent" ? "shadow-[0_0_30px_-6px_rgba(217,164,65,0.7)]" : "shadow-[0_0_30px_-6px_rgba(79,214,196,0.7)]"
  return (
    <motion.div
      animate={{
        scale: active ? 1.04 : 1,
        borderColor: active ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)",
      }}
      transition={{ duration: 0.4 }}
      className={`relative flex items-center justify-between gap-3 rounded-xl border bg-white/5 px-4 py-3 ${
        active ? ring : ""
      }`}
    >
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {sub ? <p className="text-[0.65rem] text-muted">{sub}</p> : null}
      </div>
      <span
        className={`h-2 w-2 flex-none rounded-full ${
          active ? (accent === "accent" ? "bg-accent" : "bg-glow") : "bg-foreground/20"
        }`}
      />
    </motion.div>
  )
}

/** Vertical animated connector with a travelling pulse. */
function Connector({ active }: { active?: boolean }) {
  return (
    <div className="relative mx-auto h-6 w-[2px] overflow-hidden bg-white/10">
      {active ? (
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 h-3 bg-gradient-to-b from-transparent via-accent to-transparent"
        />
      ) : null}
    </div>
  )
}

/* ============================ Loom ============================ */

const MODELS = ["Gemini", "OpenAI", "Groq", "Ollama"]

export function LoomScene() {
  const [routed, setRouted] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setRouted((r) => (r + 1) % MODELS.length), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <ShowcaseShell
      kicker="Showcase 01"
      title="Loom"
      tag="Multi-Model Routing"
      blurb="One prompt, the smartest model. Loom analyses each request and routes it to the optimal LLM in real time."
    >
      <div className="glass-soft rounded-2xl p-5">
        <FlowNode label="User Prompt" sub="incoming request" active />
        <Connector active />
        <FlowNode label="Routing Engine" sub="analysing intent · cost · latency" active accent="glow" />
        <Connector active />

        {/* model fan-out */}
        <div className="grid grid-cols-2 gap-2">
          {MODELS.map((m, i) => {
            const sel = i === routed
            return (
              <motion.div
                key={m}
                animate={{
                  opacity: sel ? 1 : 0.45,
                  scale: sel ? 1.03 : 1,
                  borderColor: sel ? "rgba(217,164,65,0.7)" : "rgba(255,255,255,0.1)",
                }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between rounded-lg border bg-white/5 px-3 py-2.5 text-xs"
              >
                <span className={sel ? "text-foreground" : "text-muted"}>{m}</span>
                {sel ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="rounded-full bg-accent px-1.5 py-0.5 text-[0.55rem] font-medium text-background"
                  >
                    routed
                  </motion.span>
                ) : null}
              </motion.div>
            )
          })}
        </div>

        <Connector active />
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-glow" />
            <span className="text-[0.65rem] text-glow">streaming response</span>
          </div>
          <div className="space-y-1.5">
            {["88%", "64%", "40%"].map((w, i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={{ width: w }}
                transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                className="h-1.5 rounded-full bg-foreground/30"
              />
            ))}
          </div>
        </div>
      </div>
    </ShowcaseShell>
  )
}

/* ============================ Albus ============================ */

const ALBUS_STEPS = [
  { l: "Student", s: "begins session" },
  { l: "Assessment", s: "adaptive questions" },
  { l: "Code Submission", s: "live editor" },
  { l: "AI Evaluation", s: "rubric grading" },
  { l: "Scoring", s: "instant feedback" },
  { l: "Analytics", s: "insights dashboard" },
]

export function AlbusScene() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % ALBUS_STEPS.length), 1600)
    return () => clearInterval(t)
  }, [])

  return (
    <ShowcaseShell
      align="right"
      kicker="Showcase 02"
      title="Albus"
      tag="AI Assessment Platform"
      blurb="From question to insight. Albus authors assessments, grades open-ended code, and turns every submission into analytics."
    >
      <div className="glass-soft rounded-2xl p-5">
        {ALBUS_STEPS.map((node, i) => (
          <div key={node.l}>
            <FlowNode label={node.l} sub={node.s} active={i === step} accent={i >= 3 ? "glow" : "accent"} />
            {i < ALBUS_STEPS.length - 1 ? <Connector active={i === step} /> : null}
          </div>
        ))}
      </div>
    </ShowcaseShell>
  )
}
