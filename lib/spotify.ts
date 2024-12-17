const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

/**
 * Access Token 발급 (Refresh Token 사용)
 */
export async function getAccessToken() {
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      scope:
        "playlist-read-private playlist-read-collaborative playlist-read-public", // 스코프 추가
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Error fetching Access Token:", errorDetails);
    throw new Error("Failed to fetch Access Token");
  }

  const { access_token } = await response.json();
  console.log("Access Token:", access_token); // Access Token 출력 (테스트용)
  return access_token;
}
