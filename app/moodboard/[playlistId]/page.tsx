"use client";

import { useEffect, useState } from "react";
import Modal from "./components/Modal";

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
  params,
}: {
  params: { playlistId: string };
}) {
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null); // 선택된 트랙 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  useEffect(() => {
    // params를 안전하게 처리
    if (params?.playlistId) {
      setPlaylistId(params.playlistId);
    }
  }, [params]);

  useEffect(() => {
    if (!playlistId) return;

    const fetchPlaylistData = async () => {
      try {
        const response = await fetch(`/api/spotify/playlist/${playlistId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setPlaylistData({
          name: data.name,
          description: data.description,
          imageUrl: data.images[0]?.url || "",
          tracks: data.tracks.items.map((item: any) => {
            const track = item.track;
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0]?.name || "Unknown Artist",
              album: track.album.name || "Unknown Album",
              imageUrl: track.album.images[0]?.url || "",
              previewUrl: track.preview_url || "",
            };
          }),
        });
      } catch (error) {
        console.error("Failed to fetch playlist data:", error);
      }
    };

    fetchPlaylistData();
  }, [playlistId]);

  const openModal = (track: Track) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTrack(null);
    setIsModalOpen(false);
  };

  if (!playlistData) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold">{playlistData.name}</h1>
        <p className="text-gray-400">{playlistData.description}</p>
        {playlistData.imageUrl && (
          <img
            src={playlistData.imageUrl}
            alt={playlistData.name}
            className="w-64 h-64 mx-auto mt-4 rounded-lg shadow-lg"
          />
        )}
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {playlistData.tracks.map((track) => (
          <div
            key={track.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition cursor-pointer"
            onClick={() => openModal(track)} // 클릭 시 모달 열기
          >
            {track.imageUrl && (
              <img
                src={track.imageUrl}
                alt={track.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-lg font-bold">{track.name}</h2>
            <p className="text-gray-400">{track.artist}</p>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} track={selectedTrack} onClose={closeModal} />
    </div>
  );
}
