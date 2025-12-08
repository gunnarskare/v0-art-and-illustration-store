"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        window.location.href = "/logg-inn"
        return
      }

      // Sjekk om brukeren er admin
      const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

      if (!adminUser) {
        window.location.href = "/logg-inn"
        return
      }

      setIsAuthorized(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-600">Laster...</p>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-semibold text-lg">
              Fra Skare Admin
            </Link>
            <div className="flex gap-4">
              <Link href="/admin" className="text-sm hover:underline">
                Dashboard
              </Link>
              <Link href="/admin/produkter" className="text-sm hover:underline">
                Produkter
              </Link>
            </div>
          </div>
          <LogoutButton />
        </div>
      </nav>
      {children}
    </div>
  )
}

function LogoutButton() {
  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/logg-inn"
  }

  return (
    <button onClick={handleLogout} className="text-sm text-stone-600 hover:underline">
      Logg ut
    </button>
  )
}
