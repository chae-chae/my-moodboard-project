import { NextResponse } from "next/server";

// 토큰을 가져오는 유틸리티 함수
async function getSpotifyToken() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/spotify-token`
  );
  const data = await response.json();
  return data.access_token;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is missing" },
      { status: 400 }
    );
  }

  try {
    const token = await getSpotifyToken();
    if (!token) {
      return NextResponse.json(
        { error: "Failed to retrieve Spotify token" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
