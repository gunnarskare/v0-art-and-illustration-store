import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailClient } from "@/components/product-detail-client"
import { getProduct } from "@/lib/products"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Produkt | Fra Skare",
  description: "Se detaljer om dette unike kunstverket fra Fra Skare.",
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

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
