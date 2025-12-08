"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import Link from "next/link"

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={() => setIsCartOpen(false)} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Handlekurv ({totalItems})
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Handlekurven din er tom</p>
              <Button onClick={() => setIsCartOpen(false)} asChild>
                <Link href="/butikk">Utforsk butikken</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-20 h-24 rounded overflow-hidden bg-muted shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.artist}</p>
                    <p className="text-sm text-muted-foreground">{item.sizeLabel}</p>
                    <p className="font-medium mt-1">{item.price} kr</p>

                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        Fjern
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex items-center justify-between text-lg font-medium">
              <span>Totalt</span>
              <span>{totalPrice} kr</span>
            </div>
            {totalPrice < 1000 && (
              <p className="text-sm text-muted-foreground">Handle for {1000 - totalPrice} kr til for gratis frakt</p>
            )}
            {totalPrice >= 1000 && <p className="text-sm text-primary">Du har gratis frakt!</p>}
            <Button className="w-full" size="lg" asChild>
              <Link href="/kasse" onClick={() => setIsCartOpen(false)}>
                Gå til kassen
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
