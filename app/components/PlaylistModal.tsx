// app/components/PlaylistModal.tsx
"use client";

type PlaylistModalProps = {
  playlist: {
    id: string;
    name: string;
    images: { url: string }[];
    description?: string;
  };
  onClose: () => void;
};

export default function PlaylistModal({
  playlist,
  onClose,
}: PlaylistModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full">
        <button onClick={onClose} className="text-white absolute top-4 right-4">
          X
        </button>
        <img
          src={playlist.images[0]?.url}
          alt={playlist.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold text-white mb-2">
          {playlist.name}
        </h2>
        <p className="text-gray-300">
          {playlist.description || "No description available"}
        </p>
      </div>
    </div>
  );
}
