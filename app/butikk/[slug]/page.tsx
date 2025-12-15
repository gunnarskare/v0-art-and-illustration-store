import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailClient } from "@/components/product-detail-client"
import { createClient } from "@/lib/supabase/client"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Produkt | Fra Skare",
  description: "Se detaljer om dette unike kunstverket fra Fra Skare.",
}

async function getProductBySlug(slug: string) {
  const supabase = createClient()

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      product_sizes (*)
    `)
    .eq("slug", slug)
    .single()

  if (error || !product) return null
  return product
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </>
  )
}
