import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    return NextResponse.json({ access_token: accessToken });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to get Access Token", details: error.message },
      { status: 500 }
    );
  }
}
