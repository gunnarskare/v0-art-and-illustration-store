"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ShippingSettings {
  cost: number
  free_shipping_threshold: number
  delivery_time: string
}

export default function InnstillingerPage() {
  const [settings, setSettings] = useState<ShippingSettings>({
    cost: 79,
    free_shipping_threshold: 1000,
    delivery_time: "3-5 virkedager",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    const supabase = createClient()
    const { data, error } = await supabase.from("settings").select("value").eq("key", "shipping").single()

    if (error) {
      console.error("Feil ved lasting av innstillinger:", error)
    } else if (data) {
      setSettings(data.value as ShippingSettings)
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    const supabase = createClient()
    const { error } = await supabase
      .from("settings")
      .update({
        value: settings,
        updated_at: new Date().toISOString(),
      })
      .eq("key", "shipping")

    if (error) {
      console.error("Feil ved lagring:", error)
      setMessage("Kunne ikke lagre innstillinger")
    } else {
      setMessage("Innstillinger lagret!")
      setTimeout(() => setMessage(""), 3000)
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="p-8">
        <p>Laster innstillinger...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <Link href="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Tilbake til dashboard
      </Link>

      <h1 className="text-3xl font-light mb-8">Butikkinnstillinger</h1>

      <div className="max-w-2xl bg-card rounded-lg border p-6">
        <h2 className="text-xl font-medium mb-6">Fraktinnstillinger</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cost">Fraktkostnad (kr)</Label>
            <Input
              id="cost"
              type="number"
              value={settings.cost}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  cost: Number.parseInt(e.target.value) || 0,
                })
              }
              required
            />
            <p className="text-sm text-muted-foreground">Kostnaden for standard frakt i norske kroner</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="threshold">Gratis frakt over (kr)</Label>
            <Input
              id="threshold"
              type="number"
              value={settings.free_shipping_threshold}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  free_shipping_threshold: Number.parseInt(e.target.value) || 0,
                })
              }
              required
            />
            <p className="text-sm text-muted-foreground">Handlekurver over dette beløpet får gratis frakt</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery">Leveringstid</Label>
            <Input
              id="delivery"
              type="text"
              value={settings.delivery_time}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  delivery_time: e.target.value,
                })
              }
              placeholder="3-5 virkedager"
              required
            />
            <p className="text-sm text-muted-foreground">Forventet leveringstid som vises til kunder</p>
          </div>

          {message && (
            <div
              className={`p-3 rounded ${message.includes("Kunne") ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}
            >
              {message}
            </div>
          )}

          <Button type="submit" disabled={saving}>
            {saving ? "Lagrer..." : "Lagre innstillinger"}
          </Button>
        </form>
      </div>
    </div>
  )
}
