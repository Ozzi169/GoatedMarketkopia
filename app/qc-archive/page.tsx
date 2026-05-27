"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X, Star, Camera, Upload } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { QCCard } from "@/components/qc-card"
import { GlassCard } from "@/components/glass-card"
import { qcPosts, brands } from "@/lib/data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function QCArchivePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPost, setSelectedPost] = useState<typeof qcPosts[0] | null>(null)

  const filteredPosts = qcPosts.filter((post) => {
    const matchesSearch = post.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesBrand = selectedBrand === "All" || post.brand === selectedBrand
    
    const matchesRating = selectedRating === null || post.rating >= selectedRating

    return matchesSearch && matchesBrand && matchesRating
  })

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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">QC Archive</h1>
            <p className="text-muted-foreground mt-2">
              Quality check photos and reviews from the community
            </p>
          </div>
          <Button className="rounded-xl w-fit">
            <Upload className="w-4 h-4 mr-2" />
            Upload QC
          </Button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard hover={false} className="p-4 border border-border/60">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search QC posts, brands, users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-secondary/35 border-border/60 focus:border-primary/60 rounded-xl"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 rounded-xl"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-border/50"
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Brand
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["All", "Stone Island", "Balenciaga", "The North Face", "Rick Owens"].map((brand) => (
                        <Button
                          key={brand}
                          variant={selectedBrand === brand ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedBrand(brand)}
                          className="rounded-lg"
                        >
                          {brand}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Minimum Rating
                    </label>
                    <div className="flex gap-2">
                      {[null, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating ?? "all"}
                          variant={selectedRating === rating ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedRating(rating)}
                          className="rounded-lg"
                        >
                          {rating === null ? "All" : (
                            <span className="flex items-center gap-1">
                              {rating}+ <Star className="w-3 h-3 fill-current" />
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {(selectedBrand !== "All" || selectedRating !== null) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedBrand("All")
                        setSelectedRating(null)
                      }}
                      className="text-muted-foreground"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear filters
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <Camera className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {filteredPosts.length} QC post{filteredPosts.length !== 1 ? "s" : ""} found
          </span>
        </motion.div>

        {/* QC Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {filteredPosts.map((post) => (
            <motion.div 
              key={post.id} 
              variants={itemVariants}
              onClick={() => setSelectedPost(post)}
              className="cursor-pointer"
            >
              <QCCard qcPost={post} />
            </motion.div>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">No QC posts found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 rounded-xl"
              onClick={() => {
                setSearchQuery("")
                setSelectedBrand("All")
                setSelectedRating(null)
              }}
            >
              Clear all filters
            </Button>
          </motion.div>
        )}

        {/* Image Lightbox Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass luxury-surface rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-border/60"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-sm text-primary font-medium">{selectedPost.brand}</p>
                      <h2 className="text-2xl font-bold mt-1">{selectedPost.productName}</h2>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < selectedPost.rating
                                ? "text-primary fill-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedPost(null)}
                      className="rounded-xl"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {selectedPost.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src={image}
                          alt={`${selectedPost.productName} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <Badge variant="secondary" className="bg-secondary/50">
                      {selectedPost.price}
                    </Badge>
                    <Badge variant="secondary" className="bg-secondary/50">
                      {selectedPost.weight}
                    </Badge>
                    <Badge variant="secondary" className="bg-secondary/50">
                      From {selectedPost.seller.name}
                    </Badge>
                  </div>

                  <div className="border-t border-border/50 pt-6">
                    <h3 className="font-semibold mb-2">Review by {selectedPost.author}</h3>
                    <p className="text-muted-foreground">{selectedPost.review}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
