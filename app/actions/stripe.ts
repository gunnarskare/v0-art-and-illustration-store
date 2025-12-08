"use server"

import { stripe } from "@/lib/stripe"
import { getProduct, oreToKroner } from "@/lib/products"

interface CartItemForCheckout {
  productId: string
  size: string
  quantity: number
}

export async function createCheckoutSession(items: CartItemForCheckout[]) {
  // Valider og bygg line_items på serveren med database-oppslag
  const lineItems = await Promise.all(
    items.map(async (item) => {
      const product = await getProduct(item.productId)
      if (!product) {
        throw new Error(`Produkt med id "${item.productId}" ble ikke funnet`)
      }

      const sizeData = product.product_sizes.find((s) => s.size === item.size)
      if (!sizeData) {
        throw new Error(`Størrelse "${item.size}" finnes ikke for produkt "${product.name}"`)
      }

      return {
        price_data: {
          currency: "nok",
          product_data: {
            name: product.name,
            description: `${sizeData.label} - ${product.artist}`,
          },
          unit_amount: sizeData.price_in_ore,
        },
        quantity: item.quantity,
      }
    }),
  )

  // Beregn total for fraktlogikk
  const subtotal = lineItems.reduce((sum, item) => sum + item.price_data.unit_amount * item.quantity, 0)
  const subtotalKroner = oreToKroner(subtotal)

  // Legg til frakt hvis under 1000 kr
  if (subtotalKroner < 1000) {
    lineItems.push({
      price_data: {
        currency: "nok",
        product_data: {
          name: "Standard frakt",
          description: "3-5 virkedager",
        },
        unit_amount: 7900, // 79 kr
      },
      quantity: 1,
    })
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: lineItems,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["NO"],
    },
  })

  return session.client_secret
}

export async function getSessionStatus(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return {
    status: session.status,
    customerEmail: session.customer_details?.email,
  }
}
