import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

// Global singleton for the Supabase client
let supabaseClient: SupabaseClient | null = null

export function createClient() {
  // Return existing client if already created
  if (supabaseClient) {
    return supabaseClient
  }

  // Create new client only once
  supabaseClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return supabaseClient
}
