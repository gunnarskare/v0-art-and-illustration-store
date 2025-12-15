"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useParams } from "next/navigation"

export default function RedigerBlogginnleggPage() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: "",
    author: "",
    category: "",
    image_url: "",
    featured: false,
  })

  useEffect(() => {
    if (params.id === "ny") {
      router.push("/admin/blogg/ny")
      return
    }
    loadPost()
  }, [params.id])

  async function loadPost() {
    if (params.id === "ny") return

    const { data, error } = await supabase.from("blog_posts").select("*").eq("id", params.id).single()

    if (error) {
      console.error("Feil ved lasting:", error)
      alert("Feil ved lasting: " + error.message)
    } else if (data) {
      setFormData(data)
    }
    setLoading(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, file)

    if (uploadError) {
      alert("Feil ved opplasting: " + uploadError.message)
      setUploading(false)
      return
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(filePath)

    setFormData({ ...formData, image_url: publicUrl })
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase
      .from("blog_posts")
      .update({
        ...formData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)

    if (error) {
      alert("Feil ved lagring: " + error.message)
    } else {
      window.location.href = "/admin/blogg"
    }
  }

  if (loading) {
    return <div className="p-8">Laster...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-light mb-8">Rediger blogginnlegg</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Tittel</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kort beskrivelse</label>
          <textarea
            required
            rows={3}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Innhold</label>
          <textarea
            required
            rows={10}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Forfatter</label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Dato</label>
          <input
            type="text"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-3 border rounded-lg"
            placeholder="f.eks. 20. november 2025"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bilde</label>
          <div
            onClick={() => document.getElementById("blog-image-upload")?.click()}
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          >
            {formData.image_url ? (
              <img src={formData.image_url || "/placeholder.svg"} alt="Preview" className="max-h-64 mx-auto rounded" />
            ) : uploading ? (
              <p>Laster opp...</p>
            ) : (
              <p className="text-muted-foreground">Klikk for å laste opp bilde</p>
            )}
          </div>
          <input id="blog-image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Fremhevet innlegg
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
            Lagre endringer
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-3 border rounded-lg hover:bg-muted">
            Avbryt
          </button>
        </div>
      </form>
    </div>
  )
}
