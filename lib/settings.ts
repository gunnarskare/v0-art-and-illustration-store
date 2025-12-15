import { createClient } from "@/lib/supabase/client"

interface ShippingSettings {
  cost: number
  free_shipping_threshold: number
  delivery_time: string
}

export async function getShippingSettings(): Promise<ShippingSettings> {
  const supabase = createClient()
  const { data, error } = await supabase.from("settings").select("value").eq("key", "shipping").single()

  if (error || !data) {
    console.error("Feil ved henting av fraktinnstillinger:", error)
    // Returner default verdier
    return {
      cost: 79,
      free_shipping_threshold: 1000,
      delivery_time: "3-5 virkedager",
    }
  }

  return data.value as ShippingSettings
}
