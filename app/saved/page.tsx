"use client"

import { Bookmark } from "lucide-react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SavedPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 sm:pb-20">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Saved Items</h1>
          <p className="text-muted-foreground mt-2">
            Your bookmarked sellers, products, and QC posts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard hover={false} className="text-center py-16 border border-border/60">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">No saved items yet</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Start exploring and save your favorite sellers, products, and QC posts to access them quickly later.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <Link href="/sellers">
                <Button className="rounded-xl">Browse Sellers</Button>
              </Link>
              <Link href="/finds">
                <Button variant="outline" className="rounded-xl">Explore Finds</Button>
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
