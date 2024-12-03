// lib/spotify.ts
import axios from "axios";

export async function fetchSpotifyPlaylist(
  accessToken: string,
  playlistId: string
) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}`;

  try {
    console.log("Fetching playlist:", { url, accessToken }); // 요청 디버깅

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch playlist:", errorData); // 에러 응답 디버깅
      throw new Error("Failed to fetch playlist");
    }

    const data = await response.json();
    console.log("Fetched Playlist Data:", data); // 성공적인 응답 디버깅
    return data;
  } catch (error: any) {
    console.error("Error in fetchSpotifyPlaylist:", error.message);
    throw new Error(error.response?.data || error.message);
  }
}

// /**
//  * Spotify API에서 트랙 ID 배열에 대한 오디오 특징을 가져옵니다.
//  * @param accessToken Spotify API의 엑세스 토큰
//  * @param trackIds 트랙 ID 배열
//  * @returns 오디오 특징 배열
//  */
// export const fetchAudioFeatures = async (
//   accessToken: string,
//   trackIds: string[]
// ): Promise<{ [trackId: string]: { valence: number; energy: number } }> => {
//   if (trackIds.length === 0) return {};

//   const chunkSize = 100; // Spotify API는 최대 100개의 트랙 ID만 허용
//   const chunks = [];
//   for (let i = 0; i < trackIds.length; i += chunkSize) {
//     chunks.push(trackIds.slice(i, i + chunkSize));
//   }

//   const audioFeatures: {
//     [trackId: string]: { valence: number; energy: number };
//   } = {};

//   for (const chunk of chunks) {
//     const response = await axios.get(
//       `https://api.spotify.com/v1/audio-features`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         params: {
//           ids: chunk.join(","),
//         },
//       }
//     );

//     // Spotify API 응답에서 오디오 특징 저장
//     for (const feature of response.data.audio_features) {
//       if (feature) {
//         audioFeatures[feature.id] = {
//           valence: feature.valence,
//           energy: feature.energy,
//         };
//       }
//     }
//   }

//   return audioFeatures;
// };

export async function fetchAudioFeatures(
  accessToken: string,
  playlist: any
): Promise<{ [trackId: string]: { valence: number; energy: number } }> {
  const trackIds = playlist.tracks.items.map((item: any) => item.track.id);

  console.log("Fetching audio features for track IDs:", trackIds); // 디버깅 로그

  // Spotify Audio Features API 호출
  const response = await axios.get(
    "https://api.spotify.com/v1/audio-features",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        ids: trackIds.join(","), // 트랙 ID들을 콤마로 연결
      },
    }
  );

  console.log("Audio Features API Response:", response.data); // 디버깅 로그

  const audioFeatures = response.data.audio_features;

  // 트랙 ID를 key로 가지는 객체 생성
  const featuresMap: {
    [trackId: string]: { valence: number; energy: number };
  } = {};
  audioFeatures.forEach((feature: any) => {
    if (feature) {
      featuresMap[feature.id] = {
        valence: feature.valence,
        energy: feature.energy,
      };
    }
  });

  console.log("Processed Audio Features Map:", featuresMap); // 디버깅 로그

  return featuresMap;
}
