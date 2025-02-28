"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { Shoe } from "@/types/shoe"
import ShoeCard from "@/components/shoe-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getShoesByFilters } from "@/services/shoe-service"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [matchedShoes, setMatchedShoes] = useState<Shoe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShoes = async () => {
      setLoading(true)
      
      const primaryUse = searchParams.get("primaryUse") || undefined
      const distance = searchParams.get("distance") || undefined
      const support = searchParams.get("support") || undefined
      const stack = searchParams.get("stack") || undefined

      try {
        const shoes = await getShoesByFilters({
          primaryUse,
          distance,
          support,
          stack
        })
        setMatchedShoes(shoes)
      } catch (error) {
        console.error("Error fetching shoes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchShoes()
  }, [searchParams])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Finding your perfect shoes...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Finder
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Your Recommended Shoes</h1>

      {matchedShoes.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No matching shoes found</h2>
          <p className="text-muted-foreground mb-6">Try adjusting your criteria to see more options.</p>
          <Link href="/">
            <Button>Try Again</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedShoes.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      )}
    </div>
  )
}