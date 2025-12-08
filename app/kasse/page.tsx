"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { StripeCheckout } from "@/components/stripe-checkout"
import { ChevronLeft, Check, ShoppingBag } from "lucide-react"

export default function KassePage() {
  const { items, totalPrice, clearCart } = useCart()
  const [isComplete, setIsComplete] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Vent på at cart er lastet fra localStorage
  useEffect(() => {
    setIsReady(true)
  }, [])

  // Lytt på Stripe checkout completion
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "checkout.session.completed") {
        setIsComplete(true)
        clearCart()
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [clearCart])

  // Vis loading mens cart lastes
  if (!isReady) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 text-center py-16">
            <div className="animate-pulse">Laster...</div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Tom handlekurv
  if (items.length === 0 && !isComplete) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-2xl mx-auto px-4 text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-light mb-4">Handlekurven er tom</h1>
            <p className="text-muted-foreground mb-8">Det ser ut som du ikke har lagt til noe i handlekurven ennå.</p>
            <Button asChild>
              <Link href="/butikk">Utforsk butikken</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Bekreftelsesside
  if (isComplete) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-2xl mx-auto px-4 text-center py-16">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-light mb-4">Takk for din bestilling!</h1>
            <p className="text-muted-foreground mb-2">
              Vi har mottatt din bestilling og sender deg en bekreftelse på e-post.
            </p>
            <p className="text-muted-foreground mb-8">
              Din kunst vil bli forsiktig pakket og sendt innen 3-5 virkedager.
            </p>
            <Button asChild>
              <Link href="/butikk">Fortsett å handle</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const shippingCost = totalPrice >= 1000 ? 0 : 79
  const finalTotal = totalPrice + shippingCost

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/butikk"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Tilbake til butikk
          </Link>

          <h1 className="text-3xl md:text-4xl font-light mb-8">Kasse</h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Stripe Checkout */}
            <div className="lg:col-span-2">
              <StripeCheckout />
            </div>

            {/* Ordresammendrag */}
            <div className="lg:col-span-1">
              <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">Din bestilling</h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-20 rounded overflow-hidden bg-muted shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.sizeLabel}</p>
                        <p className="text-sm text-muted-foreground">Antall: {item.quantity}</p>
                      </div>
                      <p className="font-medium whitespace-nowrap">{item.price * item.quantity} kr</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delsum</span>
                    <span>{totalPrice} kr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frakt</span>
                    <span>{shippingCost === 0 ? "Gratis" : `${shippingCost} kr`}</span>
                  </div>
                  {totalPrice < 1000 && (
                    <p className="text-xs text-muted-foreground">Gratis frakt ved kjøp over 1000 kr</p>
                  )}
                  <div className="flex justify-between text-lg font-medium pt-2 border-t border-border">
                    <span>Totalt</span>
                    <span>{finalTotal} kr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
