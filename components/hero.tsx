import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Find Your Perfect Running Shoes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Answer a few simple questions and we'll recommend the best running shoes for your needs.
        </p>
        <Link href="#shoe-finder">
          <Button size="lg" className="font-medium">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}

