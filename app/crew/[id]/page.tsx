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

  const avgPrice = characters
    ? characters.reduce((sum, c) => sum + Number(c.current_price), 0) /
      characters.length
    : 0;

  const topCharacter = characters
    ? [...characters].sort(
        (a, b) => Number(b.current_price) - Number(a.current_price),
      )[0]
    : null;

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Back */}
      <a
        href="/"
        className="text-xs uppercase tracking-widest text-gray-400 hover:text-white mb-8 block"
      >
        ← Back to Market
      </a>

      {/* Newspaper Header */}
      <div className="border-b-2 border-white pb-4 mb-2 text-center">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">
          {dateStr}
        </p>
        <h1 className="text-5xl font-black tracking-tight">
          THE GRAND LINE GAZETTE
        </h1>
        <p className="text-xs tracking-widest uppercase text-gray-400 mt-1">
          Market Intelligence from the New World &nbsp;|&nbsp; Est. Sea 1520
        </p>
      </div>
      <div className="border-b border-gray-600 mb-8" />

      {/* Crew Headline */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
          Crew Report
        </p>
        <h2 className="text-4xl font-black leading-tight mb-3">{crewName}</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          {characters?.length} character{characters?.length !== 1 ? "s" : ""}{" "}
          currently listed.
          {topCharacter && (
            <>
              {" "}
              Top performer is{" "}
              <span className="text-white font-semibold">
                {topCharacter.name}
              </span>{" "}
              at{" "}
              <span className="text-white font-semibold">
                {Number(topCharacter.current_price).toLocaleString()} Berries
              </span>
              .
            </>
          )}{" "}
          Average crew valuation:{" "}
          <span className="text-white font-semibold">
            {Math.round(avgPrice).toLocaleString()} Berries
          </span>
          .
        </p>
      </div>

      {/* Chart */}
      <div className="border border-gray-700 p-6 mb-8">
        <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">
          Price History — All Members
        </h3>
        <CrewChart characters={characters ?? []} />
      </div>

      {/* Individual Stocks */}
      <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">
        Individual Stocks
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {characters?.map((c, i) => {
          const colors = [
            "#22c55e",
            "#3b82f6",
            "#f59e0b",
            "#ec4899",
            "#8b5cf6",
            "#06b6d4",
          ];
          const color = colors[i % colors.length];
          return (
            <div
              key={c.id}
              className="border border-gray-700 px-5 py-4"
              style={{ borderLeftColor: color, borderLeftWidth: 3 }}
            >
              <h4 className="font-black text-lg">{c.name}</h4>
              <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">
                {c.crew}
              </p>
              <p className="text-2xl font-bold mt-3" style={{ color }}>
                {Number(c.current_price).toLocaleString()}
                <span className="text-xs text-gray-400 font-normal ml-1">
                  Berries
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
