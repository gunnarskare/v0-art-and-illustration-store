import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

export const metadata = {
  title: "Butikk | Fra Skare",
  description: "Utforsk våre håndlagde illustrasjoner og kunsttrykk. Unik kunst til hjemmet ditt.",
}

export default function ButikkPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light mb-4">Butikk</h1>
            <p className="text-muted-foreground leading-relaxed">
              Utforsk vår samling av håndlagde illustrasjoner og kunsttrykk. Hvert motiv er laget med omhu og
              kjærlighet.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 shrink-0">
              <ProductFilters />
            </aside>
            <div className="flex-1">
              <ProductGrid />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
