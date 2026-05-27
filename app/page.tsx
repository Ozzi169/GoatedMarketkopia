"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { Users, Archive, Image as ImageIcon, TrendingUp, ArrowRight, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/glass-card"
import { SellerCard } from "@/components/seller-card"
import { ProductCard } from "@/components/product-card"
import { QCCard } from "@/components/qc-card"
import { StatCard } from "@/components/stat-card"
import { sellers, products, qcPosts, stats } from "@/lib/data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function HomePage() {
  const mouseX = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const heroY = useTransform(smoothX, [0, 100], [8, -8])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 100)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [mouseX])

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Hero Section */}
      <section className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto relative"
        >
          {/* Floating logo accent — parallax only, not the main logo */}
          <motion.div
            style={{ y: heroY }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none"
            aria-hidden
          >
            <div className="w-16 h-16 rounded-full bg-primary/12 blur-2xl" />
          </motion.div>

          {/* Decorative floating logo particles */}
          <motion.div
            className="absolute -left-4 sm:left-6 top-6 h-7 w-7 opacity-20 pointer-events-none"
            animate={{ y: [0, -10, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "url('/goatedmarket-logo.png') center/contain no-repeat" }}
            aria-hidden
          />
          <motion.div
            className="absolute -right-2 sm:right-8 top-12 h-5 w-5 opacity-22 pointer-events-none"
            animate={{ y: [0, -8, 0], rotate: [0, 8, -7, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            style={{ background: "url('/goatedmarket-logo.png') center/contain no-repeat" }}
            aria-hidden
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-7 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium tracking-wide uppercase">
              Luxury marketplace intelligence
            </span>
          </motion.div>

          {/* Single logo render */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="flex justify-center mb-6"
          >
            <Image
              src="/goatedmarket-logo.png"
              alt="GoatedMarket"
              width={256}
              height={256}
              priority
              quality={100}
              sizes="(max-width: 640px) 60px, 72px"
              className="h-16 w-auto sm:h-[4.5rem] object-contain drop-shadow-[0_0_24px_oklch(0.58_0.22_25/0.35)]"
            />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
            <span className="text-premium-gradient">GoatedMarket</span>
            <br />
            <span className="text-foreground/90 text-3xl sm:text-4xl md:text-5xl font-semibold">
              Premium Finds. Verified Sellers.
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mt-5 text-pretty max-w-xl mx-auto">
            A curated marketplace for imported seller products — high-trust discovery across
            Weidian, Taobao, and Yupoo ecosystems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search sellers, products, brands..."
                className="pl-10 h-11 bg-secondary/30 border-border/60 focus:border-primary/60 rounded-xl text-sm"
              />
            </div>
            <Button size="lg" className="h-11 px-7 rounded-xl w-full sm:w-auto font-medium">
              Explore Marketplace
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              label="Trusted Sellers"
              value={stats.totalSellers}
              icon={Users}
              trend={{ value: 12, positive: true }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Products Listed"
              value={stats.totalProducts}
              icon={Archive}
              trend={{ value: 8, positive: true }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="QC Reviews"
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
      </section>

      {/* Trusted Sellers Section */}
      <section className="section-shell mt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between mb-7"
        >
          <div>
            <h2 className="section-title">Trusted Sellers</h2>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Verified sellers with proven track records
            </p>
          </div>
          <Link href="/sellers">
            <Button variant="ghost" size="sm" className="rounded-xl text-muted-foreground hover:text-foreground">
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {sellers.slice(0, 3).map((seller) => (
            <motion.div key={seller.id} variants={itemVariants}>
              <SellerCard seller={seller} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trending Finds Section */}
      <section className="section-shell mt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between mb-7"
        >
          <div>
            <h2 className="section-title">Trending Finds</h2>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Most upvoted products this week
            </p>
          </div>
          <Link href="/finds">
            <Button variant="ghost" size="sm" className="rounded-xl text-muted-foreground hover:text-foreground">
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {products.slice(0, 4).map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Latest QC Section */}
      <section className="section-shell mt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between mb-7"
        >
          <div>
            <h2 className="section-title">Latest QC Reviews</h2>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Fresh quality check photos from the community
            </p>
          </div>
          <Link href="/qc-archive">
            <Button variant="ghost" size="sm" className="rounded-xl text-muted-foreground hover:text-foreground">
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {qcPosts.map((qcPost) => (
            <motion.div key={qcPost.id} variants={itemVariants}>
              <QCCard qcPost={qcPost} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="section-shell mt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard
            hover={false}
            glow
            className="text-center py-14 relative overflow-hidden border border-border/60"
          >
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-widest text-primary/70 font-medium mb-3">Community</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Join the Community</h2>
              <p className="text-muted-foreground mt-4 max-w-md mx-auto text-sm md:text-base">
                Share your finds, upload QC photos, and help others discover the best sellers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                <Button size="lg" className="rounded-xl px-8 font-medium">
                  Upload QC Photos
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl px-8 font-medium">
                  Submit a Find
                </Button>
              </div>
            </div>
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
          </GlassCard>
        </motion.div>
      </section>
    </div>
  )
}
