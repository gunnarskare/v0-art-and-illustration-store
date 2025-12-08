import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ArtistsPreview() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-2">Kunstnerne</p>
          <h2 className="text-3xl md:text-4xl font-light">Møt oss</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Gunnar - Updated image and description */}
          <div className="group">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-6">
              <img
                src="/images/191530.jpeg"
                alt="Gunnar Skare"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-medium mb-2">Gunnar Skare</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Oppvokst i Hedmark og har tegnet siden han var liten gutt. Med fokus på landskap, eldre bygninger og norsk
              natur, bringer Gunnar ro inn i hver strek med penn og blyant.
            </p>
          </div>

          {/* Elisabeth - Updated image and description */}
          <div className="group">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-6">
              <img
                src="/images/img-5261.jpg"
                alt="Elisabeth Skare"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-medium mb-2">Elisabeth Skare</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Oppdaget gleden ved å male da hun møtte Gunnar. Hennes akvareller med botaniske motiver og blomster har en
              myk, drømmende kvalitet som har blitt en favoritt blant kundene.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="group bg-transparent">
            <Link href="/om-oss">
              Les hele historien
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
