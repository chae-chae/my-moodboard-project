// components/PlayButton.tsx

import React from "react";

interface PlayButtonProps {
  playlistId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ playlistId }) => {
  const playPlaylist = async () => {
    if (!playlistId) return;

    try {
      const response = await fetch(`/api/spotify/play`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context_uri: `spotify:playlist:${playlistId}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to play the playlist");
      }

      alert("Playlist started playing!");
    } catch (error) {
      console.error("Error playing playlist:", error);
      alert(
        "Failed to start playing the playlist. Ensure you have Spotify Premium and a connected device."
      );
    }
  };

  return (
    <button
      onClick={playPlaylist}
      className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mt-4 transition"
    >
      Play Playlist
    </button>
  );
};

export default PlayButton;
