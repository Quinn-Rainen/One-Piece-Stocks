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

  const crews = Object.entries(crewMap).map(
    ([crewName, members]: [string, any[]]) => {
      const avgPrice =
        members.reduce((sum, c) => sum + Number(c.current_price), 0) /
        members.length;
      const topCharacter = [...members].sort(
        (a, b) => Number(b.current_price) - Number(a.current_price),
      )[0];
      return { crewName, members, avgPrice, topCharacter };
    },
  );

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Newspaper Header */}
      <div className="border-b-2 border-white pb-4 mb-2 text-center">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">
          {dateStr}
        </p>
        <h1 className="text-5xl font-black tracking-tight">
          THE GRAND LINE TIMES
        </h1>
        <p className="text-xs tracking-widest uppercase text-gray-400 mt-1">
          Market Intelligence from the New World and Old &nbsp;|&nbsp; Est. 875
          B.A.D.
        </p>
      </div>
      <div className="border-b border-gray-600 mb-8" />

      {/* Featured headline */}
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
          Breaking Market News
        </p>
        <h2 className="text-3xl font-bold leading-tight">
          {crews.length} Pirate Crews Currently Trading on the Grand Line
          Exchange
        </h2>
        <p className="text-gray-400 mt-2 text-sm">
          Click any crew to view individual character stocks and price history
        </p>
      </div>

      {/* Crew Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {crews.map(({ crewName, members, avgPrice, topCharacter }) => {
          const change = (Math.random() * 10 - 5).toFixed(2);
          const isUp = Number(change) >= 0;

          return (
            <a
              key={crewName}
              href={`/crew/${encodeURIComponent(crewName)}`}
              className="block border border-gray-700 hover:border-white transition-colors duration-200 group"
            >
              <div className="border-b border-gray-700 px-5 py-3 flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-gray-400">
                  Crew Report
                </span>
                <span
                  className={`text-xs font-bold ${isUp ? "text-green-400" : "text-red-400"}`}
                >
                  {isUp ? "▲" : "▼"} {Math.abs(Number(change))}% this week
                </span>
              </div>

              <div className="px-5 py-4">
                <h3 className="text-xl font-black group-hover:underline leading-tight mb-2">
                  {crewName}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {members.length} character{members.length > 1 ? "s" : ""}{" "}
                  currently listed. Average crew valuation sits at{" "}
                  <span className="text-white font-semibold">
                    {Math.round(avgPrice).toLocaleString()} Berries
                  </span>
                  . Top performer:{" "}
                  <span className="text-white font-semibold">
                    {topCharacter.name}
                  </span>{" "}
                  at{" "}
                  <span className="text-white font-semibold">
                    {Number(topCharacter.current_price).toLocaleString()}{" "}
                    Berries
                  </span>
                  .
                </p>

                <div className="flex flex-wrap gap-2">
                  {members.map((m: any) => (
                    <span
                      key={m.id}
                      className="text-xs border border-gray-600 px-2 py-1 text-gray-300"
                    >
                      {m.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-700 px-5 py-2 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {members.length} stock{members.length > 1 ? "s" : ""} listed
                </span>
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                  View full report →
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
