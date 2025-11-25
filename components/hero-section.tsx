import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm uppercase tracking-widest text-primary mb-4">Kunst & Illustrasjoner</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 text-balance">
              Håndlagde motiver med <span className="font-semibold italic">kjærlighet</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Fra Skare er et kreativt samarbeid mellom Gunnar og Elisabeth Skare. Vi lager unike illustrasjoner som
              bringer varme og karakter til hjemmet ditt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/butikk">
                  Se kolleksjonen
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/om-oss">Vår historie</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
                <img
                  src="/artistic-watercolor-illustration-of-cozy-scandinav.jpg"
                  alt="Kunstillustrasjon fra Fra Skare"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-lg overflow-hidden border-4 border-background shadow-lg hidden md:block">
                <img
                  src="/small-botanical-line-drawing-illustration.jpg"
                  alt="Botanisk illustrasjon"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
