// app/api/createPlaylist/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, description, isPublic } = await request.json();

  // 1. 인증 토큰 가져오기
  const authResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`
  );
  const { access_token } = await authResponse.json();

  // 2. 사용자 ID 가져오기
  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`
  );
  const { id: userId } = await userResponse.json();

  // 3. Spotify API에서 새로운 플레이리스트 생성하기
  const createPlaylistResponse = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        public: isPublic,
      }),
    }
  );

  const playlistData = await createPlaylistResponse.json();

  return NextResponse.json(playlistData);
}
