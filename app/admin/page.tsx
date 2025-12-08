"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function AdminDashboard() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [productCount, setProductCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      const { count } = await supabase.from("products").select("*", { count: "exact", head: true })

      setProductCount(count || 0)
      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="p-8">
        <p className="text-stone-600">Laster...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900">Admin Dashboard</h1>
          <p className="text-stone-600">Velkommen, {user?.email}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/admin/produkter"
            className="block p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Produkter</h2>
            <p className="text-stone-600">{productCount} produkter</p>
            <p className="text-sm text-green-700 mt-2">Administrer produkter →</p>
          </Link>

          <Link href="/" className="block p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Se butikken</h2>
            <p className="text-stone-600">Åpne forsiden</p>
            <p className="text-sm text-green-700 mt-2">Gå til butikken →</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
