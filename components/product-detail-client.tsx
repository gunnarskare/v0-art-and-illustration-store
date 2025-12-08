"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Minus, Plus, Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice, type Product } from "@/lib/products"

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.product_sizes[0]?.size || "")
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()

  const currentSize = product.product_sizes.find((s) => s.size === selectedSize) || product.product_sizes[0]
  const currentPrice = currentSize?.price_in_ore || 0

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      title: product.name,
      artist: product.artist,
      image: product.image_url,
      size: selectedSize,
      sizeLabel: currentSize.label,
      price: currentPrice / 100, // Convert to kroner for cart
      quantity,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href="/butikk"
        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Tilbake til butikk
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
          <img
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="py-4">
          <p className="text-sm uppercase tracking-widest text-primary mb-2">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-light mb-2">{product.name}</h1>
          <p className="text-muted-foreground mb-6">av {product.artist}</p>

          <p className="text-2xl font-medium mb-8">{formatPrice(currentPrice)}</p>

          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          {/* Size Selection */}
          {product.product_sizes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-widest mb-4">Velg størrelse</h3>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="grid grid-cols-3 gap-4">
                  {product.product_sizes.map((size) => (
                    <div key={size.id}>
                      <RadioGroupItem value={size.size} id={size.id} className="peer sr-only" />
                      <Label
                        htmlFor={size.id}
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium">{size.label}</span>
                        <span className="text-sm text-muted-foreground">{formatPrice(size.price_in_ore)}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-widest mb-4">Antall</h3>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" className="w-full mb-4" onClick={handleAddToCart} disabled={isAdded}>
            {isAdded ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Lagt til i handlekurv
              </>
            ) : (
              `Legg i handlekurv — ${formatPrice(currentPrice * quantity)}`
            )}
          </Button>

          {/* Additional Info */}
          <div className="border-t border-border pt-8 mt-8 space-y-4 text-sm text-muted-foreground">
            <p>• Trykket på høykvalitets 300g matt papir</p>
            <p>• Signert og nummerert av kunstneren</p>
            <p>• Sendes forsiktig pakket innen 3-5 virkedager</p>
            <p>• Gratis frakt ved kjøp over 1000 kr</p>
          </div>
        </div>
      </div>
    </div>
  )
}
