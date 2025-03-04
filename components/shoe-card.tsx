import Image from "next/image"
import type { Shoe } from "../types/shoe"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { ExternalLink } from "lucide-react"

interface ShoeCardProps {
  shoe: Shoe
}

export default function ShoeCard({ shoe }: ShoeCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 bg-muted">
        <Image src={shoe.image || "/placeholder.svg"} alt={shoe.name} fill className="object-cover" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{shoe.name}</CardTitle>
            <CardDescription>{shoe.brand}</CardDescription>
          </div>
          <div className="text-lg font-bold">${shoe.price}</div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline">{shoe.support}</Badge>
          <Badge variant="outline">{shoe.stack} Stack</Badge>
          {shoe.primaryUse.map((use) => (
            <Badge key={use} variant="secondary">
              {use}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{shoe.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2">
          View Details
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

