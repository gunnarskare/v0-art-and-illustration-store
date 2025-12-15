import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export const metadata = {
  title: "Blogg | Fra Skare",
  description: "Les om kreative prosesser, nye kolleksjoner og tips fra kunstnerne bak Fra Skare.",
}

export default async function BloggPage() {
  const supabase = createClient()

  const { data: blogPosts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  const posts = blogPosts || []

  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light mb-4">Blogg</h1>
            <p className="text-muted-foreground leading-relaxed">
              Følg med på vår kreative reise. Her deler vi prosesser, nye kolleksjoner og tanker om kunst og liv.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <Link href={`/blogg/${featuredPost.id}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 items-center bg-card rounded-lg overflow-hidden">
                <div className="aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
                  <img
                    src={featuredPost.image_url || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 lg:p-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs uppercase tracking-widest text-primary">{featuredPost.category}</span>
                    <span className="text-sm text-muted-foreground">{featuredPost.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{featuredPost.excerpt}</p>
                  <p className="text-sm text-muted-foreground">Av {featuredPost.author}</p>
                </div>
              </div>
            </Link>
          </section>
        )}

        {posts.length === 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
            <p className="text-muted-foreground">Ingen blogginnlegg ennå. Kom tilbake snart!</p>
          </section>
        )}

        {/* Category Filter - Only show if there are posts */}
        {posts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full">Alle</button>
              <button className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                Kolleksjoner
              </button>
              <button className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                Prosess
              </button>
              <button className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                Tips
              </button>
              <button className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                Inspirasjon
              </button>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        {regularPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link key={post.id} href={`/blogg/${post.id}`} className="group">
                  <div className="aspect-[3/2] rounded-lg overflow-hidden bg-muted mb-4">
                    <img
                      src={post.image_url || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs uppercase tracking-widest text-primary">{post.category}</span>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-2 mb-2">{post.excerpt}</p>
                  <p className="text-sm text-muted-foreground">Av {post.author}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
