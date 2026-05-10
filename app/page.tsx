import { supabase } from "../lib/supabase";

export const revalidate = 0;

export default async function Home() {
  const { data: characters, error } = await supabase
    .from("characters")
    .select("*");

  if (error) {
    console.error(error);
    return <div>Error loading characters</div>;
  }

  const crewMap: Record<string, any[]> = {};
  for (const character of characters ?? []) {
    if (!crewMap[character.crew]) crewMap[character.crew] = [];
    crewMap[character.crew].push(character);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">One Piece Stocks</h1>
      <div className="flex flex-col gap-8">
        {Object.entries(crewMap).map(([crewName, members]: [string, any[]]) => (
          <a
            key={crewName}
            href={`/crew/${encodeURIComponent(crewName)}`}
            className="border p-4 rounded-lg block hover:border-green-500 transition-colors"
          >
            <h2 className="text-xl font-bold mb-1">{crewName}</h2>
            <p className="text-gray-400 text-sm mb-3">
              {members.length} character{members.length > 1 ? "s" : ""} listed
            </p>
            <div className="flex flex-col gap-1">
              {members.map((c) => (
                <div key={c.id} className="flex justify-between text-sm">
                  <span>{c.name}</span>
                  <span className="text-green-500">
                    💰 {Number(c.current_price).toLocaleString()} Berries
                  </span>
                </div>
              ))}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
