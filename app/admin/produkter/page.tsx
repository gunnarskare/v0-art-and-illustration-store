"use client"

import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useEffect, useState } from "react"

type Product = {
  id: number
  name: string
  artist: string
  category: string
  image_url: string | null
}

export default function ProdukterPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      const supabase = createClient()
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      setProducts(data || [])
      setLoading(false)
    }
    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p>Laster produkter...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/admin" className="text-sm text-stone-600 hover:underline">
              ← Tilbake til dashboard
            </Link>
            <h1 className="text-3xl font-bold text-stone-900 mt-2">Produkter</h1>
          </div>
          <Link href="/admin/produkter/ny" className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800">
            + Nytt produkt
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {products.length > 0 ? (
            <table className="w-full">
              <thead className="bg-stone-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium">Bilde</th>
                  <th className="text-left p-4 font-medium">Navn</th>
                  <th className="text-left p-4 font-medium">Kunstner</th>
                  <th className="text-left p-4 font-medium">Kategori</th>
                  <th className="text-left p-4 font-medium">Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="p-4">
                      {product.image_url ? (
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-stone-100 rounded" />
                      )}
                    </td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 text-stone-600">{product.artist}</td>
                    <td className="p-4 text-stone-600">{product.category}</td>
                    <td className="p-4">
                      <Link href={`/admin/produkter/${product.id}`} className="text-green-700 hover:underline">
                        Rediger
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-stone-600">
              Ingen produkter ennå.{" "}
              <Link href="/admin/produkter/ny" className="text-green-700 hover:underline">
                Legg til det første produktet
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
