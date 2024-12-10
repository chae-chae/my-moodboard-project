export async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }).toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch access token");
    }

    // Spotify API 응답 타입을 명시적으로 지정
    const data: {
      access_token: string;
      token_type: string;
      expires_in: number;
    } = await response.json();

    return data.access_token; // access_token 반환
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Error fetching access token");
  }
}

export async function getUserAccessToken(): Promise<string | null> {
  const token = ""; // 클라이언트 측에서 전달받은 토큰(쿠키, 세션 등에서 가져옴)
  if (!token) {
    console.error("User token is missing");
    return null;
  }
  return token;
}
