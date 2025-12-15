"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Package, Truck, CheckCircle, Mail, MapPin } from "lucide-react"

interface Order {
  id: string
  created_at: string
  customer_email: string
  customer_name: string
  shipping_name: string
  shipping_address_line1: string
  shipping_address_line2: string
  shipping_postal_code: string
  shipping_city: string
  shipping_country: string
  total_amount: number
  shipping_cost: number
  status: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  notes: string | null
  tracking_number: string | null
  shipped_at: string | null
}

export default function OrdrerPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    const supabase = createClient()
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Feil ved lasting av ordrer:", error)
    } else {
      setOrders(data || [])
    }
    setLoading(false)
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    setUpdatingStatus(orderId)
    const supabase = createClient()

    const updates: any = { status: newStatus }
    if (newStatus === "shipped" && !selectedOrder?.shipped_at) {
      updates.shipped_at = new Date().toISOString()
    }

    const { error } = await supabase.from("orders").update(updates).eq("id", orderId)

    if (error) {
      console.error("Feil ved oppdatering av status:", error)
      alert("Kunne ikke oppdatere status")
    } else {
      await loadOrders()
      if (selectedOrder?.id === orderId) {
        const updated = orders.find((o) => o.id === orderId)
        if (updated) setSelectedOrder(updated)
      }
    }
    setUpdatingStatus(null)
  }

  async function updateTrackingNumber(orderId: string, trackingNumber: string) {
    const supabase = createClient()
    const { error } = await supabase.from("orders").update({ tracking_number: trackingNumber }).eq("id", orderId)

    if (error) {
      console.error("Feil ved oppdatering av sporingsnummer:", error)
      alert("Kunne ikke oppdatere sporingsnummer")
    } else {
      await loadOrders()
      if (selectedOrder?.id === orderId) {
        const updated = orders.find((o) => o.id === orderId)
        if (updated) setSelectedOrder(updated)
      }
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: "bg-blue-100 text-blue-800",
      processing: "bg-yellow-100 text-yellow-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
    }
    const labels = {
      paid: "Betalt",
      processing: "Under behandling",
      shipped: "Sendt",
      delivered: "Levert",
    }
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800"}`}
      >
        {labels[status as keyof typeof labels] || status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">Laster ordrer...</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light mb-2">Ordrer</h1>
        <p className="text-muted-foreground">Administrer kundeordrer og forsendelse</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Ordreliste */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Ingen ordrer ennå</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedOrder?.id === order.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium">{order.customer_name || order.customer_email}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("nb-NO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-sm text-muted-foreground">
                    {order.items.length} produkt{order.items.length !== 1 ? "er" : ""}
                  </div>
                  <div className="font-medium">{(order.total_amount / 100).toFixed(0)} kr</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Ordredetaljer */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          {selectedOrder ? (
            <div className="border border-border rounded-lg p-6 space-y-6">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-medium">Ordredetaljer</h2>
                  {getStatusBadge(selectedOrder.status)}
                </div>

                {/* Status-oppdatering */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "processing")}
                    disabled={updatingStatus === selectedOrder.id}
                    className="flex-1 px-3 py-2 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 disabled:opacity-50"
                  >
                    <Package className="h-4 w-4 inline mr-1" />
                    Behandler
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "shipped")}
                    disabled={updatingStatus === selectedOrder.id}
                    className="flex-1 px-3 py-2 text-sm bg-purple-100 text-purple-800 rounded hover:bg-purple-200 disabled:opacity-50"
                  >
                    <Truck className="h-4 w-4 inline mr-1" />
                    Sendt
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "delivered")}
                    disabled={updatingStatus === selectedOrder.id}
                    className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 disabled:opacity-50"
                  >
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Levert
                  </button>
                </div>
              </div>

              {/* Kundeinformasjon */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Kundeinformasjon
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Navn:</span> {selectedOrder.customer_name}
                  </p>
                  <p>
                    <span className="text-muted-foreground">E-post:</span> {selectedOrder.customer_email}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Bestilt:</span>{" "}
                    {new Date(selectedOrder.created_at).toLocaleDateString("nb-NO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Leveringsadresse */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Leveringsadresse
                </h3>
                <div className="text-sm space-y-1">
                  <p>{selectedOrder.shipping_name}</p>
                  <p>{selectedOrder.shipping_address_line1}</p>
                  {selectedOrder.shipping_address_line2 && <p>{selectedOrder.shipping_address_line2}</p>}
                  <p>
                    {selectedOrder.shipping_postal_code} {selectedOrder.shipping_city}
                  </p>
                  <p>{selectedOrder.shipping_country}</p>
                </div>
              </div>

              {/* Sporingsnummer */}
              <div>
                <h3 className="font-medium mb-3">Sporingsnummer</h3>
                <input
                  type="text"
                  value={selectedOrder.tracking_number || ""}
                  onChange={(e) => updateTrackingNumber(selectedOrder.id, e.target.value)}
                  placeholder="Legg til sporingsnummer..."
                  className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Produkter */}
              <div>
                <h3 className="font-medium mb-3">Produkter</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">Antall: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{(item.price / 100).toFixed(0)} kr</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frakt</span>
                    <span>{(selectedOrder.shipping_cost / 100).toFixed(0)} kr</span>
                  </div>
                  <div className="flex justify-between font-medium text-base">
                    <span>Totalt</span>
                    <span>{(selectedOrder.total_amount / 100).toFixed(0)} kr</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-border rounded-lg p-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Velg en ordre for å se detaljer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
