// app/moodboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import PlaylistMoodboard from "../components/PlaylistMoodboard";
import { Playlist } from "../types";

export default function MoodboardPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");

    if (token) {
      fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const playlistsData = data.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.images[0]?.url || "",
            description: item.description,
          }));
          setPlaylists(playlistsData);
        })
        .catch((error) => console.error("Error fetching playlists:", error));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Your Moodboard
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Discover your playlists beautifully organized as a moodboard.
      </p>
      <PlaylistMoodboard playlists={playlists} />
    </div>
  );
}
