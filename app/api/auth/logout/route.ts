import { NextResponse } from "next/server";

export async function GET() {
  // 쿠키에서 Access Token 제거
  const response = NextResponse.redirect("/");
  response.cookies.set("spotifyAccessToken", "", { maxAge: -1 }); // 쿠키 제거
  return response;
}
