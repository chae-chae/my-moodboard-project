import { NextResponse } from "next/server";

export async function GET() {
  const scope = ["playlist-read-private", "playlist-read-collaborative"].join(
    " "
  );

  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    response_type: "token",
    redirect_uri: "http://localhost:3000/api/auth/callback",
    scope,
  });

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return NextResponse.redirect(spotifyAuthUrl);
}
