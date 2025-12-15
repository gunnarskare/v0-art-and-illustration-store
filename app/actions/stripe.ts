"use server"

import { stripe } from "@/lib/stripe"
import { getProduct, oreToKroner } from "@/lib/products"
import { createClient } from "@/lib/supabase/client"

interface CartItemForCheckout {
  productId: string
  size: string
  quantity: number
}

export async function createCheckoutSession(items: CartItemForCheckout[]) {
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
            images: product.image_url ? [product.image_url] : [],
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

  let shippingCost = 0
  if (subtotalKroner < 1000) {
    shippingCost = 7900 // 79 kr
    lineItems.push({
      price_data: {
        currency: "nok",
        product_data: {
          name: "Standard frakt",
          description: "3-5 virkedager",
        },
        unit_amount: shippingCost,
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
    metadata: {
      subtotal: subtotal.toString(),
      shipping_cost: shippingCost.toString(),
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

export async function saveOrder(sessionId: string) {
  try {
    // Hent full session med shipping og line items
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    })

    if (session.payment_status !== "paid") {
      throw new Error("Betalingen er ikke fullført")
    }

    const supabase = createClient()

    // Sjekk om ordre allerede er lagret
    const { data: existing } = await supabase.from("orders").select("id").eq("stripe_session_id", sessionId).single()

    if (existing) {
      console.log("Ordre allerede lagret:", sessionId)
      return { success: true, orderId: existing.id }
    }

    // Bygg items array fra line items
    const items = session.line_items?.data
      .filter((item) => !item.description?.includes("frakt")) // Fjern frakt-linjen
      .map((item) => ({
        name: item.description || "Ukjent produkt",
        quantity: item.quantity,
        price: item.amount_total,
      }))

    // Lagre ordre i database
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        stripe_session_id: sessionId,
        stripe_payment_intent_id: session.payment_intent as string,
        customer_email: session.customer_details?.email || "",
        customer_name: session.customer_details?.name || "",
        shipping_name: session.shipping_details?.name || "",
        shipping_address_line1: session.shipping_details?.address?.line1 || "",
        shipping_address_line2: session.shipping_details?.address?.line2 || "",
        shipping_postal_code: session.shipping_details?.address?.postal_code || "",
        shipping_city: session.shipping_details?.address?.city || "",
        shipping_country: session.shipping_details?.address?.country || "NO",
        total_amount: session.amount_total || 0,
        shipping_cost: Number.parseInt(session.metadata?.shipping_cost || "0"),
        items: items,
        status: "paid",
      })
      .select()
      .single()

    if (error) {
      console.error("Feil ved lagring av ordre:", error)
      throw error
    }

    console.log("Ordre lagret:", order.id)
    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Feil i saveOrder:", error)
    throw error
  }
}
