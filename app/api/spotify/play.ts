// pages/api/spotify/play.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "../../../lib/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { uris, context_uri, device_id } = req.body;

  try {
    const response = await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris, // 트랙 URI 리스트
        context_uri, // 재생할 플레이리스트 URI
        device_id, // 선택된 기기
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to play");
    }

    return res.status(204).send(""); // No Content
  } catch (error) {
    console.error("Error playing:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
