// components/PlayTrackButton.tsx
import React, { useState } from "react";

interface PlayTrackButtonProps {
  trackId: string;
}

const PlayTrackButton: React.FC<PlayTrackButtonProps> = ({ trackId }) => {
  const [loading, setLoading] = useState(false);

  const playTrack = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/spotify/play`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [`spotify:track:${trackId}`], // 트랙 URI로 재생
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to play the track");
      }

      alert("Track started playing!");
    } catch (error) {
      console.error("Error playing track:", error);
      alert("Failed to play the track.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={playTrack}
      disabled={loading}
      className={`${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-400"
      } text-white font-bold py-2 px-4 rounded transition`}
    >
      {loading ? "Loading..." : "Play Track"}
    </button>
  );
};

export default PlayTrackButton;
