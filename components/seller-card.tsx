"use client"

import { Star, CheckCircle, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { GlassCard } from "./glass-card"
import { Badge } from "@/components/ui/badge"
import type { Seller } from "@/lib/data"

interface SellerCardProps {
  seller: Seller
}

export function SellerCard({ seller }: SellerCardProps) {
  return (
    <Link href={`/sellers/${seller.id}`}>
      <GlassCard className="h-full border border-border/60">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Image
              src={seller.avatar}
              alt={seller.name}
              width={56}
              height={56}
              className="rounded-xl object-cover"
            />
            {seller.verified && (
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5">
                <CheckCircle className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">{seller.name}</h3>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium">{seller.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({seller.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground/90 mt-4 line-clamp-2">
          {seller.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {seller.categories.slice(0, 3).map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-secondary/45 text-xs"
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/45">
          {seller.platforms.yupoo && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              Yupoo
            </span>
          )}
          {seller.platforms.taobao && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              Taobao
            </span>
          )}
          {seller.platforms.weidian && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              Weidian
            </span>
          )}
        </div>
      </GlassCard>
    </Link>
  )
}
