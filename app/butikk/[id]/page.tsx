import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"

export const metadata = {
  title: "Produkt | Fra Skare",
  description: "Se detaljer om dette unike kunstverket fra Fra Skare.",
}

export async function generateStaticParams() {
  // Generate static pages for common product IDs
  // You can expand this list or fetch from an API
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ]
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
