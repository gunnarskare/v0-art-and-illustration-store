import Link from "next/link"

export default function PersonvernPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-serif mb-8">Personvernerklæring</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-muted-foreground">Sist oppdatert: {new Date().toLocaleDateString("nb-NO")}</p>

          <section>
            <h2 className="text-2xl font-serif mb-4">1. Behandlingsansvarlig</h2>
            <p>
              Fra Skare er behandlingsansvarlig for behandling av personopplysninger som beskrevet i denne
              personvernerklæringen.
            </p>
            <p>
              <strong>Kontaktinformasjon:</strong>
              <br />
              E-post: gunkaa@live.no
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">2. Hvilke personopplysninger samler vi inn?</h2>
            <p>Vi samler inn følgende typer personopplysninger når du handler hos oss:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Kontaktinformasjon:</strong> Navn, e-postadresse, telefonnummer
              </li>
              <li>
                <strong>Leveringsinformasjon:</strong> Leveringsadresse (adresse, postnummer, poststed, land)
              </li>
              <li>
                <strong>Betalingsinformasjon:</strong> Behandles av Stripe (vi lagrer ikke kortinformasjon)
              </li>
              <li>
                <strong>Ordrehistorikk:</strong> Informasjon om dine kjøp og bestillinger
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">3. Formål med behandlingen</h2>
            <p>Vi behandler personopplysninger for følgende formål:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Behandle og levere din bestilling</li>
              <li>Kommunisere med deg om din bestilling</li>
              <li>Oppfylle våre juridiske forpliktelser (regnskapslovgivning)</li>
              <li>Forbedre våre tjenester og kundeopplevelse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">4. Rettslig grunnlag</h2>
            <p>Vi behandler personopplysninger basert på følgende rettslige grunnlag:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Avtale:</strong> For å oppfylle våre forpliktelser overfor deg som kunde
              </li>
              <li>
                <strong>Rettslig forpliktelse:</strong> For å oppfylle krav i regnskapslovgivningen
              </li>
              <li>
                <strong>Samtykke:</strong> For nyhetsbrev og markedsføring (kun hvis du har gitt samtykke)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">5. Deling av personopplysninger</h2>
            <p>Vi deler personopplysninger med følgende tredjeparter:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Stripe:</strong> Betalingsbehandling
              </li>
              <li>
                <strong>Supabase:</strong> Database og datalagring
              </li>
              <li>
                <strong>Fraktleverandør:</strong> For levering av produkter
              </li>
            </ul>
            <p>Vi selger aldri personopplysningene dine til tredjeparter.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">6. Lagring av personopplysninger</h2>
            <p>
              Vi lagrer personopplysningene dine så lenge det er nødvendig for å oppfylle formålene beskrevet i denne
              erklæringen, eller så lenge lovgivningen krever det. Ordredata lagres i minimum 5 år i henhold til
              bokføringsloven.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">7. Dine rettigheter</h2>
            <p>Du har følgende rettigheter i henhold til personvernlovgivningen:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Innsyn:</strong> Du har rett til å få innsyn i hvilke personopplysninger vi har om deg
              </li>
              <li>
                <strong>Retting:</strong> Du kan be om å få rettet uriktige opplysninger
              </li>
              <li>
                <strong>Sletting:</strong> Du kan be om å få slettet dine personopplysninger
              </li>
              <li>
                <strong>Begrensning:</strong> Du kan be om begrenset behandling av dine opplysninger
              </li>
              <li>
                <strong>Dataportabilitet:</strong> Du kan be om å få dine data i et strukturert format
              </li>
              <li>
                <strong>Protestere:</strong> Du kan protestere mot behandling av dine personopplysninger
              </li>
            </ul>
            <p>For å utøve dine rettigheter, kontakt oss på: gunkaa@live.no</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">8. Informasjonskapsler (cookies)</h2>
            <p>
              Vi bruker nødvendige cookies for å få nettstedet til å fungere, inkludert handlekurv-funksjonalitet. Vi
              bruker ikke tredjepartscookies for sporing eller annonsering.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">9. Sikkerhet</h2>
            <p>
              Vi tar sikkerhet på alvor og bruker passende tekniske og organisatoriske tiltak for å beskytte dine
              personopplysninger mot uautorisert tilgang, endring, avsløring eller ødeleggelse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">10. Klagerett</h2>
            <p>
              Hvis du mener at behandlingen av dine personopplysninger ikke er i samsvar med personvernlovgivningen, har
              du rett til å klage til Datatilsynet.
            </p>
            <p>
              <strong>Datatilsynet:</strong>
              <br />
              Postboks 458 Sentrum
              <br />
              0105 Oslo
              <br />
              Tlf: 22 39 69 00
              <br />
              E-post: postkasse@datatilsynet.no
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">11. Endringer i personvernerklæringen</h2>
            <p>
              Vi forbeholder oss retten til å endre denne personvernerklæringen. Eventuelle endringer vil bli publisert
              på denne siden med oppdatert dato.
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
