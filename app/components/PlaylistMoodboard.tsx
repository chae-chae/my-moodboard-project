import React from "react";

export interface PlaylistMoodboardProps {
  playlist: any; // Playlist 타입 정의를 추가 가능
  audioFeatures?: { [trackId: string]: { valence: number; energy: number } }; // 선택적 속성
}

// 분위기 색상 계산 함수
function getMoodColor(valence?: number, energy?: number): string {
  if (valence === undefined || energy === undefined) {
    return "bg-gray-300"; // 기본값: 회색
  }

  if (valence > 0.7 && energy > 0.7) return "bg-yellow-400"; // 밝고 활기찬
  if (valence > 0.7) return "bg-green-400"; // 밝고 차분한
  if (energy > 0.7) return "bg-red-400"; // 어둡고 강렬한
  return "bg-blue-400"; // 어둡고 차분한
}

export default function PlaylistMoodboard({
  playlist,
  audioFeatures,
}: PlaylistMoodboardProps) {
  if (!playlist) {
    return <div>Playlist data is missing.</div>;
  }

  console.log("Playlist Data:", playlist); // 디버깅 로그
  console.log("Audio Features Data:", audioFeatures); // 디버깅 로그

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {playlist.name || "No Playlist Name Available"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlist.tracks?.items?.map((item: any) => {
          const track = item.track;
          const features = audioFeatures ? audioFeatures[track.id] : null;

          console.log("Track ID:", track.id); // 디버깅 로그
          console.log("Features for Track:", features); // 디버깅 로그

          const moodColor = features
            ? getMoodColor(features.valence, features.energy)
            : "bg-gray-300";

          return (
            <div
              key={track.id}
              className={`p-4 rounded-lg shadow-md text-white ${moodColor}`}
            >
              <h2 className="text-lg font-semibold">
                {track.name || "Unknown Track Name"}
              </h2>
              <p className="text-sm">
                {track.artists?.map((artist: any) => artist.name).join(", ") ||
                  "Unknown Artist"}
              </p>
              {features && (
                <div className="mt-2 text-sm">
                  <p>Valence: {features.valence.toFixed(2)}</p>
                  <p>Energy: {features.energy.toFixed(2)}</p>
                </div>
              )}
            </div>
          );
        }) || <p>No tracks available.</p>}
      </div>
    </div>
  );
}
