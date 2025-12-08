"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

export default function RedigerProduktPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: "",
    description: "",
    artist: "",
    category: "",
    image_url: "",
  })

  const [sizes, setSizes] = useState<Array<{ id?: string; label: string; size: string; price: number }>>([])

  useEffect(() => {
    const fetchProduct = async () => {
      const supabase = createClient()

      const { data: product, error } = await supabase
        .from("products")
        .select("*, product_sizes(*)")
        .eq("id", id)
        .single()

      if (error || !product) {
        router.push("/admin/produkter")
        return
      }

      setForm({
        name: product.name || "",
        description: product.description || "",
        artist: product.artist || "",
        category: product.category || "",
        image_url: product.image_url || "",
      })

      setSizes(
        product.product_sizes?.map((s: any) => ({
          id: s.id,
          label: s.label || "",
          size: s.size || "",
          price: (s.price_in_ore || 0) / 100,
        })) || [],
      )

      setIsLoading(false)
    }

    fetchProduct()
  }, [id, router])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Generer unikt filnavn
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

      // Last opp til Supabase Storage
      const { data, error: uploadError } = await supabase.storage.from("product-images").upload(fileName, file)

      if (uploadError) throw uploadError

      // Hent offentlig URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName)

      setForm({ ...form, image_url: publicUrl })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke laste opp bilde")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: productError } = await supabase
        .from("products")
        .update({
          name: form.name,
          description: form.description,
          artist: form.artist,
          category: form.category,
          image_url: form.image_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (productError) throw productError

      const { error: deleteError } = await supabase.from("product_sizes").delete().eq("product_id", id)
      if (deleteError) throw deleteError

      if (sizes.length > 0) {
        const sizesData = sizes.map((s) => ({
          product_id: id,
          label: s.label,
          size: s.size,
          price_in_ore: s.price * 100,
        }))

        const { error: sizesError } = await supabase.from("product_sizes").insert(sizesData)
        if (sizesError) throw sizesError
      }

      window.location.href = "/admin/produkter"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke lagre endringer")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Er du sikker på at du vil slette dette produktet?")) return

    const supabase = createClient()

    try {
      await supabase.from("product_sizes").delete().eq("product_id", id)
      await supabase.from("products").delete().eq("id", id)
      router.push("/admin/produkter")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke slette produkt")
    }
  }

  const addSize = () => {
    setSizes([...sizes, { label: "", size: "", price: 0 }])
  }

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index))
  }

  const updateSize = (index: number, field: string, value: string | number) => {
    const newSizes = [...sizes]
    newSizes[index] = { ...newSizes[index], [field]: value }
    setSizes(newSizes)
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-stone-600">Laster produkt...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/produkter" className="text-sm text-stone-600 hover:underline">
          ← Tilbake til produkter
        </Link>
        <h1 className="text-3xl font-bold text-stone-900 mt-2 mb-8">Rediger produkt</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Navn</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Beskrivelse</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Kunstner</label>
                <select
                  value={form.artist}
                  onChange={(e) => setForm({ ...form, artist: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Gunnar Skare">Gunnar Skare</option>
                  <option value="Elisabeth Skare">Elisabeth Skare</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Illustrasjon">Illustrasjon</option>
                  <option value="Akvarell">Akvarell</option>
                  <option value="Tegning">Tegning</option>
                  <option value="Landskap">Landskap</option>
                  <option value="Botanisk">Botanisk</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Produktbilde</label>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

              {form.image_url ? (
                <div className="relative">
                  <img
                    src={form.image_url || "/placeholder.svg"}
                    alt="Produktbilde"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white text-stone-700 px-2 py-1 rounded text-sm hover:bg-stone-100 shadow"
                    >
                      Bytt
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setForm({ ...form, image_url: "" })
                        if (fileInputRef.current) fileInputRef.current.value = ""
                      }}
                      className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Fjern
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full h-48 border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center text-stone-500 hover:border-stone-400 hover:text-stone-600 transition-colors"
                >
                  {isUploading ? (
                    <span>Laster opp...</span>
                  ) : (
                    <>
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span>Klikk for å laste opp bilde</span>
                      <span className="text-xs mt-1">JPG, PNG eller WebP</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Størrelser og priser</h2>
              <button type="button" onClick={addSize} className="text-sm text-green-700 hover:underline">
                + Legg til størrelse
              </button>
            </div>

            {sizes.map((size, index) => (
              <div key={index} className="flex gap-3 mb-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs text-stone-600 mb-1">Navn</label>
                  <input
                    type="text"
                    value={size.label}
                    onChange={(e) => updateSize(index, "label", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="A4"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-stone-600 mb-1">Størrelse</label>
                  <input
                    type="text"
                    value={size.size}
                    onChange={(e) => updateSize(index, "size", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="21x30cm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-stone-600 mb-1">Pris (kr)</label>
                  <input
                    type="number"
                    value={size.price}
                    onChange={(e) => updateSize(index, "price", Number.parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  Fjern
                </button>
              </div>
            ))}
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

          <div className="flex justify-between">
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 disabled:opacity-50"
              >
                {isSaving ? "Lagrer..." : "Lagre endringer"}
              </button>
              <Link href="/admin/produkter" className="px-6 py-2 bg-stone-200 rounded-md hover:bg-stone-300">
                Avbryt
              </Link>
            </div>
            <button type="button" onClick={handleDelete} className="px-6 py-2 text-red-600 hover:bg-red-50 rounded-md">
              Slett produkt
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
