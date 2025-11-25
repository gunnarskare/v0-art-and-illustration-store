import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Ny høstkolleksjon er her",
    excerpt: "Vi er så glade for å kunne dele våre nye høstinspirerte motiver med dere...",
    date: "20. november 2025",
    image: "/autumn-leaves-watercolor-illustration.jpg",
  },
  {
    id: 2,
    title: "Bak kulissene: Fra skisse til ferdig verk",
    excerpt: "Mange lurer på hvordan vi jobber. I dette innlegget tar vi dere med på reisen...",
    date: "15. november 2025",
    image: "/artist-sketchbook-with-pencil-drawings.jpg",
  },
  {
    id: 3,
    title: "Tips: Slik velger du riktig ramme",
    excerpt: "En god ramme kan løfte kunsten din til nye høyder. Her er våre beste tips...",
    date: "8. november 2025",
    image: "/framed-art-prints-on-wall-scandinavian-interior.jpg",
  },
]

export function BlogPreview() {
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
            <Link key={post.id} href={`/blogg/${post.id}`} className="group">
              <div className="aspect-[3/2] rounded-lg overflow-hidden bg-muted mb-4">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
              <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
