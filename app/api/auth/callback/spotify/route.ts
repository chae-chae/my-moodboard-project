import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/?error=missing_code");
  }

  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/spotify`,
    }).toString(),
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );
  const data = await response.json();

  if (!data.access_token) {
    return NextResponse.redirect("/?error=missing_access_token");
  }

  // 액세스 토큰을 쿠키에 저장
  const nextResponse = NextResponse.redirect("/moodboard");
  nextResponse.cookies.set("spotifyAccessToken", data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: data.expires_in, // 토큰 만료 시간 설정
    path: "/",
  });

  return nextResponse;
}
