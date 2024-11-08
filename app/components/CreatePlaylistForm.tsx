// app/components/CreatePlaylistForm.tsx
"use client";

import { useState } from "react";

export default function CreatePlaylistForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/createPlaylist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, isPublic }),
    });

    if (response.ok) {
      const newPlaylist = await response.json();
      console.log("새로운 플레이리스트가 생성되었습니다:", newPlaylist);
    } else {
      console.error("플레이리스트 생성 중 오류 발생");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-800 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        Create New Playlist
      </h2>
      <div className="mb-4">
        <label className="text-white block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="text-white block mb-2">Public</label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="mr-2"
        />
        <span className="text-white">Make playlist public</span>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Create Playlist
      </button>
    </form>
  );
}
