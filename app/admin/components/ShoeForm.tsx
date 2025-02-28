'use client'

import { useState } from 'react'
import { Shoe } from '@/types/shoe'

interface ShoeFormProps {
  onSubmit: (shoe: Partial<Shoe>) => Promise<void>
}

export function ShoeForm({ onSubmit }: ShoeFormProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    // Reset form
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
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Add similar input fields for other properties */}
      {/* ... */}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Shoe
      </button>
    </form>
  )
}
