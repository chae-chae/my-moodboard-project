// app/api/playlistAudioFeatures/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const playlistId = request.url.split("?playlistId=")[1]; // 쿼리에서 playlistId를 추출합니다.

  const authResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`
  );
  const { access_token } = await authResponse.json();

  // 1. 플레이리스트의 트랙 가져오기
  const trackResponse = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const trackData = await trackResponse.json();
  const trackIds = trackData.items.map((item: any) => item.track.id).join(",");

  // 2. 트랙의 오디오 특징 가져오기
  const audioFeaturesResponse = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const audioFeatures = await audioFeaturesResponse.json();

  return NextResponse.json(audioFeatures);
}
