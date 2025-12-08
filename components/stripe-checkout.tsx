"use client"

import { useCallback } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { createCheckoutSession } from "@/app/actions/stripe"
import { useCart } from "@/lib/cart-context"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function StripeCheckout() {
  const { items } = useCart()

  const fetchClientSecret = useCallback(() => {
    const cartItems = items.map((item) => ({
      productId: item.productId,
      size: item.size,
      quantity: item.quantity,
    }))
    return createCheckoutSession(cartItems)
  }, [items])

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
