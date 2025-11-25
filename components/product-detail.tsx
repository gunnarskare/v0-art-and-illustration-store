"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Minus, Plus } from "lucide-react"

const products: Record<
  string,
  {
    id: number
    title: string
    artist: string
    description: string
    price: number
    category: string
    image: string
    sizes: { id: string; label: string; price: number }[]
  }
> = {
  "1": {
    id: 1,
    title: "Nordisk Skog",
    artist: "Gunnar Skare",
    description:
      "En rolig illustrasjon av nordisk skogslandskap. Motivet fanger essensen av norsk natur med sine myke linjer og dempede farger. Perfekt for å bringe naturens ro inn i hjemmet.",
    price: 890,
    category: "Landskap",
    image: "/minimalist-forest-illustration-nordic-style.jpg",
    sizes: [
      { id: "small", label: "21x30 cm", price: 890 },
      { id: "medium", label: "30x40 cm", price: 1190 },
      { id: "large", label: "50x70 cm", price: 1690 },
    ],
  },
  "2": {
    id: 2,
    title: "Vårblomster",
    artist: "Elisabeth Skare",
    description:
      "Delikate vårblomster malt i akvarell. Elisabeth har fanget vårens første blomster med sin karakteristiske myke stil. Et motiv som bringer friskhet og liv til ethvert rom.",
    price: 750,
    category: "Botanisk",
    image: "/delicate-spring-flowers-watercolor-illustration.jpg",
    sizes: [
      { id: "small", label: "21x30 cm", price: 750 },
      { id: "medium", label: "30x40 cm", price: 1050 },
      { id: "large", label: "50x70 cm", price: 1450 },
    ],
  },
  "3": {
    id: 3,
    title: "Kystlandskap",
    artist: "Gunnar Skare",
    description:
      "En stemningsfull skildring av den norske kysten. Med tusjtegning har Gunnar fanget den dramatiske møtet mellom land og hav. Et tidløst motiv for dem som elsker havet.",
    price: 1200,
    category: "Landskap",
    image: "/norwegian-coastal-landscape-ink-drawing.jpg",
    sizes: [
      { id: "small", label: "21x30 cm", price: 1200 },
      { id: "medium", label: "30x40 cm", price: 1500 },
      { id: "large", label: "50x70 cm", price: 2100 },
    ],
  },
}

// Default product for unknown IDs
const defaultProduct = {
  id: 0,
  title: "Kunsttrykk",
  artist: "Fra Skare",
  description: "Et vakkert håndlaget kunsttrykk fra Fra Skare. Hvert motiv er laget med omhu og kjærlighet.",
  price: 890,
  category: "Kunst",
  image: "/artistic-watercolor-illustration-of-cozy-scandinav.jpg",
  sizes: [
    { id: "small", label: "21x30 cm", price: 890 },
    { id: "medium", label: "30x40 cm", price: 1190 },
    { id: "large", label: "50x70 cm", price: 1690 },
  ],
}

export function ProductDetail({ productId }: { productId: string }) {
  const product = products[productId] || defaultProduct
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].id)
  const [quantity, setQuantity] = useState(1)

  const currentPrice = product.sizes.find((s) => s.id === selectedSize)?.price || product.price

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
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="py-4">
          <p className="text-sm uppercase tracking-widest text-primary mb-2">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-light mb-2">{product.title}</h1>
          <p className="text-muted-foreground mb-6">av {product.artist}</p>

          <p className="text-2xl font-medium mb-8">{currentPrice} kr</p>

          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-widest mb-4">Velg størrelse</h3>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
              <div className="grid grid-cols-3 gap-4">
                {product.sizes.map((size) => (
                  <div key={size.id}>
                    <RadioGroupItem value={size.id} id={size.id} className="peer sr-only" />
                    <Label
                      htmlFor={size.id}
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-colors"
                    >
                      <span className="text-sm font-medium">{size.label}</span>
                      <span className="text-sm text-muted-foreground">{size.price} kr</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

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

          {/* Add to Cart */}
          <Button size="lg" className="w-full mb-4">
            Legg i handlekurv — {currentPrice * quantity} kr
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
