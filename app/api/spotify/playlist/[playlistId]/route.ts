import { NextResponse } from "next/server";
import { getUserAccessToken } from "../../../utils/spotify-auth";

export async function GET(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  const { playlistId } = params;
  console.log("Received Playlist ID:", playlistId);

  try {
    // 사용자 Access Token 가져오기
    const accessToken = await getUserAccessToken(); // 새 함수 사용
    console.log("Access Token:", accessToken);

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access Token is missing or invalid" },
        { status: 401 }
      );
    }

    // Spotify API 호출
    const spotifyResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!spotifyResponse.ok) {
      const errorData = await spotifyResponse.json();
      return NextResponse.json(
        { error: "Failed to fetch playlist data", details: errorData },
        { status: spotifyResponse.status }
      );
    }

    const playlistData = await spotifyResponse.json();
    return NextResponse.json(playlistData);
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error },
      { status: 500 }
    );
  }
}
