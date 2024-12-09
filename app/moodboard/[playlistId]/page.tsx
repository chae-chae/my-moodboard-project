import { useEffect, useState } from "react";
import PlaylistHeader from "./components/PlaylistHeader";
import TrackCard from "./components/TrackCard";

interface PlaylistData {
  name: string;
  description: string;
  imageUrl: string;
  tracks: Track[];
}

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  previewUrl: string; // Spotify에서 제공하는 미리 듣기 URL
}

export default function MoodboardPage({
  params: { playlistId },
}: {
  params: { playlistId: string };
}) {
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await fetch(`/api/spotify/playlist/${playlistId}`);
        const data = await response.json();

        setPlaylistData({
          name: data.name,
          description: data.description,
          imageUrl: data.images[0]?.url,
          tracks: data.tracks.items.map((item: any) => ({
            id: item.track.id,
            name: item.track.name,
            artist: item.track.artists[0].name,
            album: item.track.album.name,
            imageUrl: item.track.album.images[0]?.url,
            previewUrl: item.track.preview_url,
          })),
        });
      } catch (error) {
        console.error("Failed to fetch playlist data:", error);
      }
    };

    fetchPlaylistData();
  }, [playlistId]);

  if (!playlistData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <PlaylistHeader
        name={playlistData.name}
        description={playlistData.description}
        imageUrl={playlistData.imageUrl}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {playlistData.tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
