import React, { useEffect, useState } from "react";
import { fetchUnsplashImage } from "../../lib/unsplash";
import { Playlist, AudioFeatures } from "../types";

type PlaylistMoodboardProps = {
  playlist: Playlist | null;
  audioFeatures: AudioFeatures;
};

const PlaylistMoodboard: React.FC<PlaylistMoodboardProps> = ({
  playlist,
  audioFeatures,
}) => {
  const [images, setImages] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    const fetchImages = async () => {
      if (!playlist) return;

      const newImages: { [key: string]: string | null } = {};
      for (const item of playlist.tracks.items) {
        const track = item.track;
        const mood = audioFeatures[track.id]?.valence > 0.5 ? "happy" : "chill"; // 분위기 기반 키워드 설정
        newImages[track.id] = await fetchUnsplashImage(mood);
      }
      setImages(newImages);
    };

    fetchImages();
  }, [playlist, audioFeatures]);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {playlist.tracks.items.map((item) => {
        const track = item.track;
        return (
          <div
            key={track.id}
            className="relative rounded shadow-lg overflow-hidden"
            style={{
              backgroundColor: images[track.id] ? "transparent" : "#ddd",
            }}
          >
            {images[track.id] ? (
              <img
                src={images[track.id]!}
                alt={track.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span>{track.name}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white p-4">
              <h3 className="text-lg font-bold">{track.name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistMoodboard;
