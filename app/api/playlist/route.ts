// app/api/playlist/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // 1. 인증 토큰 가져오기
  const authResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`
  );
  const { access_token } = await authResponse.json();

  // 2. Spotify API에서 플레이리스트 가져오기
  const playlistResponse = await fetch(
    "https://api.spotify.com/v1/me/playlists",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const playlistData = await playlistResponse.json();

  return NextResponse.json(playlistData);
}
