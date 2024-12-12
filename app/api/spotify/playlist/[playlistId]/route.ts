import { NextResponse } from "next/server";
import { getPlaylist } from "@/lib/spotify";

export async function GET(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  const { playlistId } = params;

  try {
    const playlist = await getPlaylist(playlistId);
    return NextResponse.json(playlist);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch playlist data", details: error.message },
      { status: 500 }
    );
  }
}
