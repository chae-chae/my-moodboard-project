import { NextResponse } from "next/server";
import fetch from "node-fetch";

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const tokenEndpoint = "https://accounts.spotify.com/api/token";

export async function POST() {
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch access token" },
      { status: 500 }
    );
  }

  const tokenData = await response.json();
  return NextResponse.json(tokenData);
}
