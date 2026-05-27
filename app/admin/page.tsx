"use client"

import { motion } from "framer-motion"
import { 
  Users, 
  Archive, 
  ImageIcon, 
  TrendingUp,
  Plus,
  Upload,
  Settings,
  BarChart3,
  FileText,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { StatCard } from "@/components/stat-card"
import { stats } from "@/lib/data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const quickActions = [
  { icon: Plus, label: "Add Seller", description: "Add a new trusted seller to the database" },
  { icon: Upload, label: "Upload QC", description: "Upload quality check photos" },
  { icon: FileText, label: "New Product", description: "Add a new product listing" },
  { icon: Shield, label: "Verify Seller", description: "Review pending seller verifications" },
]

const recentActivity = [
  { action: "New seller added", details: "TopStoney verified", time: "2 hours ago" },
  { action: "QC uploaded", details: "Stone Island crewneck by user123", time: "4 hours ago" },
  { action: "Product added", details: "Balenciaga Track Jacket", time: "6 hours ago" },
  { action: "Seller updated", details: "LY Factory profile edited", time: "8 hours ago" },
  { action: "Report reviewed", details: "Fake seller report closed", time: "12 hours ago" },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen pt-28 pb-16 sm:pb-20">
      <div className="section-shell">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage sellers, products, and community content
            </p>
          </div>
          <Button className="rounded-xl w-fit">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              label="Total Sellers"
              value={stats.totalSellers}
              icon={Users}
              trend={{ value: 12, positive: true }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Products"
              value={stats.totalProducts}
              icon={Archive}
              trend={{ value: 8, positive: true }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="QC Posts"
              value={stats.totalQCPosts}
              icon={ImageIcon}
              trend={{ value: 15, positive: true }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Active Users"
              value={stats.activeUsers}
              icon={TrendingUp}
              trend={{ value: 23, positive: true }}
            />
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <GlassCard key={action.label} className="cursor-pointer border border-border/60">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{action.label}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <GlassCard hover={false} className="p-0 border border-border/60">
              <div className="divide-y divide-border/50">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-4">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Analytics Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>
          <GlassCard hover={false} className="relative overflow-hidden border border-border/60">
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Detailed analytics and insights will be available here. Track user engagement, 
                  popular products, and community growth.
                </p>
                <Button className="mt-6 rounded-xl">
                  View Full Analytics
                </Button>
              </div>
            </div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
