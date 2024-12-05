import { cookies } from "next/headers";
import { fetchSpotifyPlaylist, fetchAudioFeatures } from "../../lib/spotify";
import PlaylistMoodboard from "../components/PlaylistMoodboard";

export default async function Page() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("spotifyAccessToken")?.value;

  console.log("Access Token:", accessToken); // 디버깅용

  const playlistId =
    process.env.SPOTIFY_PLAYLIST_ID || "3cEYpjA9oz9GiPac4AsH4n";

  if (!accessToken) {
    return <div>Access token is missing. Please log in.</div>;
  }

  try {
    // Spotify Playlist 및 Audio Features 가져오기
    const playlist = await fetchSpotifyPlaylist(accessToken, playlistId);
    console.log("Fetched Playlist:", playlist); // 디버깅용

    const audioFeatures = await fetchAudioFeatures(accessToken, playlist);
    console.log("Fetched Audio Features:", audioFeatures); // 디버깅용

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
