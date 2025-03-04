'use client'

import { useState, useEffect } from 'react'
import { Shoe } from '@/types/shoe'
import { ShoeForm } from './components/ShoeForm'
import { ShoeList } from './components/ShoeList'
import { signOut, useSession } from 'next-auth/react'

export default function AdminPage() {
  const { data: session } = useSession()
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [editingShoe, setEditingShoe] = useState<Shoe | null>(null)
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

  const handleAddOrUpdateShoe = async (shoeData: Partial<Shoe>) => {
    try {
      const method = editingShoe ? 'PUT' : 'POST'
      const shoe = editingShoe ? { ...shoeData, id: editingShoe.id } : shoeData

      const response = await fetch('/api/shoes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shoe)
      })

      if (!response.ok) throw new Error(`Failed to ${editingShoe ? 'update' : 'add'} shoe`)
      
      await fetchShoes()
      setEditingShoe(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save shoe')
    }
  }

  const handleEdit = (shoe: Shoe) => {
    setEditingShoe(shoe)
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingShoe(null)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/shoes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      if (!response.ok) throw new Error('Failed to delete shoe')
      fetchShoes()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete shoe')
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {editingShoe ? 'Edit Shoe' : 'Add New Shoe'}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {session?.user?.email}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <ShoeForm 
            onSubmit={handleAddOrUpdateShoe}
            editingShoe={editingShoe}
            onCancel={() => setEditingShoe(null)}
          />
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Existing Shoes</h2>
          {isLoading ? (
            <p>Loading shoes...</p>
          ) : (
            <ShoeList 
              shoes={shoes} 
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </div>
  )
}

