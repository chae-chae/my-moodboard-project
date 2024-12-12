const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/playlists";

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Spotify access token");
  }

  return response.json();
}

export async function getPlaylist(playlistId: string) {
  const { access_token: accessToken } = await getAccessToken();

  const response = await fetch(`${PLAYLIST_ENDPOINT}/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Spotify API Error:", errorDetails);
    throw new Error("Failed to fetch playlist data from Spotify");
  }

  return response.json();
}
