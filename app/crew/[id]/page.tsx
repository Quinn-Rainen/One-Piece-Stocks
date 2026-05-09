export default async function CrewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const crewName = decodeURIComponent(id);

  return (
    <div className="p-8">
      <a href="/" className="text-blue-400 hover:underline mb-4 block">
        ← Back
      </a>
      <h1 className="text-3xl font-bold">{crewName}</h1>
      <p className="text-gray-400 mt-2">Crew page stuff</p>
    </div>
  );
}
