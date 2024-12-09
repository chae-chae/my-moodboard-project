"use client";

import { useEffect, useState } from "react";

interface PlaylistData {
  name: string;
  description: string;
  imageUrl: string;
  tracks: Track[];
}

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  previewUrl: string;
}

export default function MoodboardPage({
  params: { playlistId },
}: {
  params: { playlistId: string };
}) {
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await fetch(`/api/spotify/playlist/${playlistId}`);
        const data = await response.json();

        setPlaylistData({
          name: data.name,
          description: data.description,
          imageUrl: data.images[0]?.url,
          tracks: data.tracks.items.map((item: any) => ({
            id: item.track.id,
            name: item.track.name,
            artist: item.track.artists[0].name,
            album: item.track.album.name,
            imageUrl: item.track.album.images[0]?.url,
            previewUrl: item.track.preview_url,
          })),
        });
      } catch (error) {
        console.error("Failed to fetch playlist data:", error);
      }
    };

    fetchPlaylistData();
  }, [playlistId]);

  if (!playlistData) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold">{playlistData.name}</h1>
        <p className="text-gray-400">{playlistData.description}</p>
        <img
          src={playlistData.imageUrl}
          alt={playlistData.name}
          className="w-64 h-64 mx-auto mt-4 rounded-lg shadow-lg"
        />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {playlistData.tracks.map((track) => (
          <div
            key={track.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition"
          >
            <img
              src={track.imageUrl}
              alt={track.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-bold">{track.name}</h2>
            <p className="text-gray-400">{track.artist}</p>
            <audio controls className="w-full mt-4">
              <source src={track.previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}
