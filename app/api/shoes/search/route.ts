import { NextResponse } from 'next/server'
import { shoesData } from '@/data/shoes'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  // Get filter parameters
  const primaryUse = searchParams.get('primaryUse')
  const distance = searchParams.get('distance')
  const support = searchParams.get('support')
  const stack = searchParams.get('stack')

  // Filter shoes based on criteria
  let filteredShoes = shoesData.filter(shoe => {
    const matchesPrimaryUse = !primaryUse || shoe.primaryUse.includes(primaryUse)
    const matchesDistance = !distance || shoe.distance.includes(distance)
    const matchesSupport = !support || shoe.support === support
    const matchesStack = !stack || shoe.stack === stack

    return matchesPrimaryUse && matchesDistance && matchesSupport && matchesStack
  })

  return NextResponse.json(filteredShoes)
}