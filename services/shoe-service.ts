import type { Shoe } from '@/types/shoe'

export async function getAllShoes(): Promise<Shoe[]> {
  try {
    const response = await fetch('/api/shoes')
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    
    const data: Shoe[] = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch shoes:', error)
    return []
  }
}

export async function getShoeById(id: string): Promise<Shoe | null> {
  try {
    const response = await fetch(`/api/shoes/${id}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Error: ${response.status}`)
    }
    
    const data: Shoe = await response.json()
    return data
  } catch (error) {
    console.error(`Failed to fetch shoe with id ${id}:`, error)
    return null
  }
}

export async function getShoesByFilters({
  primaryUse,
  distance,
  support,
  stack,
}: {
  primaryUse?: string;
  distance?: string;
  support?: string;
  stack?: string;
}): Promise<Shoe[]> {
  try {
    // Build the query parameters
    const params = new URLSearchParams()
    if (primaryUse) params.append('primaryUse', primaryUse)
    if (distance) params.append('distance', distance)
    if (support) params.append('support', support)
    if (stack) params.append('stack', stack)
    
    const response = await fetch(`/api/shoes/search?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    
    const data: Shoe[] = await response.json()
    return data
  } catch (error) {
    console.error('Failed to search shoes:', error)
    return []
  }
}