import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata = {
  title: "Blogginnlegg | Fra Skare",
  description: "Les mer om kunst og kreativitet fra Fra Skare.",
}

const blogPosts: Record<
  string,
  {
    id: string
    title: string
    content: string[]
    date: string
    author: string
    category: string
    image: string
  }
> = {
  "1": {
    id: "1",
    title: "Ny høstkolleksjon er her",
    content: [
      "Vi er så glade for å kunne dele våre nye høstinspirerte motiver med dere. Denne sesongen har vi latt oss inspirere av de varme fargene i løvverket og den rolige stemningen som kommer når naturen gjør seg klar til vinteren.",
      "Kolleksjonen består av seks nye motiver – tre av Gunnar og tre av Elisabeth. Gunnars bidrag fokuserer på skogslandskap i høstdrakt, mens Elisabeth har fordypet seg i nærstudier av høstløv og bær.",
      "Det har vært en fantastisk prosess å jobbe med denne kolleksjonen. Vi har tilbragt mange timer ute i naturen, samlet blader og tatt bilder som referanse. Det er noe magisk med høsten – fargepaletten er så rik og variert.",
      "Alle motivene i kolleksjonen er tilgjengelige i tre størrelser, og som vanlig er de trykket på vårt 300g kvalitetspapir. Vi har også valgt en litt varmere fargeprofil denne gangen, som vi tror passer perfekt til de koselige høstmånedene.",
      "Vi håper dere blir like glade i disse motivene som vi er. Takk for at dere støtter kunsten vår!",
    ],
    date: "20. november 2025",
    author: "Elisabeth Skare",
    category: "Kolleksjoner",
    image: "/autumn-leaves-watercolor-illustration.jpg",
  },
  "2": {
    id: "2",
    title: "Bak kulissene: Fra skisse til ferdig verk",
    content: [
      "Mange lurer på hvordan vi jobber. I dette innlegget tar jeg dere med på reisen fra den første ideen til det ferdige kunsttrykket du kan henge på veggen.",
      "Alt starter med en skisse. Jeg har alltid med meg en liten notatblokk, og når jeg ser noe som inspirerer meg, tegner jeg det raskt ned. Det kan være formen på et tre, lyset gjennom tåken, eller en spesiell steinformasjon ved kysten.",
      "Hjemme i atelieret jobber jeg videre med skissen. Jeg eksperimenterer med komposisjon og prøver ulike vinkler. Noen ganger ender jeg opp et helt annet sted enn der jeg startet – og det er ofte de beste verkene.",
      "Når jeg er fornøyd med skissen, begynner det virkelige arbeidet. Avhengig av motivet velger jeg teknikk – det kan være tusj, blyant eller en kombinasjon. Hvert medium har sine egne kvaliteter som passer til ulike stemninger.",
      "Til slutt digitaliserer vi verket og forbereder det for trykk. Her er Elisabeth uvurderlig – hun har et fantastisk øye for farger og sørger for at trykket matcher originalen så godt som mulig.",
      "Hele prosessen kan ta alt fra noen timer til flere uker, avhengig av kompleksiteten i motivet. Men uansett hvor lang tid det tar, er det den samme gleden hver gang et nytt verk er ferdig.",
    ],
    date: "15. november 2025",
    author: "Gunnar Skare",
    category: "Prosess",
    image: "/artist-sketchbook-with-pencil-drawings.jpg",
  },
  "3": {
    id: "3",
    title: "Tips: Slik velger du riktig ramme",
    content: [
      "En god ramme kan løfte kunsten din til nye høyder. Her er våre beste tips for å finne den perfekte rammen til ditt nye kunsttrykk.",
      "Først og fremst: La kunsten være hovedpersonen. Rammen skal støtte verket, ikke konkurrere med det. For våre illustrasjoner anbefaler vi ofte enkle, rene rammer i naturlige materialer.",
      "Tenk på rommet der bildet skal henge. En mørk treramme kan være vakker i et lyst, minimalistisk rom, mens en hvit eller naturfarget ramme passer bedre i mer fargerike omgivelser.",
      "Passepartout – den hvite kanten mellom bilde og ramme – gir verket pusterom og løfter det frem. Vi anbefaler en passepartout på minst 3-5 cm for våre mindre format, og 5-8 cm for større verk.",
      "Når det gjelder material, er ekte tre alltid et trygt valg. Det har en varme og kvalitet som passer godt til håndlaget kunst. Aluminium eller stål kan fungere fint for mer moderne uttrykk.",
      "Til slutt: Ikke vær redd for å eksperimentere! Det finnes ingen fasit. Noen ganger er den mest uventede kombinasjonen den som fungerer best.",
    ],
    date: "8. november 2025",
    author: "Elisabeth Skare",
    category: "Tips",
    image: "/framed-art-prints-on-wall-scandinavian-interior.jpg",
  },
}

const defaultPost = {
  id: "0",
  title: "Blogginnlegg",
  content: [
    "Dette er et blogginnlegg fra Fra Skare. Her deler vi tanker om kunst, kreativitet og hverdagen som kunstnere.",
    "Følg med for mer innhold om prosesser, nye kolleksjoner og tips!",
  ],
  date: "November 2025",
  author: "Fra Skare",
  category: "Blogg",
  image: "/artistic-watercolor-illustration-of-cozy-scandinav.jpg",
}

export async function generateStaticParams() {
  // Generate static pages for all blog posts
  return Object.keys(blogPosts).map((id) => ({
    id,
  }))
}

export default async function BloggInnleggPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = blogPosts[id] || defaultPost

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/blogg"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Tilbake til bloggen
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs uppercase tracking-widest text-primary">{post.category}</span>
              <span className="text-sm text-muted-foreground">{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-light mb-4">{post.title}</h1>
            <p className="text-muted-foreground">Av {post.author}</p>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-12">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share & Tags */}
          <footer className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Del:</span>
                <button className="text-muted-foreground hover:text-foreground transition-colors">Facebook</button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">Twitter</button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">Pinterest</button>
              </div>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  )
}
