import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    title: "Nordisk Skog",
    artist: "Gunnar Skare",
    price: 890,
    image: "/minimalist-forest-illustration-nordic-style.jpg",
  },
  {
    id: 2,
    title: "Vårblomster",
    artist: "Elisabeth Skare",
    price: 750,
    image: "/delicate-spring-flowers-watercolor-illustration.jpg",
  },
  {
    id: 3,
    title: "Kystlandskap",
    artist: "Gunnar Skare",
    price: 1200,
    image: "/norwegian-coastal-landscape-ink-drawing.jpg",
  },
  {
    id: 4,
    title: "Botanisk Serie",
    artist: "Elisabeth Skare",
    price: 650,
    image: "/botanical-plant-illustration-set-minimalist.jpg",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary mb-2">Utvalgte verk</p>
            <h2 className="text-3xl md:text-4xl font-light">Populære motiver</h2>
          </div>
          <Button asChild variant="ghost" className="group self-start md:self-auto">
            <Link href="/butikk">
              Se alle
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/butikk/${product.id}`} className="group">
              <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{product.artist}</p>
              <p className="font-medium">{product.price} kr</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
