// app/components/PlaylistMoodboard.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Playlist } from "../types";

interface PlaylistMoodboardProps {
  playlists?: Playlist[]; // playlists를 선택적 속성으로 지정
}

const PlaylistMoodboard: React.FC<PlaylistMoodboardProps> = ({
  playlists = [],
}) => {
  const [clientPlaylists, setClientPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    setClientPlaylists(playlists || []);
  }, [playlists]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {clientPlaylists.length > 0 ? (
        clientPlaylists.map((playlist) => (
          <div key={playlist.id} className="bg-gray-100 p-4 rounded shadow">
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 text-lg font-semibold">{playlist.name}</h3>
          </div>
        ))
      ) : (
        <p className="text-center col-span-3">No playlists available.</p>
      )}
    </div>
  );
};

export default PlaylistMoodboard;
