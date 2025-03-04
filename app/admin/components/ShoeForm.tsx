'use client'

import { useState, useEffect } from 'react'
import { Shoe } from '@/types/shoe'

interface ShoeFormProps {
  onSubmit: (shoe: Partial<Shoe>) => Promise<void>
  editingShoe?: Shoe | null
  onCancel?: () => void
}

export function ShoeForm({ onSubmit, editingShoe, onCancel }: ShoeFormProps) {
  const [formData, setFormData] = useState<Partial<Shoe>>({
    name: '',
    brand: '',
    price: 0,
    image: '/placeholder.svg',
    description: '',
    support: 'neutral',
    stack: 'medium',
    primaryUse: [],
    distance: []
  })

  // Update form when editingShoe changes
  useEffect(() => {
    if (editingShoe) {
      setFormData(editingShoe)
    }
  }, [editingShoe])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    
    // Only reset if not editing
    if (!editingShoe) {
      setFormData({
        name: '',
        brand: '',
        price: 0,
        image: '/placeholder.svg',
        description: '',
        support: 'neutral',
        stack: 'medium',
        primaryUse: [],
        distance: []
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'primaryUse' || name === 'distance') {
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(item => item.trim())
      }))
    } else if (name === 'price') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Brand</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Support</label>
        <select
          name="support"
          value={formData.support}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {/* Add support options here */}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Stack</label>
        <select
          name="stack"
          value={formData.stack}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {/* Add stack options here */}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Primary Use</label>
        <input
          type="text"
          name="primaryUse"
          value={formData.primaryUse?.join(', ')}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Distance</label>
        <input
          type="text"
          name="distance"
          value={formData.distance?.join(', ')}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editingShoe ? 'Update Shoe' : 'Add Shoe'}
      </button>
    </form>
  )
}
