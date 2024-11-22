import { cookies } from "next/headers";
import { fetchSpotifyPlaylist, fetchAudioFeatures } from "../../lib/spotify";
import PlaylistMoodboard from "../components/PlaylistMoodboard";

export default async function MoodboardPage() {
  const cookieStore = await cookies(); // 'await' 추가
  const accessToken = cookieStore.get("spotifyAccessToken")?.value;

  if (!accessToken) {
    return <div>Access token is missing. Please log in.</div>;
  }

  const playlistId = "YOUR_PLAYLIST_ID"; // 실제 Playlist ID로 교체

  try {
    const playlist = await fetchSpotifyPlaylist(accessToken, playlistId);

    if (!playlist.tracks || playlist.tracks.items.length === 0) {
      return <div>No tracks available in the playlist.</div>;
    }

    const trackIds = playlist.tracks.items.map(
      (item: { track: { id: string } }) => item.track.id
    );

    const audioFeatures = await fetchAudioFeatures(accessToken, trackIds);

    return (
      <PlaylistMoodboard playlist={playlist} audioFeatures={audioFeatures} />
    );
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return <div>Failed to load playlist. Please try again later.</div>;
  }
}
