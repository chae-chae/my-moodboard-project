"use client";

import { useEffect, useState } from "react";
import { themes } from "../../../lib/themes";
import PlaylistHeader from "./components/PlaylistHeader";
import ThemePreview from "./components/ThemePreview";
import TrackList from "./components/TrackList";
import TrackPopup from "./components/TrackPopup";

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
  previewUrl: string;
}

interface Theme {
  background: string;
  text: string;
  card: string;
  highlight: string;
}

export default function MoodboardPage({
  params,
}: {
  params: { playlistId: string };
}) {
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [themeName, setThemeName] = useState<keyof typeof themes>("dark");
  const [customThemes, setCustomThemes] = useState<{ [key: string]: Theme }>(
    {}
  );
  const [popupTrack, setPopupTrack] = useState<Track | null>(null); // 트랙 팝업 상태
  const currentTheme = themes[themeName] || customThemes[themeName];

  useEffect(() => {
    if (params?.playlistId) {
      setPlaylistId(params.playlistId);
    }
  }, [params]);

  useEffect(() => {
    if (!playlistId) return;

    const fetchPlaylistData = async () => {
      try {
        const response = await fetch(`/api/spotify/playlist/${playlistId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setPlaylistData({
          name: data.name,
          description: data.description,
          imageUrl: data.images[0]?.url || "",
          tracks: data.tracks.items.map((item: any) => {
            const track = item.track;
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0]?.name || "Unknown Artist",
              album: track.album.name || "Unknown Album",
              imageUrl: track.album.images[0]?.url || "",
              previewUrl: track.preview_url || "",
            };
          }),
        });
      } catch (error) {
        console.error("Failed to fetch playlist data:", error);
      }
    };

    fetchPlaylistData();
  }, [playlistId]);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedTracks = Array.from(playlistData?.tracks || []);
    const [reorderedItem] = updatedTracks.splice(result.source.index, 1);
    updatedTracks.splice(result.destination.index, 0, reorderedItem);

    setPlaylistData((prev) =>
      prev ? { ...prev, tracks: updatedTracks } : prev
    );
  };

  const openPopup = (track: Track) => {
    setPopupTrack(track);
  };

  const closePopup = () => {
    setPopupTrack(null);
  };

  if (!playlistData) {
    return (
      <div className="text-center" style={{ color: currentTheme.text }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
      }}
    >
      {/* 플레이리스트 헤더 */}
      <PlaylistHeader
        name={playlistData.name}
        description={playlistData.description}
        imageUrl={playlistData.imageUrl}
      />

      {/* 테마 미리보기 */}
      <ThemePreview
        currentThemeName={themeName}
        customThemes={customThemes}
        onThemeSelect={(theme) => setThemeName(theme as keyof typeof themes)}
      />

      {/* 드래그 앤 드롭 트랙 리스트 */}
      <TrackList
        tracks={playlistData.tracks}
        theme={currentTheme}
        onDragEnd={handleOnDragEnd}
        onTrackClick={openPopup}
      />

      {/* 트랙 팝업 */}
      <TrackPopup track={popupTrack} onClose={closePopup} />
    </div>
  );
}
