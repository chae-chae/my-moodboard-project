// components/PlaylistHeader.tsx
interface PlaylistHeaderProps {
  name: string;
  description: string;
  imageUrl: string;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  name,
  description,
  imageUrl,
}) => (
  <header className="text-center">
    <h1 className="text-4xl font-bold">{name}</h1>
    <p className="text-gray-400">{description}</p>
    {imageUrl && (
      <img
        src={imageUrl}
        alt={name}
        className="w-64 h-64 mx-auto mt-4 rounded-lg shadow-lg"
      />
    )}
  </header>
);

export default PlaylistHeader;
