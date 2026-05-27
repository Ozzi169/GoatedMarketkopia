"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Menu, 
  X, 
  Archive,
  Users, 
  ImageIcon, 
  Compass,
  Bookmark,
  LayoutDashboard
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const navLinks = [
  { href: "/", label: "Home", icon: Archive },
  { href: "/sellers", label: "Trusted Sellers", icon: Users },
  { href: "/finds", label: "Finds", icon: Compass },
  { href: "/qc-archive", label: "QC Archive", icon: ImageIcon },
  { href: "/saved", label: "Saved", icon: Bookmark },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-3 mt-3 sm:mx-4 sm:mt-4">
        <nav className="glass luxury-surface rounded-2xl px-3 sm:px-4 lg:px-6 py-3 border border-border/60">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/goatedmarket-logo.png"
                alt="GoatedMarket"
                width={256}
                height={256}
                priority
                quality={100}
                sizes="(max-width: 640px) 44px, 52px"
                className="h-11 w-auto sm:h-12 md:h-[52px] object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 rounded-xl hover:bg-secondary/45 hover:shadow-[0_0_18px_oklch(0.55_0.2_25/0.2)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-2">
              {/* Desktop Search */}
              <div className="hidden md:flex relative">
                <AnimatePresence>
                  {isSearchOpen ? (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 280, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <Input
                        placeholder="Search sellers, products..."
                        className="bg-secondary/40 border-border/60 focus:border-primary/60 rounded-xl"
                        autoFocus
                        onBlur={() => setIsSearchOpen(false)}
                      />
                    </motion.div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchOpen(true)}
                      className="rounded-xl hover:bg-secondary/50"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-xl hover:bg-secondary/50"
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Admin Dashboard Link */}
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl hover:bg-secondary/50"
                >
                  <LayoutDashboard className="w-4 h-4" />
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl hover:bg-secondary/50"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground transition-all rounded-xl hover:bg-secondary/45"
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  )
}
