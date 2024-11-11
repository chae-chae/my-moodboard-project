// app/components/PlaylistMoodboard.tsx
"use client";

import { useEffect, useState } from "react";

type Playlist = {
  id: string;
  name: string;
  images: { url: string }[];
  description?: string;
};

type AudioFeature = {
  energy: number;
  valence: number;
};

export default function PlaylistMoodboard() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [audioFeatures, setAudioFeatures] = useState<{
    [id: string]: AudioFeature[];
  }>({});

  useEffect(() => {
    async function fetchPlaylists() {
      const response = await fetch("/api/playlist");
      const data = await response.json();
      setPlaylists(data.items);
    }
    fetchPlaylists();
  }, []);

  useEffect(() => {
    async function fetchAudioFeatures() {
      for (const playlist of playlists) {
        const response = await fetch(
          `/api/playlistAudioFeatures?playlistId=${playlist.id}`
        );
        const data = await response.json();
        setAudioFeatures((prev) => ({
          ...prev,
          [playlist.id]: data.audio_features,
        }));
      }
    }
    if (playlists.length > 0) fetchAudioFeatures();
  }, [playlists]);

  // 분위기에 맞는 색상을 결정하는 함수
  const getMoodColor = (features: AudioFeature[]) => {
    if (features.length === 0) return "bg-gray-700";
    const avgEnergy =
      features.reduce((sum, f) => sum + f.energy, 0) / features.length;
    const avgValence =
      features.reduce((sum, f) => sum + f.valence, 0) / features.length;

    if (avgEnergy > 0.6 && avgValence > 0.6) return "bg-yellow-500";
    if (avgEnergy < 0.4 && avgValence < 0.4) return "bg-blue-900";
    if (avgEnergy > 0.6) return "bg-red-500";
    return "bg-green-500";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {playlists.map((playlist) => {
        const features = audioFeatures[playlist.id] || [];
        const moodColor = getMoodColor(features);

        return (
          <div
            key={playlist.id}
            className={`p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 ${moodColor}`}
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
        );
      })}
    </div>
  );
}
