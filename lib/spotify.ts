// lib/spotify.ts
import axios from "axios";

/**
 * Spotify API에서 플레이리스트를 가져옵니다.
 * @param accessToken Spotify API의 엑세스 토큰
 * @param playlistId 플레이리스트 ID
 * @returns 플레이리스트 데이터
 */
export const fetchSpotifyPlaylist = async (
  accessToken: string,
  playlistId: string
) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

/**
 * Spotify API에서 트랙 ID 배열에 대한 오디오 특징을 가져옵니다.
 * @param accessToken Spotify API의 엑세스 토큰
 * @param trackIds 트랙 ID 배열
 * @returns 오디오 특징 배열
 */
export const fetchAudioFeatures = async (
  accessToken: string,
  trackIds: string[]
): Promise<{ [trackId: string]: { valence: number; energy: number } }> => {
  if (trackIds.length === 0) return {};

  const chunkSize = 100; // Spotify API는 최대 100개의 트랙 ID만 허용
  const chunks = [];
  for (let i = 0; i < trackIds.length; i += chunkSize) {
    chunks.push(trackIds.slice(i, i + chunkSize));
  }

  const audioFeatures: {
    [trackId: string]: { valence: number; energy: number };
  } = {};

  for (const chunk of chunks) {
    const response = await axios.get(
      `https://api.spotify.com/v1/audio-features`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          ids: chunk.join(","),
        },
      }
    );

    // Spotify API 응답에서 오디오 특징 저장
    for (const feature of response.data.audio_features) {
      if (feature) {
        audioFeatures[feature.id] = {
          valence: feature.valence,
          energy: feature.energy,
        };
      }
    }
  }

  return audioFeatures;
};
