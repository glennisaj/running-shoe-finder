import { NextResponse } from 'next/server'
import { shoesData } from '@/data/shoes'

export async function GET() {
  try {
    return NextResponse.json(shoesData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch shoes' },
      { status: 500 }
    )
  }
}