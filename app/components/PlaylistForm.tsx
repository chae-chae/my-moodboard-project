"use client";

import { useState } from "react";

export default function PlaylistForm() {
  const [playlistId, setPlaylistId] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistId(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (playlistId.trim()) {
      window.location.href = `/moodboard/${playlistId.trim()}`;
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="mt-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Enter Playlist ID"
          value={playlistId}
          onChange={handleInputChange}
          className="w-full bg-[#3E3E3E] border border-gray-600 rounded-lg p-3 pl-12 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          required
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l-2 2m12 10V8l-2-2M4 6h16"
          />
        </svg>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-[#1DB954] hover:bg-[#1ED760] text-black font-semibold rounded-lg py-3 transition-all duration-300"
      >
        Generate Moodboard
      </button>
    </form>
  );
}
