import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch public access token" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json({ accessToken: data.access_token });
}
