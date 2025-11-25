import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Instagram, Mail } from "lucide-react"

export const metadata = {
  title: "Om Oss | Fra Skare",
  description:
    "Møt Gunnar og Elisabeth Skare - kunstnerne bak Fra Skare. Les historien om hvordan kjærlighet og kunst ble til et felles prosjekt.",
}

export default function OmOssPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-primary mb-4">Vår historie</p>
              <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                To hjerter, én <span className="font-semibold italic">kreativ reise</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fra Skare startet som en koselig aktivitet rundt kjøkkenbordet og har vokst til et kreativt eventyr vi
                deler med verden.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src="/placeholder.svg?key=0yh0m"
                alt="Gunnar og Elisabeth Skare i atelieret"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-secondary py-24 mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-light mb-8 text-center">Hvordan det hele startet</h2>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Gunnar har tegnet så lenge han kan huske. Som liten gutt fylte han skisseblokk etter skisseblokk med
                  landskap, trær og dyr han så rundt seg. Blyanten ble hans måte å forstå verden på, og kunsten fulgte
                  ham gjennom ungdomstid og voksenliv.
                </p>

                <p>
                  Elisabeth derimot hadde knapt holdt en pensel før de møttes. Men da Gunnar en kveld satt og tegnet ved
                  kjøkkenbordet, ble hun nysgjerrig. «Kan jeg prøve?» spurte hun forsiktig. Den kvelden ble starten på
                  noe nytt.
                </p>

                <p>
                  Det som begynte som en avslappende aktivitet sammen, utviklet seg raskt til en felles lidenskap.
                  Elisabeth oppdaget en naturlig sans for farger og blomstermotiver, mens Gunnar fant ny inspirasjon i å
                  se kunsten gjennom hennes øyne.
                </p>

                <p>
                  Venner og familie la merke til bildene som begynte å pryde veggene hjemme. «Kan vi ikke kjøpe den?»
                  ble et stadig vanligere spørsmål. Etter mye overtalelse bestemte de seg for å dele kunsten sin med
                  flere.
                </p>

                <p className="text-foreground font-medium">
                  I dag er Fra Skare et prosjekt drevet av kjærlighet – både til hverandre og til kunsten vi skaper
                  sammen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Artists Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <h2 className="text-3xl font-light mb-12 text-center">Kunstnerne</h2>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Gunnar */}
            <div>
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-6">
                <img
                  src="/male-artist-drawing-at-desk-nordic-style-warm-ligh.jpg"
                  alt="Gunnar Skare"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium mb-4">Gunnar Skare</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Gunnar har tegnet siden han var liten gutt i Telemark. Oppvekst omgitt av norsk natur har preget
                  stilen hans – rolige landskap, myke linjer og en dyp respekt for naturen rundt oss.
                </p>
                <p>
                  Han jobber hovedsakelig med tusj og blyant, og henter inspirasjon fra turer i skog og mark. Hver
                  tegning starter som en skisse i den velbrukte notatblokken han alltid har med seg.
                </p>
              </div>
              <p className="mt-4 text-sm text-primary italic">«For meg handler kunst om å fange øyeblikk av ro.»</p>
            </div>

            {/* Elisabeth */}
            <div>
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-6">
                <img
                  src="/female-artist-painting-watercolors-at-table-cozy-s.jpg"
                  alt="Elisabeth Skare"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium mb-4">Elisabeth Skare</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Elisabeth oppdaget gleden ved å male da hun møtte Gunnar. Det som startet som en aktivitet for å
                  tilbringe tid sammen, ble raskt en lidenskap som overrasket henne selv.
                </p>
                <p>
                  Hun har utviklet en særegen stil med akvarell og botaniske motiver. Blomster, planter og naturens små
                  detaljer preger arbeidene hennes – alltid med en myk og drømmende kvalitet.
                </p>
              </div>
              <p className="mt-4 text-sm text-primary italic">«Jeg fant en stemme jeg ikke visste jeg hadde.»</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-card py-24 mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-light mb-12 text-center">Det vi tror på</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">♡</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Laget med kjærlighet</h3>
                <p className="text-muted-foreground">
                  Hvert eneste motiv er laget for hånd, med tid og omtanke. Vi jager ikke trender – vi skaper det som
                  føles ekte.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✧</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Kvalitet først</h3>
                <p className="text-muted-foreground">
                  Vi bruker kun materialer av høyeste kvalitet. Kunsten du kjøper skal glede deg i mange år fremover.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❋</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Personlig kontakt</h3>
                <p className="text-muted-foreground">
                  Vi setter pris på alle som velger å ta kunsten vår inn i hjemmene sine. Spørsmål? Vi er bare en
                  melding unna.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-4">Si hei!</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Vi elsker å høre fra dere – enten det er spørsmål om kunst, bestillinger eller bare en hyggelig hilsen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="mailto:hei@fraskare.no"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-secondary transition-colors"
              >
                <Mail className="h-4 w-4" />
                hei@fraskare.no
              </a>
              <a
                href="https://instagram.com/fraskare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-secondary transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @fraskare
              </a>
            </div>

            <Button asChild size="lg" className="group">
              <Link href="/butikk">
                Se kolleksjonen
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
