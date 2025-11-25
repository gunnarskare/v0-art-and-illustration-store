"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 2000])

  const artists = [
    { id: "gunnar", label: "Gunnar Skare" },
    { id: "elisabeth", label: "Elisabeth Skare" },
  ]

  const categories = [
    { id: "landskap", label: "Landskap" },
    { id: "botanisk", label: "Botanisk" },
    { id: "dyr", label: "Dyr" },
    { id: "abstrakt", label: "Abstrakt" },
  ]

  const sizes = [
    { id: "small", label: "Liten (21x30 cm)" },
    { id: "medium", label: "Medium (30x40 cm)" },
    { id: "large", label: "Stor (50x70 cm)" },
  ]

  return (
    <div className="space-y-8">
      {/* Artist Filter */}
      <div>
        <h3 className="text-sm uppercase tracking-widest mb-4">Kunstner</h3>
        <div className="space-y-3">
          {artists.map((artist) => (
            <div key={artist.id} className="flex items-center gap-3">
              <Checkbox id={artist.id} />
              <Label htmlFor={artist.id} className="text-sm cursor-pointer">
                {artist.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm uppercase tracking-widest mb-4">Kategori</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              <Checkbox id={category.id} />
              <Label htmlFor={category.id} className="text-sm cursor-pointer">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="text-sm uppercase tracking-widest mb-4">Størrelse</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <div key={size.id} className="flex items-center gap-3">
              <Checkbox id={size.id} />
              <Label htmlFor={size.id} className="text-sm cursor-pointer">
                {size.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-sm uppercase tracking-widest mb-4">Pris</h3>
        <Slider value={priceRange} onValueChange={setPriceRange} max={2000} step={50} className="mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{priceRange[0]} kr</span>
          <span>{priceRange[1]} kr</span>
        </div>
      </div>

      {/* Reset Button */}
      <Button variant="outline" className="w-full bg-transparent">
        Nullstill filtre
      </Button>
    </div>
  )
}
