"use client";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState("");
  const [crew, setCrew] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingPrice, setEditingPrice] = useState("");

  async function fetchCharacters() {
    const res = await fetch("/api/characters");
    const data = await res.json();
    setCharacters(data);
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  async function handleAdd() {
    if (!name || !crew || !price) return alert("Fill in all fields");
    await fetch("/api/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, crew, current_price: Number(price) }),
    });
    setName("");
    setCrew("");
    setPrice("");
    fetchCharacters();
  }

  async function handleUpdate(id) {
    await fetch(`/api/characters/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current_price: Number(editingPrice) }),
    });
    setEditingId(null);
    setEditingPrice("");
    fetchCharacters();
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/characters/${id}`, { method: "DELETE" });
    fetchCharacters();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="border-b-2 border-white pb-4 mb-2 text-center">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">
          Internal Operations
        </p>
        <h1 className="text-4xl font-black tracking-tight">
          THE GRAND LINE TIMES
        </h1>
        <p className="text-xs tracking-widest uppercase text-gray-400 mt-1">
          Admin Panel — Market Management
        </p>
      </div>
      <div className="border-b border-gray-600 mb-8" />

      <a
        href="/"
        className="text-xs uppercase tracking-widest text-gray-400 hover:text-white mb-8 block"
      >
        ← Back to Market
      </a>

      {/* Add crew */}
      <div className="border border-gray-700 p-6 mb-10">
        <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">
          List New Character
        </h2>
        <div className="flex flex-col gap-3">
          <input
            className="bg-transparent border border-gray-600 p-2 rounded text-white placeholder-gray-500 focus:border-white outline-none"
            placeholder="Character name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-transparent border border-gray-600 p-2 rounded text-white placeholder-gray-500 focus:border-white outline-none"
            placeholder="Crew"
            value={crew}
            onChange={(e) => setCrew(e.target.value)}
          />
          <input
            className="bg-transparent border border-gray-600 p-2 rounded text-white placeholder-gray-500 focus:border-white outline-none"
            placeholder="Starting price in Berries"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button
            className="border border-white text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            onClick={handleAdd}
          >
            Add to Exchange
          </button>
        </div>
      </div>

      <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">
        All Listed Characters
      </h2>
      <div className="flex flex-col gap-3">
        {characters?.map((character) => (
          <div
            key={character.id}
            className="border border-gray-700 px-5 py-4 flex justify-between items-center"
          >
            <div>
              <p className="font-black">{character.name}</p>
              <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">
                {character.crew}
              </p>
              <p className="text-green-400 text-sm mt-1">
                {Number(character.current_price).toLocaleString()} Berries
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              {editingId === character.id ? (
                <div className="flex gap-2 items-center">
                  <input
                    className="bg-transparent border border-gray-600 p-1 rounded text-white w-24 text-sm outline-none"
                    type="number"
                    value={editingPrice}
                    onChange={(e) => setEditingPrice(e.target.value)}
                  />
                  <button
                    className="text-xs border border-green-500 text-green-400 px-3 py-1 hover:bg-green-500 hover:text-black transition-colors"
                    onClick={() => handleUpdate(character.id)}
                  >
                    Save
                  </button>
                  <button
                    className="text-xs border border-gray-600 text-gray-400 px-3 py-1 hover:bg-gray-600 transition-colors"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="text-xs border border-gray-600 text-gray-300 px-3 py-1 hover:border-white hover:text-white transition-colors"
                  onClick={() => {
                    setEditingId(character.id);
                    setEditingPrice(character.current_price);
                  }}
                >
                  Update Price
                </button>
              )}
              <button
                className="text-xs border border-red-800 text-red-400 px-3 py-1 hover:bg-red-800 hover:text-white transition-colors"
                onClick={() => handleDelete(character.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
