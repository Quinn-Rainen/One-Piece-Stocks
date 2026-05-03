import { supabase } from '../lib/supabase'

export default async function Home() {
  const { data: characters, error } = await supabase
    .from('characters')
    .select('*')

  if (error) {
    console.error(error)
    return <div>Error loading characters</div>
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">One Piece Stocks</h1>
      <div className="grid grid-cols-1 gap-4">
        {characters?.map(character => (
          <div key={character.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{character.name}</h2>
            <p className="text-gray-500">{character.crew}</p>
            <p className="text-red-500 font-bold"> {character.current_price} Berries</p>
          </div>
        ))}
      </div>
    </main>
  )
}