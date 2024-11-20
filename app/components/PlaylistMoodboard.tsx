import React, { useEffect, useState } from "react";
import { fetchUnsplashImage } from "../../lib/unsplash";
import { fetchAudioFeatures } from "../../lib/spotify";
import { Playlist } from "../types";

type PlaylistMoodboardProps = {
  playlist: Playlist | null;
  accessToken: string; // Spotify API 엑세스 토큰
};

const PlaylistMoodboard: React.FC<PlaylistMoodboardProps> = ({
  playlist,
  accessToken,
}) => {
  const [images, setImages] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      if (!playlist) return;

      // 트랙 ID 배열 추출
      const trackIds = playlist.tracks.items.map((item) => item.track.id);

      // Spotify API에서 오디오 특징 가져오기
      const audioFeatures = await fetchAudioFeatures(accessToken, trackIds);

      const newImages: { [key: string]: string | null } = {};

      for (const item of playlist.tracks.items) {
        const track = item.track;
        const features = audioFeatures[track.id];

        if (features) {
          // 분위기 키워드 결정 (valence: 감정적 톤, energy: 에너지 레벨)
          const mood =
            features.valence > 0.5
              ? features.energy > 0.5
                ? "energetic"
                : "happy"
              : features.energy > 0.5
              ? "dark"
              : "chill";

          // Unsplash API를 통해 이미지 가져오기
          newImages[track.id] = await fetchUnsplashImage(mood);
        }
      }

      setImages(newImages);
      setLoading(false);
    };

    fetchImages();
  }, [playlist, accessToken]);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Generating moodboard...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {playlist.tracks.items.map(({ track }) => (
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
      ))}
    </div>
  );
};

export default PlaylistMoodboard;
