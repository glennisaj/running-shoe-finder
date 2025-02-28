"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import type { Shoe } from "@/types/shoe"

// This is a simple admin interface - in a real app, you'd want to add authentication

export default function AdminPage() {
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    support: "neutral",
    stack: "medium",
    // You'd need more complex UI for the arrays
  })

  useEffect(() => {
    fetchShoes()
  }, [])

  async function fetchShoes() {
    setLoading(true)
    const { data, error } = await supabase
      .from('shoes')
      .select('*')
    
    if (error) {
      console.error('Error fetching shoes:', error)
    } else {
      setShoes(data as Shoe[])
    }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.brand || !formData.price) {
      alert('Please fill in all required fields')
      return
    }

    try {
      // Insert basic shoe data
      const { data, error } = await supabase
        .from('shoes')
        .insert([
          { 
            name: formData.name,
            brand: formData.brand,
            price: parseFloat(formData.price as string),
            description: formData.description,
            support: formData.support,
            stack: formData.stack,
            image: '/placeholder.svg?height=400&width=600' // Default image
          }
        ])
        .select()

      if (error) {
        throw error
      }

      // In a complete implementation, you'd also handle the many-to-many relationships here
      // by inserting into the junction tables for primary uses and distances

      alert('Shoe added successfully!')
      
      // Reset form
      setFormData({
        name: "",
        brand: "",
        price: "",
        description: "",
        support: "neutral",
        stack: "medium",
      })
      
      // Refresh shoe list
      fetchShoes()
    } catch (error) {
      console.error('Error adding shoe:', error)
      alert('Error adding shoe. See console for details.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shoe Admin</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Shoe</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="brand">Brand *</Label>
                <Input 
                  id="brand" 
                  name="brand" 
                  value={formData.brand} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="support">Support</Label>
                <select 
                  id="support" 
                  name="support" 
                  value={formData.support} 
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="neutral">Neutral</option>
                  <option value="stability">Stability</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="stack">Stack Height</Label>
                <select 
                  id="stack" 
                  name="stack" 
                  value={formData.stack} 
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              {/* In a complete implementation, you'd add UI for the 
                  primaryUse and distance arrays using multi-select or checkboxes */}
              
              <Button type="submit" className="w-full">Add Shoe</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Shoes</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading shoes...</p>
            ) : (
              <div className="space-y-4">
                {shoes.length === 0 ? (
                  <p>No shoes found.</p>
                ) : (
                  shoes.map(shoe => (
                    <div key={shoe.id} className="p-4 border rounded-md">
                      <h3 className="font-semibold">{shoe.name}</h3>
                      <p className="text-sm text-muted-foreground">{shoe.brand} - ${shoe.price}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}