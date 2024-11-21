// app/moodboard/page.tsx
import { cookies } from "next/headers";
import { fetchSpotifyPlaylist, fetchAudioFeatures } from "../../lib/spotify";
import PlaylistMoodboard from "../components/PlaylistMoodboard";

export default async function MoodboardPage() {
  const cookieStore = await cookies(); // cookies()를 비동기적으로 처리
  const accessToken = cookieStore.get("spotifyAccessToken")?.value;

  if (!accessToken) {
    return <div>Access token is missing. Please log in.</div>;
  }

  const playlistId = "YOUR_PLAYLIST_ID"; // 여기에는 실제 플레이리스트 ID를 입력하세요
  const playlist = await fetchSpotifyPlaylist(accessToken, playlistId);

  const trackIds = playlist.tracks.items.map((item: any) => item.track.id);
  const audioFeatures = await fetchAudioFeatures(accessToken, trackIds);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Moodboard</h1>
      <PlaylistMoodboard playlist={playlist} audioFeatures={audioFeatures} />
    </div>
  );
}
