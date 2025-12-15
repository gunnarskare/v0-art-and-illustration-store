import Link from "next/link"

export default function VilkarPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-serif mb-8">Vilkår og betingelser</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-muted-foreground">Sist oppdatert: {new Date().toLocaleDateString("nb-NO")}</p>

          <section>
            <h2 className="text-2xl font-serif mb-4">1. Generelt</h2>
            <p>
              Disse vilkårene gjelder for kjøp av varer fra nettbutikken Fra Skare. Ved å handle hos oss godtar du disse
              vilkårene.
            </p>
            <p>
              <strong>Selger:</strong> Fra Skare
              <br />
              <strong>E-post:</strong> gunkaa@live.no
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">2. Produkter og priser</h2>
            <p>
              Alle kunstverker og illustrasjoner som selges er originale verk eller kvalitetstrykk laget av kunstnerne
              Gunnar Skare og Elisabeth Skare.
            </p>
            <p>
              Priser er oppgitt i norske kroner (NOK) inkludert merverdiavgift (MVA). Vi forbeholder oss retten til å
              endre priser uten forvarsel, men endringer vil ikke påvirke allerede inngåtte avtaler.
            </p>
            <p>
              Vi streber etter å vise produktene så nøyaktig som mulig, men farger og detaljer kan variere noe fra
              bilder på grunn av skjerminnstillinger.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">3. Bestilling og betalingsbetingelser</h2>
            <p>
              Når du handler hos oss, mottar du en ordrebekreftelse på e-post. Dette er en bekreftelse på at vi har
              mottatt din bestilling. Kjøpsavtalen er bindende når betalingen er gjennomført.
            </p>
            <p>
              Vi aksepterer betaling med Visa, Mastercard og andre betalingskort via Stripe. Betalingsinformasjon
              behandles trygt og sikkert gjennom vår betalingsleverandør.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">4. Levering</h2>
            <p>
              Vi leverer til adresser i Norge og utvalgte internasjonale destinasjoner. Leveringstid er normalt 3-7
              virkedager etter at bestillingen er bekreftet.
            </p>
            <p>Fraktkostnad beregnes ved utsjekking basert på leveringsadresse og størrelse på forsendelsen.</p>
            <p>
              Når varen er sendt, vil du motta en e-post med sporingsinformasjon (hvis tilgjengelig). Risikoen for varen
              går over til kjøper når varen er levert til oppgitt leveringsadresse.
            </p>
            <p>Ved forsinket levering, kontakt oss på gunkaa@live.no for oppfølging.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">5. Angrerett</h2>
            <p>
              I henhold til angrerettloven har du som forbruker 14 dagers angrerett fra du mottar varen. Angrefristen
              utløper 14 dager etter den dagen du, eller en tredjeperson som ikke er transportøren og som er utpekt av
              deg, fysisk mottar varen.
            </p>
            <p>
              For å utøve angreretten må du informere oss om din beslutning om å angre kjøpet ved en utvetydig erklæring
              (for eksempel e-post til gunkaa@live.no).
            </p>
            <p>
              Ved bruk av angreretten må varen returneres uten unødig opphold og senest 14 dager etter at du har
              informert oss om angringen. Varen må returneres i samme stand og mengde som da den ble mottatt. Du dekker
              kostnadene ved retur.
            </p>
            <p>
              Dersom du har mottatt varen og angreretten utøves, får du tilbakebetalt kjøpesummen. Vi foretar
              tilbakebetalingen uten unødig opphold, og senest 14 dager fra vi mottok melding om din beslutning om å
              utøve angreretten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">6. Reklamasjonsrett</h2>
            <p>
              Du har reklamasjonsrett i henhold til forbrukerkjøpsloven dersom det foreligger en mangel ved varen.
              Reklamasjonsfristen er 2 år fra du mottok varen.
            </p>
            <p>
              Ved reklamasjon, kontakt oss på gunkaa@live.no med beskrivelse av mangelen og bilder hvis mulig. Ved
              berettiget reklamasjon kan du kreve reparasjon, omlevering, prisavslag eller heving av kjøpet.
            </p>
            <p>Mindre fargeavvik mellom produktbilder og faktisk produkt regnes ikke som mangel.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">7. Personvern</h2>
            <p>
              Vi behandler dine personopplysninger i samsvar med personopplysningsloven. Les vår{" "}
              <Link href="/personvern" className="text-primary hover:underline">
                personvernerklæring
              </Link>{" "}
              for mer informasjon om hvordan vi behandler dine personopplysninger.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">8. Opphavsrett</h2>
            <p>
              Alle kunstverker, bilder, tekster og annet innhold på nettstedet er beskyttet av opphavsretten. Du får
              ikke rett til å reprodusere, distribuere eller offentliggjøre innholdet uten skriftlig tillatelse fra Fra
              Skare.
            </p>
            <p>
              Ved kjøp av fysiske kunstverker eller trykk får du eiendomsrett til det fysiske objektet, men ikke
              opphavsretten til verket.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">9. Ansvarsbegrensning</h2>
            <p>
              Vi er ikke ansvarlige for forsinkelser eller manglende levering som skyldes forhold utenfor vår kontroll,
              slik som naturkatastrofer, krig, streik eller lignende.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">10. Tvisteløsning</h2>
            <p>Dersom du har en klage, ber vi deg kontakte oss først på gunkaa@live.no for å finne en løsning.</p>
            <p>
              Dersom vi ikke kommer til enighet, kan du bringe klagen inn for Forbrukerrådet. Mer informasjon finnes på{" "}
              <a
                href="https://www.forbrukerradet.no"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                forbrukerradet.no
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">11. Endringer i vilkårene</h2>
            <p>
              Vi forbeholder oss retten til å endre disse vilkårene. Eventuelle endringer vil bli publisert på denne
              siden med oppdatert dato. Endringene gjelder ikke for allerede inngåtte avtaler.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t">
            <Link href="/" className="text-primary hover:underline">
              ← Tilbake til forsiden
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
