import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code } = await request.json();

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || "",
    client_id: process.env.SPOTIFY_CLIENT_ID || "",
    client_secret: process.env.SPOTIFY_CLIENT_SECRET || "",
  });

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Spotify API error:", error);
      return NextResponse.json({ error }, { status: response.status });
    }

    const tokens = await response.json();
    return NextResponse.json(tokens); // Access Token과 Refresh Token 반환
  } catch (error: any) {
    console.error("Error fetching Access Token:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
