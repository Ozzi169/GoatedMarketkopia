"use client"

import { use } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  Star, 
  CheckCircle, 
  ExternalLink, 
  Clock, 
  ShoppingBag,
  Calendar,
  ArrowLeft,
  Copy,
  Check
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/glass-card"
import { ProductCard } from "@/components/product-card"
import { QCCard } from "@/components/qc-card"
import { sellers, products, qcPosts } from "@/lib/data"

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

export default function SellerProfilePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params)
  const seller = sellers.find(s => s.id === id)
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  if (!seller) {
    notFound()
  }

  const sellerProducts = products.filter(p => p.seller.id === seller.id)
  const sellerQCPosts = qcPosts.filter(q => q.seller.id === seller.id)

  const copyToClipboard = (link: string, type: string) => {
    navigator.clipboard.writeText(link)
    setCopiedLink(type)
    setTimeout(() => setCopiedLink(null), 2000)
  }

  return (
    <div className="min-h-screen pt-28 pb-16 sm:pb-20">
      <div className="section-shell">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href="/sellers">
            <Button variant="ghost" className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sellers
            </Button>
          </Link>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard hover={false} glow className="relative overflow-hidden border border-border/60">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative shrink-0">
                <Image
                  src={seller.avatar}
                  alt={seller.name}
                  width={120}
                  height={120}
                  className="rounded-2xl object-cover"
                />
                {seller.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-1.5">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{seller.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-primary fill-primary" />
                        <span className="font-semibold">{seller.rating}</span>
                      </div>
                      <span className="text-muted-foreground">
                        ({seller.reviewCount.toLocaleString()} reviews)
                      </span>
                      {seller.verified && <Badge className="bg-primary/20 text-primary">Verified</Badge>}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mt-4">{seller.description}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {seller.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="bg-secondary/50"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-3 rounded-xl bg-secondary/30 border border-border/50">
                    <Clock className="w-5 h-5 mx-auto text-primary" />
                    <p className="text-sm text-muted-foreground mt-1">Response</p>
                    <p className="font-semibold">{seller.responseTime}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-secondary/30 border border-border/50">
                    <ShoppingBag className="w-5 h-5 mx-auto text-primary" />
                    <p className="text-sm text-muted-foreground mt-1">Sales</p>
                    <p className="font-semibold">{seller.salesCount.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-secondary/30 border border-border/50">
                    <Star className="w-5 h-5 mx-auto text-primary" />
                    <p className="text-sm text-muted-foreground mt-1">Rating</p>
                    <p className="font-semibold">{seller.rating}/5</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-secondary/30 border border-border/50">
                    <Calendar className="w-5 h-5 mx-auto text-primary" />
                    <p className="text-sm text-muted-foreground mt-1">Joined</p>
                    <p className="font-semibold">{seller.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <h3 className="font-semibold mb-4">Store Links</h3>
              <div className="flex flex-wrap gap-3">
                {seller.platforms.yupoo && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30 border border-border/50 flex-1 min-w-[200px]">
                    <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm truncate flex-1">{seller.platforms.yupoo}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => copyToClipboard(seller.platforms.yupoo!, "yupoo")}
                    >
                      {copiedLink === "yupoo" ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                )}
                {seller.platforms.taobao && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30 border border-border/50 flex-1 min-w-[200px]">
                    <ExternalLink className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="text-sm truncate flex-1">{seller.platforms.taobao}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => copyToClipboard(seller.platforms.taobao!, "taobao")}
                    >
                      {copiedLink === "taobao" ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                )}
                {seller.platforms.weidian && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30 border border-border/50 flex-1 min-w-[200px]">
                    <ExternalLink className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="text-sm truncate flex-1">{seller.platforms.weidian}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => copyToClipboard(seller.platforms.weidian!, "weidian")}
                    >
                      {copiedLink === "weidian" ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          </GlassCard>
        </motion.div>

        {/* Products Section */}
        {sellerProducts.length > 0 && (
          <section className="mt-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6"
            >
              Products ({sellerProducts.length})
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {sellerProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* QC Posts Section */}
        {sellerQCPosts.length > 0 && (
          <section className="mt-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6"
            >
              QC Reviews ({sellerQCPosts.length})
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {sellerQCPosts.map((qcPost) => (
                <motion.div key={qcPost.id} variants={itemVariants}>
                  <QCCard qcPost={qcPost} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}
      </div>
    </div>
  )
}
