"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { getShoeById } from "@/services/shoe-service"
import type { Shoe } from "@/types/shoe"

export default function ShoeDetailPage({ params }: { params: { id: string } }) {
  const [shoe, setShoe] = useState<Shoe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShoe = async () => {
      setLoading(true)
      try {
        const data = await getShoeById(params.id)
        if (!data) {
          notFound()
        }
        setShoe(data)
      } catch (err) {
        console.error("Error fetching shoe:", err)
        setError("Failed to load shoe details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchShoe()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading shoe details...</p>
        </div>
      </div>
    )
  }

  if (error || !shoe) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">{error || "Shoe not found"}</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/results">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Results
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
          <Image 
            src={shoe.image || "/placeholder.svg"} 
            alt={shoe.name} 
            fill 
            className="object-cover"
            priority
          />
        </div>

        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{shoe.name}</h1>
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl text-muted-foreground">{shoe.brand}</p>
              <p className="text-2xl font-bold">${shoe.price}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline">{shoe.support}</Badge>
              <Badge variant="outline">{shoe.stack} Stack</Badge>
              {shoe.primaryUse.map((use) => (
                <Badge key={use} variant="secondary">
                  {use}
                </Badge>
              ))}
            </div>
            
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground mb-6">{shoe.description}</p>
            
            <h2 className="text-xl font-semibold mb-2">Best For</h2>
            <ul className="list-disc pl-5 mb-6 text-muted-foreground">
              {shoe.primaryUse.map((use) => (
                <li key={use}>
                  {use === "daily-trainer" && "Daily training runs"}
                  {use === "race-day" && "Race day performance"}
                  {use === "recovery" && "Recovery and easy runs"}
                  {use === "tempo-run" && "Tempo and speed workouts"}
                  {use === "beginner" && "Beginner runners"}
                </li>
              ))}
            </ul>
            
            <h2 className="text-xl font-semibold mb-2">Ideal Distances</h2>
            <ul className="list-disc pl-5 mb-6 text-muted-foreground">
              {shoe.distance.map((dist) => (
                <li key={dist}>
                  {dist === "any" && "Versatile for various distances"}
                  {dist === "5-10k" && "5K to 10K races"}
                  {dist === "long-runs" && "Long training runs"}
                  {dist === "marathons" && "Marathon training and racing"}
                </li>
              ))}
            </ul>
            
            <Button className="w-full mb-4">Add to Wishlist</Button>
            <Button variant="outline" className="w-full">
              Find at Retailers
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}