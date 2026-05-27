"use client"

import { motion } from "framer-motion"
import { GlassCard } from "./glass-card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    positive: boolean
  }
}

export function StatCard({ label, value, icon: Icon, trend }: StatCardProps) {
  return (
    <GlassCard hover={false} className="relative overflow-hidden border border-border/60">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground/90">{label}</p>
          <p className="text-3xl font-bold mt-2 text-premium-gradient">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trend.positive ? "text-green-400" : "text-red-400"
              }`}
            >
              {trend.positive ? "+" : "-"}{trend.value}% this month
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/16 border border-primary/35 flex items-center justify-center shadow-[0_0_30px_oklch(0.58_0.22_25/0.18)]">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
    </GlassCard>
  )
}
