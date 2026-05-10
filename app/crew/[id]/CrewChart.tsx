"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ec4899",
  "#8b5cf6",
  "#06b6d4",
];

export default function CrewChart({ characters }: { characters: any[] }) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchHistories() {
      const histories = await Promise.all(
        characters.map(async (c) => {
          const res = await fetch(`/api/characters/${c.id}/history`);
          const data = await res.json();
          return { character: c, history: data };
        }),
      );

      const dateMap: Record<string, any> = {};
      for (const { character, history } of histories) {
        for (const entry of history) {
          const date = new Date(entry.recorded_at).toLocaleDateString();
          if (!dateMap[date]) dateMap[date] = { date };
          dateMap[date][character.name] = entry.price;
        }
      }

      const merged = Object.values(dateMap).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
      setChartData(merged);
    }

    fetchHistories();
  }, [characters]);

  if (chartData.length === 0)
    return <p className="text-gray-400">No price history yet.</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 11 }} />
        <YAxis stroke="#666" tick={{ fontSize: 11 }} />
        <Tooltip
          contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
          labelStyle={{ color: "#fff" }}
        />
        <Legend />
        {characters.map((c, i) => (
          <Line
            key={c.id}
            type="monotone"
            dataKey={c.name}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
