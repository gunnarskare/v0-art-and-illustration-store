import Link from "next/link"
import { Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-semibold mb-4">Fra Skare</h3>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Håndlagde illustrasjoner og kunst laget med kjærlighet av Gunnar og Elisabeth Skare. Hver tegning er en
              historie.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4 text-foreground">Utforsk</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/butikk" className="text-muted-foreground hover:text-foreground transition-colors">
                Butikk
              </Link>
              <Link href="/om-oss" className="text-muted-foreground hover:text-foreground transition-colors">
                Om Oss
              </Link>
              <Link href="/blogg" className="text-muted-foreground hover:text-foreground transition-colors">
                Blogg
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4 text-foreground">Kontakt</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:skare@paralabs.no"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                skare@paralabs.no
              </a>
              <a
                href="https://instagram.com/fraskare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Instagram className="h-4 w-4" />
                @fraskare
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fra Skare. Alle rettigheter reservert.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/personvern" className="hover:text-foreground transition-colors">
              Personvern
            </Link>
            <Link href="/vilkar" className="hover:text-foreground transition-colors">
              Vilkår
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
