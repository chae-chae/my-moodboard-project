// app/api/user/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // 1. 인증 토큰 가져오기
  const authResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`
  );
  const { access_token } = await authResponse.json();

  // 2. Spotify API에서 사용자 정보 가져오기
  const userResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const userData = await userResponse.json();

  return NextResponse.json(userData);
}
