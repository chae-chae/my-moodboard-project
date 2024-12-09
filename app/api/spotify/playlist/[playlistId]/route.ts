import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../../../utils/spotify-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { playlistId: string } }
) {
  const { playlistId } = params; // 동적으로 playlistId 추출

  try {
    // Spotify API Access Token 가져오기
    const accessToken = await getAccessToken();

    // Spotify API 요청
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch playlist data" },
        { status: response.status }
      );
    }

    const playlistData = await response.json();
    return NextResponse.json(playlistData); // 성공적으로 데이터 반환
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
