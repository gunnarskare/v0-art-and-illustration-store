import { createClient } from "@/lib/supabase/client"

export interface ProductSize {
  id: string
  size: string
  label: string
  price_in_ore: number
}

export interface Product {
  id: string
  name: string
  description: string
  artist: string
  category: string
  image_url: string
  created_at: string
  updated_at: string
  product_sizes: ProductSize[]
}

// Fetch all products from database
export async function getProducts(): Promise<Product[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_sizes (*)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

// Fetch single product by ID
export async function getProduct(id: string): Promise<Product | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_sizes (*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

// Hjelpefunksjon for å konvertere øre til kroner
export function oreToKroner(ore: number) {
  return ore / 100
}

// Format price in NOK
export function formatPrice(ore: number) {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: 0,
  }).format(ore / 100)
}
