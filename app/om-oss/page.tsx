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
                src="/images/img-2207.jpeg"
                alt="Gunnar og Elisabeth Skare med en av illustrasjonene sine"
                className="w-full object-cover h-[140%]"
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
                  landskap, blomster og dyr han så rundt seg. Blyanten ble hans måte å forstå verden på, og kunsten
                  fulgte ham gjennom ungdomstid og voksenliv.
                </p>

                <p>
                  Elisabeth derimot hadde knapt holdt en pensel før de møttes. Men da Gunnar en kveld satt og tegnet ved
                  kjøkkenbordet, ble hun nysgjerrig. «Kan jeg prøve?» spurte hun forsiktig. Den kvelden ble starten på
                  en kreativ reise sammen med Gunnar. Høsten 2020, bestemte hun seg for å prøve akvarell maling, og kom
                  på ideen om å lage julekort til familie og venner. Dette ble Gunnar så klart med på. Det ble fort en
                  større prosess da folk vi viste det til ønsket å kjøpe kort av oss. Plutselig ble det mange kvelder
                  med kakao, tente lys, og flere timer med tegning og maling på de begge, mens Gunnar fant ny
                  inspirasjon i å se kunsten gjennom hennes øyne.
                </p>

                <p>
                  I dag er Fra Skare et prosjekt drevet av lidenskap – både til hverandre og til kunsten vi skaper
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
                <img src="/images/191530.jpeg" alt="Gunnar Skare" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-medium mb-4">Gunnar Skare</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Gunnar er oppvokst i Hedmark, og har tegnet siden han var liten gutt. I oppveksten var han omgitt av
                  norsk natur som har preget stilen hans – rolige landskap, eldre bygninger og opplevelser med venner og
                  familie.
                </p>
                <p>
                  Han jobber hovedsakelig med pen og blyant, og henter inspirasjon fra relasjoner og omgivelsene rundt
                  seg. Hver tegning starter som en skisse i en av hans velbrukte notatblokker. Deretter går han over med
                  pennen før han gir den videre til Elisabeth som bringer farger til motivet.
                </p>
              </div>
              <p className="mt-4 text-sm text-primary italic"></p>
            </div>

            {/* Elisabeth */}
            <div>
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-6">
                <img src="/images/img-5261.jpg" alt="Elisabeth Skare" className="w-full h-full object-cover" />
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
              <p className="mt-4 text-sm text-primary italic"></p>
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
                  Laget med lidenskap – det eneste motivet er laget for hånd, med tid og omtanke. Vi jager ikke trender
                  – vi skaper motiver som vi selv finner glede i.
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
                href="mailto:skare@paralabs.no"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-secondary transition-colors"
              >
                <Mail className="h-4 w-4" />
                skare@paralabs.no
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
