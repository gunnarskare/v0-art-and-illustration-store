import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata = {
  title: "Blogg | Fra Skare",
  description: "Les om kreative prosesser, nye kolleksjoner og tips fra kunstnerne bak Fra Skare.",
}

const blogPosts = [
  {
    id: "1",
    title: "Ny høstkolleksjon er her",
    excerpt:
      "Vi er så glade for å kunne dele våre nye høstinspirerte motiver med dere. Denne sesongen har vi latt oss inspirere av de varme fargene i løvverket og den rolige stemningen som kommer når naturen gjør seg klar til vinteren.",
    date: "20. november 2025",
    author: "Elisabeth Skare",
    category: "Kolleksjoner",
    image: "/autumn-leaves-watercolor-illustration.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Bak kulissene: Fra skisse til ferdig verk",
    excerpt:
      "Mange lurer på hvordan vi jobber. I dette innlegget tar vi dere med på reisen fra den første ideen til det ferdige kunsttrykket du kan henge på veggen.",
    date: "15. november 2025",
    author: "Gunnar Skare",
    category: "Prosess",
    image: "/artist-sketchbook-with-pencil-drawings.jpg",
    featured: false,
  },
  {
    id: "3",
    title: "Tips: Slik velger du riktig ramme",
    excerpt:
      "En god ramme kan løfte kunsten din til nye høyder. Her er våre beste tips for å finne den perfekte rammen til ditt nye kunsttrykk.",
    date: "8. november 2025",
    author: "Elisabeth Skare",
    category: "Tips",
    image: "/framed-art-prints-on-wall-scandinavian-interior.jpg",
    featured: false,
  },
  {
    id: "4",
    title: "Historien bak Nordisk Skog-serien",
    excerpt:
      "Nordisk Skog har blitt en av våre mest populære serier. Her forteller Gunnar om inspirasjonen og prosessen bak disse motivene.",
    date: "1. november 2025",
    author: "Gunnar Skare",
    category: "Prosess",
    image: "/minimalist-forest-illustration-nordic-style.jpg",
    featured: false,
  },
  {
    id: "5",
    title: "Hvordan vi pakker kunsten din",
    excerpt:
      "Vi vet hvor viktig det er at kunsten kommer trygt frem. Følg med bak kulissene når vi viser hvordan vi pakker hver eneste ordre med omhu.",
    date: "25. oktober 2025",
    author: "Elisabeth Skare",
    category: "Bak kulissene",
    image: "/placeholder.svg?key=e9ty1",
    featured: false,
  },
  {
    id: "6",
    title: "Inspirasjon: Vår favorittkunst",
    excerpt:
      "Hvem inspirerer oss? Vi deler noen av kunstnerne og verkene som har formet vår egen stil og tilnærming til kunst.",
    date: "18. oktober 2025",
    author: "Gunnar Skare",
    category: "Inspirasjon",
    image: "/placeholder.svg?key=e1d0s",
    featured: false,
  },
]

export default function BloggPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

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
                    src={featuredPost.image || "/placeholder.svg"}
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

        {/* Category Filter */}
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

        {/* Blog Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blogg/${post.id}`} className="group">
                <div className="aspect-[3/2] rounded-lg overflow-hidden bg-muted mb-4">
                  <img
                    src={post.image || "/placeholder.svg"}
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
      </main>
      <Footer />
    </>
  )
}
