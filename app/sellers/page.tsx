"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SellerCard } from "@/components/seller-card"
import { GlassCard } from "@/components/glass-card"
import { sellers, categories, platforms } from "@/lib/data"

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

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPlatform, setSelectedPlatform] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const sellerCategories = ["All", "Stone Island", "Balenciaga", "Nike", "Rick Owens", "Supreme", "Dior"]

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "All" || 
      seller.categories.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase()))
    
    const matchesPlatform = selectedPlatform === "All" ||
      (selectedPlatform === "Taobao" && seller.platforms.taobao) ||
      (selectedPlatform === "Weidian" && seller.platforms.weidian) ||
      (selectedPlatform === "Yupoo" && seller.platforms.yupoo)

    return matchesSearch && matchesCategory && matchesPlatform
  })

  return (
    <div className="min-h-screen pt-28 pb-16 sm:pb-20">
      <div className="section-shell">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Trusted Sellers</h1>
          <p className="text-muted-foreground mt-2">
            Browse our curated list of verified sellers with proven track records
          </p>
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
                  placeholder="Search sellers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-secondary/35 border-border/60 focus:border-primary/60 rounded-xl"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 rounded-xl lg:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {(selectedCategory !== "All" || selectedPlatform !== "All") && (
                  <Badge className="ml-2 bg-primary/20 text-primary">
                    {[selectedCategory !== "All", selectedPlatform !== "All"].filter(Boolean).length}
                  </Badge>
                )}
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
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sellerCategories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="rounded-lg"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Platform
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {platforms.map((platform) => (
                        <Button
                          key={platform}
                          variant={selectedPlatform === platform ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedPlatform(platform)}
                          className="rounded-lg"
                        >
                          {platform}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {(selectedCategory !== "All" || selectedPlatform !== "All") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory("All")
                        setSelectedPlatform("All")
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
          <CheckCircle className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {filteredSellers.length} verified seller{filteredSellers.length !== 1 ? "s" : ""} found
          </span>
        </motion.div>

        {/* Sellers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredSellers.map((seller) => (
            <motion.div key={seller.id} variants={itemVariants}>
              <SellerCard seller={seller} />
            </motion.div>
          ))}
        </motion.div>

        {filteredSellers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">No sellers found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 rounded-xl"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedPlatform("All")
              }}
            >
              Clear all filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
