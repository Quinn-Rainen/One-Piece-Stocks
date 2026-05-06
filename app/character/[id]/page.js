'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function CharacterPage({ params }) {
  const [character, setCharacter] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    async function fetchData() {
      const id = (await params).id

      const charRes = await fetch(`/api/characters`)
      const chars = await charRes.json()
      const found = chars.find(c => c.id === Number(id))
      setCharacter(found)

      const histRes = await fetch(`/api/characters/${id}/history`)
      const histData = await histRes.json()
      const formatted = histData.map(entry => ({
        date: new Date(entry.recorded_at).toLocaleDateString(),
        price: entry.price
      }))
      setHistory(formatted)
    }
    fetchData()
  }, [params])

  if (!character) return <div className="p-8">Loading...</div>

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <a href="/" className="text-blue-400 hover:underline mb-6 block">← Back to Market</a>

      <div className="border p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold">{character.name}</h1>
        <p className="text-gray-400 mt-1">{character.crew}</p>
        <p className="text-green-500 text-2xl font-bold mt-2">
          💰 {character.current_price} Berries
        </p>
      </div>

      <div className="border p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Price History</h2>
        {history.length === 0 ? (
          <p className="text-gray-400">No price history yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </main>
  )
}