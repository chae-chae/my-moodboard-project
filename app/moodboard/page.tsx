import { cookies } from "next/headers";
import { fetchSpotifyPlaylist, fetchAudioFeatures } from "../../lib/spotify";
import PlaylistMoodboard from "../components/PlaylistMoodboard";

export default async function Page() {
  // 쿠키에서 Access Token 가져오기
  const cookieStore = await cookies(); // Promise를 await로 처리
  const accessToken = cookieStore.get("spotifyAccessToken")?.value;

  // Access Token 확인을 위한 디버깅 코드
  console.log("Access Token:", accessToken);

  if (!accessToken) {
    return <div>Access token is missing. Please log in.</div>;
  }

  try {
    // Spotify API에서 플레이리스트 가져오기
    const playlistId = "37i9dQZF1DXcBWIGoYBM5M"; // Spotify의 Top Hits 공개 플레이리스트

    const playlist = await fetchSpotifyPlaylist(accessToken, playlistId);

    // 트랙의 Audio Features 가져오기
    const audioFeatures = await fetchAudioFeatures(accessToken, playlist);

    return (
      <div>
        <PlaylistMoodboard playlist={playlist} audioFeatures={audioFeatures} />
      </div>
    );
  } catch (error) {
    console.error("Error in /moodboard/page.tsx:", error);
    return <div>Failed to load playlist. Please try again later.</div>;
  }
}
