import { Shoe } from '@/types/shoe'
import Link from 'next/link'

interface ShoeListProps {
  shoes: Shoe[]
  onDelete: (id: string) => Promise<void>
  onEdit: (shoe: Shoe) => void
}

export function ShoeList({ shoes, onDelete, onEdit }: ShoeListProps) {
  return (
    <div className="space-y-4">
      {shoes.map(shoe => (
        <div key={shoe.id} className="border p-4 rounded">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">{shoe.name}</h3>
              <p className="text-sm text-gray-600">{shoe.brand}</p>
              <p className="text-sm">${shoe.price}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(shoe)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <Link
                href={`/shoes/${shoe.id}`}
                target="_blank"
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 inline-block"
              >
                Preview
              </Link>
              <button
                onClick={() => onDelete(shoe.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {shoes.length === 0 && (
        <p className="text-gray-500">No shoes added yet.</p>
      )}
    </div>
  )
}
