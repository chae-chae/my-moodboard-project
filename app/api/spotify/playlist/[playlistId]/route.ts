import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

export async function GET(request: Request) {
  try {
    // request URL에서 playlistId 추출
    const url = new URL(request.url);
    const playlistId = url.pathname.split("/").pop();

    // playlistId가 없는 경우 처리
    if (!playlistId) {
      return NextResponse.json(
        { error: "Playlist ID is missing" },
        { status: 400 }
      );
    }

    // Spotify Access Token 가져오기
    const accessToken = await getAccessToken();

    // Spotify API 호출
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Spotify API 호출 실패 처리
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch playlist data: ${res.statusText}` },
        { status: res.status }
      );
    }

    // API 응답 데이터 반환
    const playlistData = await res.json();
    return NextResponse.json(playlistData);
  } catch (error) {
    console.error("Error in /api/spotify/playlist/[playlistId]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
