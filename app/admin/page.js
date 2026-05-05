'use client'
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [characters, setCharacters] = useState([])
  const [name, setName] = useState('')
  const [crew, setCrew] = useState('')
  const [price, setPrice] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingPrice, setEditingPrice] = useState('')

  
  async function fetchCharacters() {
    const res = await fetch('/api/characters')
    const data = await res.json()
    setCharacters(data)
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  // Add a new character
  async function handleAdd() {
    if (!name || !crew || !price) return alert('Fill in all fields')
    await fetch('/api/characters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, crew, current_price: Number(price) })
    })
    setName('')
    setCrew('')
    setPrice('')
    fetchCharacters()
  }

  // changing price
  async function handleUpdate(id) {
    await fetch(`/api/characters/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ current_price: Number(editingPrice) })
    })
    setEditingId(null)
    setEditingPrice('')
    fetchCharacters()
  }

  
  async function handleDelete(id) {
    if (!confirm('Are you sure?')) return
    await fetch(`/api/characters/${id}`, { method: 'DELETE' })
    fetchCharacters()
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      {/* Admin Character Form */}
      <div className="border p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Character</h2>
        <div className="flex flex-col gap-3">
          <input
            className="border p-2 rounded bg-transparent"
            placeholder="Character name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="border p-2 rounded bg-transparent"
            placeholder="Crew"
            value={crew}
            onChange={e => setCrew(e.target.value)}
          />
          <input
            className="border p-2 rounded bg-transparent"
            placeholder="Starting price"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <button
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
            onClick={handleAdd}
          >
            Add Character
          </button>
        </div>
      </div>

      {/* List of every character in the database, showing all their stats and stuff */}
      <h2 className="text-xl font-bold mb-4">All Characters</h2>
      <div className="flex flex-col gap-4">
        {characters?.map(character => (
          <div key={character.id} className="border p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold">{character.name}</h3>
              <p className="text-gray-400">{character.crew}</p>
              {/* Adding the emoji of money incase it isn't clear what "Berries" means */}
              <p className="text-green-500">💰 {character.current_price} Berries</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              {editingId === character.id ? (
                <div className="flex gap-2">
                  <input
                    className="border p-1 rounded bg-transparent w-24"
                    type="number"
                    value={editingPrice}
                    onChange={e => setEditingPrice(e.target.value)}
                  />
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleUpdate(character.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => { setEditingId(character.id); setEditingPrice(character.current_price) }}
                >
                  Update Price
                </button>
              )}
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => handleDelete(character.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}