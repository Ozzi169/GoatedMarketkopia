"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, Archive, Users, Image as ImageIcon, Compass, Bookmark, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

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
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-3 mt-3 sm:mx-4 sm:mt-4">
        <nav className="glass luxury-surface rounded-2xl px-3 sm:px-5 lg:px-6 py-3 border border-border/60 shadow-[0_8px_40px_oklch(0.02_0_0/0.5)]">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group">
              <Image
                src="/goatedmarket-logo.png"
                alt="GoatedMarket"
                width={256}
                height={256}
                priority
                quality={100}
                sizes="(max-width: 640px) 40px, 48px"
                className="h-10 w-auto sm:h-11 md:h-12 object-contain transition-opacity duration-200 group-hover:opacity-80"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn("nav-link", isActive(link.href) && "active")}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-1.5">
              {/* Desktop Search */}
              <div className="hidden md:flex relative items-center">
                <AnimatePresence mode="wait">
                  {isSearchOpen ? (
                    <motion.div
                      key="search-open"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 260, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <Input
                        placeholder="Search sellers, products..."
                        className="h-9 bg-secondary/40 border-border/60 focus:border-primary/60 rounded-xl text-sm"
                        autoFocus
                        onBlur={() => setIsSearchOpen(false)}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="search-closed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSearchOpen(true)}
                        className="rounded-xl hover:bg-secondary/50 size-9"
                      >
                        <Search className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-xl hover:bg-secondary/50 size-9"
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Divider */}
              <div className="hidden md:block w-px h-5 bg-border/50 mx-0.5" />

              {/* Admin Dashboard Link */}
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-xl hover:bg-secondary/50 size-9",
                    isActive("/admin") && "bg-secondary/50 text-foreground"
                  )}
                >
                  <LayoutDashboard className="w-4 h-4" />
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl hover:bg-secondary/50 size-9"
                onClick={() => setIsOpen(!isOpen)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
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
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pt-3 pb-2 mt-3 border-t border-border/40 space-y-0.5">
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    const active = isActive(link.href)
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-all duration-200",
                          active
                            ? "text-foreground bg-secondary/50"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                        )}
                      >
                        <Icon className={cn("w-4 h-4 shrink-0", active && "text-primary")} />
                        <span>{link.label}</span>
                        {active && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
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
