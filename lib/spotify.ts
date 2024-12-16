const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/playlists";
console.log("Client ID:", clientId);
console.log("Client Secret:", clientSecret);
console.log("Refresh Token:", refreshToken);

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
    const errorDetails = await response.text();
    console.error("Failed to fetch access token:", errorDetails);
    throw new Error("Failed to fetch Spotify access token");
  }

  const tokenData = await response.json();
  console.log("Access Token Data:", tokenData);
  return tokenData;
}

export async function getPlaylist(playlistId: string) {
  const { access_token: accessToken } = await getAccessToken();
  console.log("Access Token Used:", accessToken);

  const response = await fetch(`${PLAYLIST_ENDPOINT}/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Spotify API Error:", errorDetails);
    throw new Error("Failed to fetch playlist data from Spotify");
  }

  const playlistData = await response.json();
  console.log("Playlist Data:", playlistData);
  return playlistData;
}
