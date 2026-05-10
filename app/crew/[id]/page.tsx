import { supabase } from "../../../lib/supabase";
import CrewChart from "./CrewChart";

export const revalidate = 0;

export default async function CrewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const crewName = decodeURIComponent(id);

  const { data: characters, error } = await supabase
    .from("characters")
    .select("*")
    .eq("crew", crewName);

  if (error) {
    console.error(error);
    return <div>Error loading crew</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <a href="/" className="text-blue-400 hover:underline mb-4 block">
        ← Back
      </a>
      <h1 className="text-3xl font-bold mb-2">{crewName}</h1>
      <p className="text-gray-400 text-sm mb-6">
        {characters?.length} character{characters?.length !== 1 ? "s" : ""}{" "}
        listed
      </p>

      <div className="border p-6 rounded-lg mb-8">
        <h2 className="text-lg font-bold mb-4">Price History</h2>
        <CrewChart characters={characters ?? []} />
      </div>

      <div className="flex flex-col gap-4">
        {characters?.map((c) => (
          <div key={c.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{c.name}</h2>
            <p className="text-green-500 font-bold mt-1">
              💰 {Number(c.current_price).toLocaleString()} Berries
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
