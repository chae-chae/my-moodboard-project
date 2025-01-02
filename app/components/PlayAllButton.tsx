"use client";

import { useEffect, useState } from "react";

interface Track {
  id: string;
  previewUrl: string;
}

export default function PlayAllButton({ tracks }: { tracks: Track[] }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  );
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioPlayer) return;

    const handleEnded = () => {
      if (
        currentTrackIndex === null ||
        currentTrackIndex === tracks.length - 1
      ) {
        setCurrentTrackIndex(null);
        return;
      }
      setCurrentTrackIndex((prev) => (prev !== null ? prev + 1 : null));
    };

    audioPlayer.addEventListener("ended", handleEnded);

    return () => {
      audioPlayer.removeEventListener("ended", handleEnded);
    };
  }, [audioPlayer, currentTrackIndex, tracks]);

  useEffect(() => {
    if (currentTrackIndex !== null && tracks[currentTrackIndex]?.previewUrl) {
      const audio = new Audio(tracks[currentTrackIndex].previewUrl);
      setAudioPlayer(audio);
      audio.play();
    }

    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
    };
  }, [currentTrackIndex]);

  const handlePlayAll = () => {
    setCurrentTrackIndex(0);
  };

  return (
    <button
      onClick={handlePlayAll}
      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
    >
      Play All
    </button>
  );
}
