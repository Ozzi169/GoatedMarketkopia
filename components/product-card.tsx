"use client"

import { ArrowUp, MessageCircle, ExternalLink, Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { GlassCard } from "./glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [saved, setSaved] = useState(false)
  const platformColors = {
    taobao: "bg-orange-500/20 text-orange-400",
    weidian: "bg-green-500/20 text-green-400",
    yupoo: "bg-blue-500/20 text-blue-400",
  }

  return (
    <GlassCard className="group overflow-hidden p-0 border border-border/60">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -bottom-12 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Badge
          className={`absolute top-3 right-3 border border-white/10 ${platformColors[product.platform]}`}
        >
          {product.platform}
        </Badge>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setSaved((s) => !s)
          }}
          className="absolute top-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl transition-all duration-300 hover:bg-black/45 hover:shadow-[0_0_20px_oklch(0.58_0.22_25/0.18)]"
          aria-label={saved ? 'Remove from saved' : 'Save product'}
        >
          <Bookmark className={`h-4 w-4 transition-colors ${saved ? "text-primary" : "text-foreground/80"}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-primary font-medium tracking-wide">{product.brand}</p>
            <h3 className="font-medium text-foreground mt-1 line-clamp-1">
              {product.name}
            </h3>
          </div>
          <span className="text-lg font-bold text-primary shrink-0">
            {product.price}
          </span>
        </div>

        <Link
          href={`/sellers/${product.seller.id}`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2 block"
        >
          {product.seller.name}
        </Link>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-secondary/40 text-[11px]">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/45">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowUp className="w-4 h-4" />
              {product.upvotes}
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="w-4 h-4" />
              {product.comments}
            </button>
          </div>
          <Button size="sm" asChild className="h-8 px-3 rounded-lg">
            <a href={product.link} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </GlassCard>
  )
}
