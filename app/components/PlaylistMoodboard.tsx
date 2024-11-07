// app/components/PlaylistMoodboard.tsx
"use client";

import { useEffect, useState } from "react";
import PlaylistModal from "./PlaylistModal";

type Playlist = {
  id: string;
  name: string;
  images: { url: string }[];
  description?: string;
};

export default function PlaylistMoodboard() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  useEffect(() => {
    async function fetchPlaylists() {
      const response = await fetch("/api/playlist");
      const data = await response.json();
      setPlaylists(data.items || []); // data.items가 undefined일 경우 빈 배열로 설정
    }
    fetchPlaylists();
  }, []);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => setSelectedPlaylist(playlist)}
            className="bg-gray-800 p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <img
              src={playlist.images[0]?.url || "/placeholder.png"}
              alt={playlist.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-white">
              {playlist.name}
            </h2>
          </div>
        ))}
      </div>
      {selectedPlaylist && (
        <PlaylistModal
          playlist={selectedPlaylist}
          onClose={() => setSelectedPlaylist(null)}
        />
      )}
    </div>
  );
}
