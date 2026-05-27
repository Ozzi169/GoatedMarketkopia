"use client"

import { Star, ArrowUp, MessageCircle } from "lucide-react"
import Image from "next/image"
import { GlassCard } from "./glass-card"
import { Badge } from "@/components/ui/badge"
import type { QCPost } from "@/lib/data"

interface QCCardProps {
  qcPost: QCPost
}

export function QCCard({ qcPost }: QCCardProps) {
  return (
    <GlassCard className="overflow-hidden p-0 border border-border/60">
      <div className="relative">
        <div className="grid grid-cols-3 gap-0.5">
          {qcPost.images.slice(0, 3).map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden"
            >
              <Image
                src={image}
                alt={`${qcPost.productName} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {qcPost.images.length > 3 && (
          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium border border-border/50">
            +{qcPost.images.length - 3} more
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-primary font-medium tracking-wide">{qcPost.brand}</p>
            <h3 className="font-medium text-foreground mt-1">
              {qcPost.productName}
            </h3>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < qcPost.rating
                    ? "text-primary fill-primary"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <Badge variant="secondary" className="bg-secondary/50 text-xs">
            {qcPost.price}
          </Badge>
          <Badge variant="secondary" className="bg-secondary/50 text-xs">
            {qcPost.weight}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
          {qcPost.review}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/45">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowUp className="w-4 h-4" />
              {qcPost.upvotes}
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="w-4 h-4" />
              {qcPost.comments}
            </button>
          </div>
          <span className="text-xs text-muted-foreground">
            by {qcPost.author}
          </span>
        </div>
      </div>
    </GlassCard>
  )
}
