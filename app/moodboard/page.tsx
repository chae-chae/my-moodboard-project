import { cookies } from "next/headers";
import { fetchSpotifyPlaylist, fetchAudioFeatures } from "../../lib/spotify";
import PlaylistMoodboard from "../components/PlaylistMoodboard";

export default async function Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("spotifyAccessToken")?.value;

  console.log("Access Token:", accessToken);

  // playlistId를 환경 변수에서 가져오거나 기본값 설정
  const playlistId =
    process.env.SPOTIFY_PLAYLIST_ID || "3cEYpjA9oz9GiPac4AsH4n";

  if (!accessToken) {
    return <div>Access token is missing. Please log in.</div>;
  }

  try {
    const playlist = await fetchSpotifyPlaylist(accessToken, playlistId);
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
