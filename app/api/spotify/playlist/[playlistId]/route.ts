import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

const SPOTIFY_PLAYLIST_ENDPOINT = (playlistId: string) =>
  `https://api.spotify.com/v1/playlists/${playlistId}`;

export async function GET(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  const { playlistId } = params; // 동적 라우트 params를 안전하게 처리

  try {
    const accessToken = await getAccessToken(); // Spotify Access Token 가져오기
    const response = await fetch(SPOTIFY_PLAYLIST_ENDPOINT(playlistId), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch playlist:", response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch playlist" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching playlist data:", error);
    return NextResponse.json(
      { error: "Error fetching playlist data" },
      { status: 500 }
    );
  }
}
