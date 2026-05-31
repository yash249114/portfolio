"use client"

import { motion } from "framer-motion"
import { FloatingGlass } from "@/components/floating-glass"

export function FinFlowScene() {
  return (
    <div className="relative mx-auto flex w-full max-w-[92vw] flex-col items-center">
      {/* monumental title */}
      <div className="pointer-events-none relative mb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.9 }}
          className="mb-2 text-xs font-medium uppercase tracking-[0.5em] text-accent"
        >
          The Flagship
        </motion.p>
        <h2 className="font-serif text-[clamp(3rem,11vw,9rem)] font-light leading-[0.85] tracking-[-0.03em] text-foreground cinematic-glow">
          FinFlow <span className="italic text-accent">AI</span>
        </h2>
      </div>

      {/* floating dashboard */}
      <FloatingGlass
        className="glass glass-edge w-full max-w-5xl rounded-[2rem] p-5 sm:p-8"
        intensity={5}
        floatAmplitude={10}
        floatDuration={12}
      >
        <Dashboard />
      </FloatingGlass>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.6 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-8 max-w-xl text-center text-pretty text-sm font-light leading-relaxed text-muted sm:text-base"
      >
        AI-native financial intelligence — autonomous expense tracking, predictive
        cash-flow forecasting, and an assistant that explains your money in plain language.
      </motion.p>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* left: balance + forecast */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">
              Total Balance
            </p>
            <p className="font-serif text-4xl font-light text-foreground sm:text-5xl">
              $284,910
            </p>
          </div>
          <span className="glass-soft rounded-full px-3 py-1 text-xs font-medium text-glow">
            +12.4% MoM
          </span>
        </div>

        <div className="glass-soft rounded-2xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Cash-flow Forecast</p>
            <p className="text-xs text-muted">Next 6 months · AI projected</p>
          </div>
          <ForecastChart />
        </div>
      </div>

      {/* right: AI insight + expenses */}
      <div className="space-y-4">
        <div className="glass-soft rounded-2xl p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse-soft rounded-full bg-accent" />
            <p className="text-sm font-medium text-foreground">AI Insight</p>
          </div>
          <p className="text-sm font-light leading-relaxed text-muted">
            Subscriptions rose <span className="text-foreground">18%</span>. Cancel 3 unused
            tools to save <span className="text-accent">$142/mo</span>.
          </p>
        </div>

        <div className="glass-soft rounded-2xl p-4">
          <p className="mb-3 text-sm font-medium text-foreground">Spending by Category</p>
          <Bars />
        </div>
      </div>
    </div>
  )
}

function ForecastChart() {
  return (
    <svg viewBox="0 0 320 110" className="h-28 w-full" role="img" aria-label="Forecast chart">
      <defs>
        <linearGradient id="ffArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9a441" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d9a441" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 80 L45 70 L90 78 L135 55 L180 60 L225 38 L270 44 L320 18 L320 110 L0 110 Z"
        fill="url(#ffArea)"
      />
      <motion.path
        d="M0 80 L45 70 L90 78 L135 55 L180 60 L225 38 L270 44 L320 18"
        fill="none"
        stroke="#d9a441"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ amount: 0.6 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      {/* projected dashed tail */}
      <path
        d="M225 38 L270 44 L320 18"
        fill="none"
        stroke="#4fd6c4"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.8"
      />
    </svg>
  )
}

function Bars() {
  const data = [
    { label: "Ops", v: 72 },
    { label: "Cloud", v: 54 },
    { label: "Team", v: 88 },
    { label: "Tools", v: 36 },
    { label: "Misc", v: 22 },
  ]
  return (
    <div className="flex h-28 items-end justify-between gap-2">
      {data.map((d, i) => (
        <div key={d.label} className="flex w-full flex-col items-center gap-2">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: `${d.v}%` }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-md bg-gradient-to-t from-accent/30 to-accent/80"
          />
          <span className="text-[0.6rem] text-muted">{d.label}</span>
        </div>
      ))}
    </div>
  )
}
