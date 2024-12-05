import axios from "axios";

// Playlist 호출 함수
export async function fetchSpotifyPlaylist(
  accessToken: string,
  playlistId: string
): Promise<any> {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data; // 성공적으로 Playlist 데이터 반환
  } catch (error: any) {
    // Access Token이 만료된 경우 새로 갱신
    if (error.response?.status === 401) {
      console.error("Access token expired. Refreshing...");
      const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;
      const newAccessToken = await refreshAccessToken(refreshToken);

      // 새로운 Access Token으로 재시도
      return fetchSpotifyPlaylist(newAccessToken, playlistId);
    }

    console.error(
      "Failed to fetch playlist:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch playlist");
  }
}

// 새로운 Access Token을 얻기 위한 함수
async function refreshAccessToken(refreshToken: string): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
}

// Spotify Audio Features API 호출
export async function fetchAudioFeatures(
  accessToken: string,
  playlist: any
): Promise<{ [trackId: string]: { valence: number; energy: number } }> {
  const trackIds = playlist.tracks.items.map((item: any) => item.track.id);

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/audio-features",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          ids: trackIds.join(","),
        },
      }
    );

    const audioFeatures = response.data.audio_features;

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

    return featuresMap;
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.error("Access token might be expired. Refreshing...");
      // 만료된 토큰이라면 새로운 토큰으로 다시 시도
      const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;
      const newAccessToken = await refreshAccessToken(refreshToken);

      // 재귀적으로 호출하여 새로운 토큰으로 데이터 가져오기
      return fetchAudioFeatures(newAccessToken, playlist);
    }

    console.error("Error fetching audio features:", error.message);
    throw error;
  }
}

export function getSpotifyLoginUrl() {
  const scopes = [
    "user-read-private",
    "playlist-read-private",
    "playlist-read-collaborative",
  ].join(" "); // 필요한 스코프 추가

  return `https://accounts.spotify.com/authorize?${new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    response_type: "code", // Authorization Code Flow
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!, // 인증 후 리다이렉트될 URI
    scope: scopes, // 스코프 추가
  }).toString()}`;
}
