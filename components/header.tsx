"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems, setIsCartOpen } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-semibold tracking-wide text-foreground">
            Fra Skare
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/butikk"
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              Butikk
            </Link>
            <Link
              href="/om-oss"
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              Om Oss
            </Link>
            <Link
              href="/blogg"
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              Blogg
            </Link>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/butikk"
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Butikk
              </Link>
              <Link
                href="/om-oss"
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Om Oss
              </Link>
              <Link
                href="/blogg"
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogg
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
