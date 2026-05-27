"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, X, TrendingUp, Clock, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import { GlassCard } from "@/components/glass-card"
import { products, categories, brands, platforms } from "@/lib/data"

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

type SortOption = "trending" | "newest" | "popular"

export default function FindsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedPlatform, setSelectedPlatform] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("trending")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "All" || 
      product.category === selectedCategory
    
    const matchesBrand = selectedBrand === "All" ||
      product.brand === selectedBrand

    const matchesPlatform = selectedPlatform === "All" ||
      product.platform.toLowerCase() === selectedPlatform.toLowerCase()

    return matchesSearch && matchesCategory && matchesBrand && matchesPlatform
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return b.upvotes - a.upvotes
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "popular":
        return b.comments - a.comments
      default:
        return 0
    }
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Finds Database</h1>
          <p className="text-muted-foreground mt-2">
            Marketplace-ready grid for products imported from external seller links
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
                  placeholder="Search products, brands, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-secondary/35 border-border/60 focus:border-primary/60 rounded-xl"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-12 rounded-xl"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex gap-2 mt-4">
              <Button
                variant={sortBy === "trending" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("trending")}
                className="rounded-lg"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </Button>
              <Button
                variant={sortBy === "newest" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("newest")}
                className="rounded-lg"
              >
                <Clock className="w-4 h-4 mr-2" />
                Newest
              </Button>
              <Button
                variant={sortBy === "popular" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("popular")}
                className="rounded-lg"
              >
                <Flame className="w-4 h-4 mr-2" />
                Popular
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
                      {categories.map((category) => (
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
                      Brand
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {brands.slice(0, 8).map((brand) => (
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

                  {(selectedCategory !== "All" || selectedBrand !== "All" || selectedPlatform !== "All") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory("All")
                        setSelectedBrand("All")
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

        {/* Active Filters */}
        {(selectedCategory !== "All" || selectedBrand !== "All" || selectedPlatform !== "All") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="px-3 py-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedBrand !== "All" && (
              <Badge variant="secondary" className="px-3 py-1">
                {selectedBrand}
                <button onClick={() => setSelectedBrand("All")} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedPlatform !== "All" && (
              <Badge variant="secondary" className="px-3 py-1">
                {selectedPlatform}
                <button onClick={() => setSelectedPlatform("All")} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </motion.div>
        )}

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground mb-6"
        >
          {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""} found
        </motion.p>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {sortedProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">No products found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 rounded-xl"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedBrand("All")
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
