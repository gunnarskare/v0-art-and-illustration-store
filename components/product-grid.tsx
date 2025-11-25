import Link from "next/link"

const products = [
  {
    id: 1,
    title: "Nordisk Skog",
    artist: "Gunnar Skare",
    price: 890,
    category: "Landskap",
    image: "/minimalist-forest-illustration-nordic-style.jpg",
  },
  {
    id: 2,
    title: "Vårblomster",
    artist: "Elisabeth Skare",
    price: 750,
    category: "Botanisk",
    image: "/delicate-spring-flowers-watercolor-illustration.jpg",
  },
  {
    id: 3,
    title: "Kystlandskap",
    artist: "Gunnar Skare",
    price: 1200,
    category: "Landskap",
    image: "/norwegian-coastal-landscape-ink-drawing.jpg",
  },
  {
    id: 4,
    title: "Botanisk Serie I",
    artist: "Elisabeth Skare",
    price: 650,
    category: "Botanisk",
    image: "/botanical-plant-illustration-set-minimalist.jpg",
  },
  {
    id: 5,
    title: "Høstløv",
    artist: "Elisabeth Skare",
    price: 780,
    category: "Botanisk",
    image: "/autumn-leaves-watercolor-illustration.jpg",
  },
  {
    id: 6,
    title: "Fjellvidde",
    artist: "Gunnar Skare",
    price: 1100,
    category: "Landskap",
    image: "/minimalist-mountain-landscape-illustration-nordic-.jpg",
  },
  {
    id: 7,
    title: "Vilde Urter",
    artist: "Elisabeth Skare",
    price: 580,
    category: "Botanisk",
    image: "/wild-herbs-botanical-illustration-watercolor.jpg",
  },
  {
    id: 8,
    title: "Vinterlandskap",
    artist: "Gunnar Skare",
    price: 950,
    category: "Landskap",
    image: "/winter-landscape-minimalist-illustration-snow.jpg",
  },
  {
    id: 9,
    title: "Sommereng",
    artist: "Elisabeth Skare",
    price: 720,
    category: "Botanisk",
    image: "/summer-meadow-flowers-watercolor-illustration.jpg",
  },
]

export function ProductGrid() {
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
        {products.map((product) => (
          <Link key={product.id} href={`/butikk/${product.id}`} className="group">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted mb-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.artist}</p>
              </div>
              <p className="font-medium whitespace-nowrap">{product.price} kr</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
