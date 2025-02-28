import { NextRequest, NextResponse } from 'next/server'
import { shoesData } from '@/data/shoes'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const shoe = shoesData.find((shoe) => shoe.id === id)

    if (!shoe) {
      return NextResponse.json(
        { error: 'Shoe not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(shoe)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch shoe' },
      { status: 500 }
    )
  }
}