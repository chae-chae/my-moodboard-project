export default function PlaylistHeader({
  name,
  description,
  imageUrl,
}: {
  name: string;
  description: string;
  imageUrl: string;
}) {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-32 h-32 rounded-lg shadow-lg"
      />
      <div>
        <h1 className="text-4xl font-bold">{name}</h1>
        <p className="text-gray-400 mt-2">{description}</p>
      </div>
    </div>
  );
}
