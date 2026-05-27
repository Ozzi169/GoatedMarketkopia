"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { 
  Users, 
  Archive, 
  ImageIcon, 
  TrendingUp,
  ArrowRight,
  Search,
  Sparkles
} from "lucide-react"
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
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function HomePage() {
  const mouseX = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 18 })
  const heroY = useTransform(smoothX, [0, 100], [10, -10])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 100)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [mouseX])

  return (
    <div className="min-h-screen pt-28 pb-16 sm:pb-20">
      {/* Hero Section */}
      <section className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto relative"
        >
          <motion.div
            style={{ y: heroY }}
            className="absolute -top-14 left-1/2 -translate-x-1/2"
          >
            <Image
              src="/goatedmarket-logo.png"
              alt="GoatedMarket"
              width={256}
              height={256}
              priority
              quality={100}
              sizes="80px"
              className="h-20 w-auto object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute -left-6 sm:left-8 top-8 h-8 w-8 opacity-25"
            animate={{ y: [0, -10, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "url('/goatedmarket-logo.png') center/contain no-repeat" }}
          />
          <motion.div
            className="absolute -right-2 sm:right-10 top-14 h-6 w-6 opacity-30"
            animate={{ y: [0, -8, 0], rotate: [0, 8, -7, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            style={{ background: "url('/goatedmarket-logo.png') center/contain no-repeat" }}
          />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              Luxury marketplace intelligence platform
            </span>
          </div>

          <Image
            src="/goatedmarket-logo.png"
            alt="GoatedMarket"
            width={256}
            height={256}
            priority
            quality={100}
            sizes="(max-width: 640px) 64px, 80px"
            className="h-16 w-auto sm:h-20 object-contain mx-auto mb-6"
          />
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance leading-tight">
            <span className="text-premium-gradient">GoatedMarket</span>
            <br />
            Premium Finds. Verified Sellers. Zero Noise.
          </h1>
          
          <p className="text-lg text-muted-foreground mt-6 text-pretty max-w-2xl mx-auto">
            Explore a cinematic, curated marketplace UI designed for imported external seller products,
            high-trust discovery, and premium browsing across Weidian, Taobao, and Yupoo ecosystems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search sellers, products, brands..."
                className="pl-12 h-12 bg-secondary/35 border-border/60 focus:border-primary/60 rounded-xl"
              />
            </div>
            <Button size="lg" className="h-12 px-8 rounded-xl w-full sm:w-auto">
              Explore Marketplace
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-16"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="section-title">Trusted Sellers</h2>
            <p className="text-muted-foreground mt-1">
              Verified sellers with proven track records
            </p>
          </div>
          <Link href="/sellers">
            <Button variant="ghost" className="rounded-xl">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="section-title">Trending Finds</h2>
            <p className="text-muted-foreground mt-1">
              Most upvoted products this week
            </p>
          </div>
          <Link href="/finds">
            <Button variant="ghost" className="rounded-xl">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="section-title">Latest QC Reviews</h2>
            <p className="text-muted-foreground mt-1">
              Fresh quality check photos from the community
            </p>
          </div>
          <Link href="/qc-archive">
            <Button variant="ghost" className="rounded-xl">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard
            hover={false}
            glow
            className="text-center py-12 relative overflow-hidden border border-border/60"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-bold">Join the Community</h2>
              <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
                Share your finds, upload QC photos, and help others discover the best sellers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button size="lg" className="rounded-xl px-8">
                  Upload QC Photos
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl px-8">
                  Submit a Find
                </Button>
              </div>
            </div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          </GlassCard>
        </motion.div>
      </section>
    </div>
  )
}
