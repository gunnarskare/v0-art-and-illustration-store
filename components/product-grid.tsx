import Link from "next/link"
import { getProducts, formatPrice } from "@/lib/products"

export async function ProductGrid() {
  const products = await getProducts()

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Ingen produkter tilgjengelig ennå.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Sort & Count */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-muted-foreground">Viser {products.length} produkter</p>
        <select className="bg-transparent border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="newest">Nyeste først</option>
          <option value="price-low">Pris: Lav til høy</option>
          <option value="price-high">Pris: Høy til lav</option>
          <option value="popular">Mest populære</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const lowestPrice = product.product_sizes?.length
            ? Math.min(...product.product_sizes.map((s) => s.price_in_ore))
            : 0
          return (
            <Link key={product.id} href={`/butikk/${product.id}`} className="group">
              <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted mb-4">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{product.artist}</p>
                </div>
                <p className="font-medium whitespace-nowrap">fra {formatPrice(lowestPrice)}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
