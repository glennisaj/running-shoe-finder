'use client'

import { useState, useEffect } from 'react'
import { Shoe } from '@/types/shoe'
import { ShoeForm } from './components/ShoeForm'
import { ShoeList } from './components/ShoeList'

export default function AdminPage() {
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch shoes when component mounts
  useEffect(() => {
    fetchShoes()
  }, [])

  const fetchShoes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/shoes')
      if (!response.ok) throw new Error('Failed to fetch shoes')
      const data = await response.json()
      setShoes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddShoe = async (newShoe: Partial<Shoe>) => {
    try {
      const response = await fetch('/api/shoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShoe)
      })

      if (!response.ok) throw new Error('Failed to add shoe')
      
      // Refresh the shoe list
      fetchShoes()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add shoe')
    }
  }

  const handleDeleteShoe = async (id: string) => {
    try {
      const response = await fetch('/api/shoes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      if (!response.ok) throw new Error('Failed to delete shoe')
      
      // Refresh the shoe list
      fetchShoes()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete shoe')
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shoe Admin</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shoe Form Section */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Add New Shoe</h2>
          <ShoeForm onSubmit={handleAddShoe} />
        </div>

        {/* Shoe List Section */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Existing Shoes</h2>
          {isLoading ? (
            <p>Loading shoes...</p>
          ) : (
            <ShoeList shoes={shoes} onDelete={handleDeleteShoe} />
          )}
        </div>
      </div>
    </div>
  )
}
