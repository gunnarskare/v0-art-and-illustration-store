"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  published_at: string
  image_url: string | null
  slug: string
}

export function BlogPreview() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchBlogPosts() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, excerpt, published_at, image_url, slug")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(3)

      if (!error && data) {
        setBlogPosts(data)
      }
      setLoading(false)
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-primary mb-2">Fra bloggen</p>
              <h2 className="text-3xl md:text-4xl font-light">Kreative tanker</h2>
            </div>
          </div>
          <div className="text-center text-muted-foreground">Laster blogginnlegg...</div>
        </div>
      </section>
    )
  }

  if (blogPosts.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary mb-2">Fra bloggen</p>
            <h2 className="text-3xl md:text-4xl font-light">Kreative tanker</h2>
          </div>
          <Button asChild variant="ghost" className="group self-start md:self-auto">
            <Link href="/blogg">
              Alle innlegg
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blogg/${post.slug}`} className="group">
              <div className="aspect-[3/2] rounded-lg overflow-hidden bg-muted mb-4">
                <img
                  src={post.image_url || "/placeholder.svg?height=400&width=600&query=blog post illustration"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {new Date(post.published_at).toLocaleDateString("nb-NO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
