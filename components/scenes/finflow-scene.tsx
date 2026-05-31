"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FloatingGlass } from "@/components/floating-glass"

const STAGES = [
  "Dashboard",
  "AI Insights",
  "Expense Tracking",
  "Budget Intelligence",
  "Forecasting",
  "Subscriptions",
  "Analytics",
] as const

export function FinFlowScene() {
  const [active, setActive] = useState(0)

  // Auto-advance through the product story; users can also tap a stage.
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
      <div className="pointer-events-none mb-6 text-center sm:mb-8">
        <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.45em] text-accent sm:text-xs">
          Flagship Product
        </p>
        <h2 className="font-serif text-[clamp(2.6rem,9vw,7rem)] font-light leading-[0.85] tracking-[-0.03em] text-foreground cinematic-glow">
          FinFlow <span className="italic text-accent">AI</span>
        </h2>
      </div>

      <FloatingGlass
        className="glass glass-edge w-full rounded-[1.75rem] p-3 sm:rounded-[2rem] sm:p-5"
        intensity={4}
        floatAmplitude={8}
        floatDuration={12}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-5">
          {/* stage selector */}
          <StageRail active={active} onSelect={setActive} />

          {/* live app window */}
          <div className="glass-soft relative min-h-[300px] flex-1 overflow-hidden rounded-2xl p-4 sm:min-h-[340px] sm:p-6">
            <WindowChrome title={STAGES[active]} />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4"
              >
                <StageView index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </FloatingGlass>

      <p className="mt-6 max-w-md text-center text-pretty text-sm font-light leading-relaxed text-muted">
        AI-native finance that tracks, forecasts, and explains your money.
      </p>
    </div>
  )
}

function StageRail({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 lg:w-52 lg:flex-col lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {STAGES.map((s, i) => {
        const isActive = i === active
        return (
          <button
            key={s}
            onClick={() => onSelect(i)}
            className={`relative flex-none whitespace-nowrap rounded-xl px-3.5 py-2.5 text-left text-xs font-medium transition-colors lg:text-sm ${
              isActive ? "text-background" : "text-muted hover:text-foreground"
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId="ff-active"
                className="absolute inset-0 rounded-xl bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span className="relative">{s}</span>
          </button>
        )
      })}
    </div>
  )
}

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
      </div>
      <span className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">{title}</span>
      <span className="flex items-center gap-1.5 text-[0.65rem] text-glow">
        <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-glow" />
        live
      </span>
    </div>
  )
}

function StageView({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <DashboardView />
    case 1:
      return <InsightsView />
    case 2:
      return <ExpensesView />
    case 3:
      return <BudgetView />
    case 4:
      return <ForecastView />
    case 5:
      return <SubsView />
    default:
      return <AnalyticsView />
  }
}

/* ---------------- stage visuals ---------------- */

function DashboardView() {
  const stats = [
    { l: "Balance", v: "$284,910", d: "+12.4%" },
    { l: "Income", v: "$42,180", d: "+6.1%" },
    { l: "Burn", v: "$18,640", d: "-3.2%" },
  ]
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl bg-white/5 p-3"
          >
            <p className="text-[0.6rem] uppercase tracking-wider text-muted">{s.l}</p>
            <p className="mt-1 font-serif text-lg font-light text-foreground sm:text-xl">{s.v}</p>
            <p className="text-[0.65rem] text-glow">{s.d}</p>
          </motion.div>
        ))}
      </div>
      <Sparkline />
    </div>
  )
}

function InsightsView() {
  const msgs = [
    "Subscriptions rose 18% this quarter.",
    "Cancel 3 unused tools to save $142/mo.",
    "Cash runway extended to 14 months.",
  ]
  return (
    <div className="space-y-3">
      {msgs.map((m, i) => (
        <motion.div
          key={m}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.25 }}
          className="flex items-start gap-2.5 rounded-xl bg-white/5 p-3"
        >
          <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/20 text-[0.6rem] text-accent">
            AI
          </span>
          <p className="text-xs font-light leading-relaxed text-foreground sm:text-sm">{m}</p>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex items-center gap-1.5 px-1 text-[0.7rem] text-muted"
      >
        <Dots /> generating recommendations
      </motion.div>
    </div>
  )
}

function ExpensesView() {
  const rows = [
    { n: "AWS", c: "Cloud", v: "-$1,204", col: "bg-accent" },
    { n: "Figma", c: "Tools", v: "-$48", col: "bg-glow" },
    { n: "Payroll", c: "Team", v: "-$9,800", col: "bg-accent" },
    { n: "Stripe", c: "Fees", v: "-$312", col: "bg-glow" },
  ]
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <motion.div
          key={r.n}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12 }}
          className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5"
        >
          <div className="flex items-center gap-2.5">
            <span className={`h-2 w-2 rounded-full ${r.col}`} />
            <div>
              <p className="text-xs font-medium text-foreground sm:text-sm">{r.n}</p>
              <p className="text-[0.65rem] text-muted">{r.c}</p>
            </div>
          </div>
          <p className="font-mono text-xs text-foreground sm:text-sm">{r.v}</p>
        </motion.div>
      ))}
    </div>
  )
}

function BudgetView() {
  const data = [
    { l: "Engineering", v: 72 },
    { l: "Marketing", v: 46 },
    { l: "Operations", v: 88 },
  ]
  return (
    <div className="space-y-4">
      {data.map((d, i) => (
        <div key={d.l}>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-muted">{d.l}</span>
            <span className={d.v > 80 ? "text-accent" : "text-foreground"}>{d.v}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${d.v}%` }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full rounded-full ${d.v > 80 ? "bg-accent" : "bg-gradient-to-r from-accent/70 to-glow"}`}
            />
          </div>
        </div>
      ))}
      <p className="text-[0.7rem] text-muted">Operations over budget — AI suggests reallocating $4k.</p>
    </div>
  )
}

function ForecastView() {
  return (
    <div className="space-y-3">
      <Sparkline forecast />
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted">Projected EOY</span>
        <span className="font-serif text-lg font-light text-foreground">$512,400</span>
      </div>
      <div className="flex gap-3 text-[0.7rem] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-3 rounded bg-accent" /> actual
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-3 rounded bg-glow" /> AI projected
        </span>
      </div>
    </div>
  )
}

function SubsView() {
  const subs = [
    { n: "Notion", v: "$16", d: "in 3 days" },
    { n: "Vercel", v: "$20", d: "in 9 days" },
    { n: "Linear", v: "$8", d: "in 12 days" },
  ]
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {subs.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.12 }}
          className="rounded-xl bg-white/5 p-3"
        >
          <p className="text-xs font-medium text-foreground sm:text-sm">{s.n}</p>
          <p className="mt-1 font-serif text-lg font-light text-accent">{s.v}<span className="text-xs text-muted">/mo</span></p>
          <p className="text-[0.65rem] text-muted">renews {s.d}</p>
        </motion.div>
      ))}
    </div>
  )
}

function AnalyticsView() {
  const bars = [60, 82, 45, 90, 68, 74]
  return (
    <div className="space-y-4">
      <div className="flex h-32 items-end justify-between gap-2">
        {bars.map((b, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${b}%` }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-md bg-gradient-to-t from-accent/30 to-accent/90"
          />
        ))}
      </div>
      <div className="flex justify-between text-[0.65rem] text-muted">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  )
}

/* ---------------- shared bits ---------------- */

function Sparkline({ forecast = false }: { forecast?: boolean }) {
  return (
    <svg viewBox="0 0 320 90" className="h-24 w-full" role="img" aria-label="Trend chart">
      <defs>
        <linearGradient id="ffArea2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9a441" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d9a441" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 64 L45 56 L90 62 L135 42 L180 48 L225 28 L270 34 L320 14 L320 90 L0 90 Z" fill="url(#ffArea2)" />
      <motion.path
        d="M0 64 L45 56 L90 62 L135 42 L180 48 L225 28"
        fill="none"
        stroke="#d9a441"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      {forecast ? (
        <motion.path
          d="M225 28 L270 34 L320 14"
          fill="none"
          stroke="#4fd6c4"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
      ) : (
        <path d="M225 28 L270 34 L320 14" fill="none" stroke="#d9a441" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  )
}

function Dots() {
  return (
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          className="h-1 w-1 rounded-full bg-accent"
        />
      ))}
    </span>
  )
}
