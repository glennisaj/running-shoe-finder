import { Shoe } from '@/types/shoe'

interface ShoeListProps {
  shoes: Shoe[]
  onDelete: (id: string) => Promise<void>
}

export function ShoeList({ shoes, onDelete }: ShoeListProps) {
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
            <button
              onClick={() => onDelete(shoe.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {shoes.length === 0 && (
        <p className="text-gray-500">No shoes added yet.</p>
      )}
    </div>
  )
}
