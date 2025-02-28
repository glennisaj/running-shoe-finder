import { shoesData } from '@/data/shoes'
import { NextResponse } from 'next/server'
import { Shoe } from '@/types/shoe'

// Create a mutable copy of the shoes data
// In a real app, this would be replaced with a database
let shoes = [...shoesData]

// GET handler - Returns all shoes
export async function GET() {
  try {
    return NextResponse.json(shoes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch shoes' },
      { status: 500 }
    )
  }
}

// POST handler - Creates a new shoe
export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const shoe: Partial<Shoe> = await request.json()

    // Validate required fields
    if (!shoe.name || !shoe.brand || !shoe.price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new shoe object with generated ID
    const newShoe: Shoe = {
      id: (shoes.length + 1).toString(), // Simple ID generation
      name: shoe.name,
      brand: shoe.brand,
      price: shoe.price,
      image: shoe.image || '/placeholder.svg',
      description: shoe.description || '',
      support: shoe.support || 'neutral',
      stack: shoe.stack || 'medium',
      primaryUse: shoe.primaryUse || [],
      distance: shoe.distance || []
    }

    // Add to shoes array
    shoes.push(newShoe)

    return NextResponse.json(newShoe, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create shoe' },
      { status: 500 }
    )
  }
}

// DELETE handler - Removes a shoe
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Shoe ID is required' },
        { status: 400 }
      )
    }

    // Remove shoe from array
    shoes = shoes.filter(shoe => shoe.id !== id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete shoe' },
      { status: 500 }
    )
  }
}
