"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import Link from "next/link"

export default function NyttProduktPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: "",
    description: "",
    artist: "Gunnar Skare",
    category: "Illustrasjon",
    image_url: "",
  })

  const [sizes, setSizes] = useState([{ label: "A4", size: "21x30cm", price: 299 }])

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
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      // Opprett produkt
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          name: form.name,
          description: form.description,
          artist: form.artist,
          category: form.category,
          image_url: form.image_url,
        })
        .select()
        .single()

      if (productError) throw productError

      // Opprett størrelser
      if (sizes.length > 0) {
        const sizesData = sizes.map((s) => ({
          product_id: product.id,
          label: s.label,
          size: s.size,
          price_in_ore: s.price * 100,
        }))

        const { error: sizesError } = await supabase.from("product_sizes").insert(sizesData)

        if (sizesError) throw sizesError
      }

      router.push("/admin/produkter")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke lagre produkt")
    } finally {
      setIsLoading(false)
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

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/produkter" className="text-sm text-stone-600 hover:underline">
          ← Tilbake til produkter
        </Link>
        <h1 className="text-3xl font-bold text-stone-900 mt-2 mb-8">Nytt produkt</h1>

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
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ ...form, image_url: "" })
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Fjern
                  </button>
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

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 disabled:opacity-50"
            >
              {isLoading ? "Lagrer..." : "Lagre produkt"}
            </button>
            <Link href="/admin/produkter" className="px-6 py-2 bg-stone-200 rounded-md hover:bg-stone-300">
              Avbryt
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
