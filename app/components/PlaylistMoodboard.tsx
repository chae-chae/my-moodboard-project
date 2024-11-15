// app/components/PlaylistMoodboard.tsx
import { useEffect, useState } from "react";
import { Playlist } from "../types"; // 데이터 타입에 맞춰 적절히 수정

export default function PlaylistMoodboard() {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await fetch(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const data = await response.json();
        setPlaylist(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 bg-gray-100">
      {playlist && playlist.tracks && playlist.tracks.items ? (
        playlist.tracks.items.map((track) => (
          <div
            key={track.track.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={track.track.album.images[0].url}
              alt={track.track.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{track.track.name}</h2>
              <p className="text-gray-500">{track.track.artists[0].name}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading playlist...</p>
      )}
    </div>
  );
}
