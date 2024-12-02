import { cookies } from "next/headers";
import { fetchSpotifyPlaylist, fetchAudioFeatures } from "../../lib/spotify";
import PlaylistMoodboard from "../components/PlaylistMoodboard";
import Link from "next/link";

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
        {/* Moodboard 컴포넌트 렌더링 */}
        <PlaylistMoodboard playlist={playlist} audioFeatures={audioFeatures} />

        {/* 로그아웃 버튼 */}
        <div className="mt-4">
          <Link href="/api/auth/logout">
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              로그아웃
            </button>
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in /moodboard/page.tsx:", error);
    return <div>Failed to load playlist. Please try again later.</div>;
  }
}
