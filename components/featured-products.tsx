import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getProducts, formatPrice } from "@/lib/products"

export async function FeaturedProducts() {
  const allProducts = await getProducts()
  const featuredProducts = allProducts.slice(0, 4)

  if (featuredProducts.length === 0) {
    return null
  }

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
          {featuredProducts.map((product) => {
            const lowestPrice = product.product_sizes?.length
              ? Math.min(...product.product_sizes.map((s) => s.price_in_ore))
              : 0
            return (
              <Link key={product.id} href={`/butikk/${product.slug}`} className="group">
                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted mb-4">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.artist}</p>
                <p className="font-medium">fra {formatPrice(lowestPrice)}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
