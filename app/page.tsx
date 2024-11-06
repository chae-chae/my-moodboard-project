// app/page.tsx
"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        console.error("API 요청 실패:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("API 응답 데이터:", data); // 응답 데이터 로그
      setTracks(data.tracks.items);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">Spotify Music Mood Board</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song"
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        Search
      </button>
      <div className="mt-6 w-full max-w-md">
        {tracks.length > 0 ? (
          <ul>
            {tracks.map((track) => (
              <li key={track.id} className="mb-2">
                <p className="font-semibold">{track.name}</p>
                <p className="text-sm text-gray-500">
                  {track.artists.map((artist: any) => artist.name).join(", ")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
}
