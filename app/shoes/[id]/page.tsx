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

export default function ShoePage({ params }: { params: { id: string } }) {
  const [shoe, setShoe] = useState<Shoe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const response = await fetch('/api/shoes')
        const shoes = await response.json()
        const foundShoe = shoes.find((s: Shoe) => s.id === params.id)
        if (foundShoe) {
          setShoe(foundShoe)
        } else {
          setError('Shoe not found')
        }
      } catch (err) {
        setError('Failed to load shoe')
      } finally {
        setLoading(false)
      }
    }

    fetchShoe()
  }, [params.id])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>
  if (!shoe) return <div className="p-6">Shoe not found</div>

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{shoe.name}</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <img 
            src={shoe.image} 
            alt={shoe.name}
            className="w-full h-64 object-cover mb-4"
          />
          <div className="space-y-4">
            <p className="text-xl font-semibold">{shoe.brand}</p>
            <p className="text-2xl font-bold">${shoe.price}</p>
            <p className="text-gray-700">{shoe.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Support</h3>
                <p className="capitalize">{shoe.support}</p>
              </div>
              <div>
                <h3 className="font-semibold">Stack</h3>
                <p className="capitalize">{shoe.stack}</p>
              </div>
              <div>
                <h3 className="font-semibold">Primary Use</h3>
                <p>{shoe.primaryUse.join(', ')}</p>
              </div>
              <div>
                <h3 className="font-semibold">Distance</h3>
                <p>{shoe.distance.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}