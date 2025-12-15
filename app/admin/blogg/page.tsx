"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function AdminBloggPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Feil ved lasting av blogginnlegg:", error)
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }

  async function deletePost(id: string) {
    if (!confirm("Er du sikker på at du vil slette dette blogginnlegget?")) return

    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) {
      alert("Feil ved sletting: " + error.message)
    } else {
      loadPosts()
    }
  }

  if (loading) {
    return <div className="p-8">Laster...</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">Blogginnlegg</h1>
        <Link
          href="/admin/blogg/ny"
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
        >
          Nytt innlegg
        </Link>
      </div>

      <div className="bg-card rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4">Tittel</th>
              <th className="text-left p-4">Kategori</th>
              <th className="text-left p-4">Forfatter</th>
              <th className="text-left p-4">Dato</th>
              <th className="text-left p-4">Fremhevet</th>
              <th className="text-right p-4">Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-8 text-muted-foreground">
                  Ingen blogginnlegg ennå
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-t">
                  <td className="p-4">{post.title}</td>
                  <td className="p-4">{post.category}</td>
                  <td className="p-4">{post.author}</td>
                  <td className="p-4">{post.date}</td>
                  <td className="p-4">{post.featured ? "Ja" : "Nei"}</td>
                  <td className="p-4 text-right space-x-2">
                    <Link href={`/admin/blogg/${post.id}`} className="text-primary hover:underline">
                      Rediger
                    </Link>
                    <button onClick={() => deletePost(post.id)} className="text-red-600 hover:underline">
                      Slett
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
