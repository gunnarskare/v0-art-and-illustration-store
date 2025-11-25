"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Hold deg oppdatert</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Få beskjed om nye kolleksjoner, eksklusive tilbud og kreativ inspirasjon rett i innboksen din.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Din e-postadresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">Meld deg på</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            Vi respekterer ditt personvern. Du kan melde deg av når som helst.
          </p>
        </div>
      </div>
    </section>
  )
}
