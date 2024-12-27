// pages/api/spotify/devices.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "../../../lib/spotify"; // 사용자의 액세스 토큰 가져오는 함수

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch devices");
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching devices:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
