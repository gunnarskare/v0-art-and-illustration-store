import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"

export const metadata = {
  title: "Produkt | Fra Skare",
  description: "Se detaljer om dette unike kunstverket fra Fra Skare.",
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <ProductDetail productId={id} />
      </main>
      <Footer />
    </>
  )
}
