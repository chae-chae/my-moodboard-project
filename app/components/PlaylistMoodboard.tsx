// app/components/PlaylistMoodboard.tsx
import React from "react";
import { Playlist } from "../types";

interface PlaylistMoodboardProps {
  playlists: Playlist[];
}

const PlaylistMoodboard: React.FC<PlaylistMoodboardProps> = ({ playlists }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{playlist.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {playlist.description || "No description available"}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistMoodboard;
