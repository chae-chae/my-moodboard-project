"use client";

import React, { useEffect, useState } from "react";
import { fetchUnsplashImage } from "../../lib/unsplash";
import { Playlist, AudioFeatures } from "../types";

type PlaylistMoodboardProps = {
  playlist: Playlist;
  audioFeatures: AudioFeatures;
};

const PlaylistMoodboard: React.FC<PlaylistMoodboardProps> = ({
  playlist,
  audioFeatures,
}) => {
  const [images, setImages] = useState<{ [key: string]: string | null }>({});

  // 방어적 코드: tracks 확인
  const tracks = playlist?.tracks?.items || [];
  if (tracks.length === 0) {
    return <div>No tracks found in the playlist.</div>;
  }

  useEffect(() => {
    const fetchImages = async () => {
      const newImages: { [key: string]: string | null } = {};

      for (const track of tracks) {
        const mood =
          audioFeatures[track.track.id]?.valence > 0.5 ? "happy" : "chill";

        newImages[track.track.id] = await fetchUnsplashImage(mood);
      }
      setImages(newImages);
    };

    fetchImages();
  }, [tracks, audioFeatures]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {tracks.map((item) => (
        <div
          key={item.track.id}
          className="relative rounded shadow-lg overflow-hidden"
          style={{
            backgroundColor: images[item.track.id] ? "transparent" : "#ddd",
          }}
        >
          {images[item.track.id] ? (
            <img
              src={images[item.track.id]!}
              alt={item.track.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span>{item.track.name}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white p-4">
            <h3 className="text-lg font-bold">{item.track.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistMoodboard;
