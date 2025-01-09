"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { themes } from "../../../lib/themes";
import ThemePreview from "../[playlistId]/components/ThemePreview"; // 새로 추가된 컴포넌트 import

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
      <header className="text-center">
        <h1 className="text-4xl font-bold">{playlistData.name}</h1>
        <p className="text-gray-400">{playlistData.description}</p>
        {playlistData.imageUrl && (
          <img
            src={playlistData.imageUrl}
            alt={playlistData.name}
            className="w-64 h-64 mx-auto mt-4 rounded-lg shadow-lg"
          />
        )}
      </header>

      {/* 테마 미리보기 컴포넌트 */}
      <ThemePreview
        currentThemeName={themeName}
        customThemes={customThemes}
        onThemeSelect={(theme) => setThemeName(theme as keyof typeof themes)}
      />

      {/* 드래그 앤 드롭 */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tracks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            >
              {playlistData.tracks.map((track, index) => (
                <Draggable key={track.id} draggableId={track.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => openPopup(track)} // 팝업 열기
                      className="p-4 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
                      style={{
                        backgroundColor: currentTheme.card,
                        color: currentTheme.text,
                      }}
                    >
                      {track.imageUrl && (
                        <img
                          src={track.imageUrl}
                          alt={track.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h2 className="text-lg font-bold">{track.name}</h2>
                      <p className="text-sm">{track.artist}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {popupTrack && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()} // 부모 클릭 이벤트 막기
          >
            <button
              className="text-red-500 font-bold text-right w-full"
              onClick={closePopup}
            >
              Close
            </button>
            <img
              src={popupTrack.imageUrl}
              alt={popupTrack.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-bold">{popupTrack.name}</h2>
            <p className="text-sm">{popupTrack.artist}</p>
            <p className="text-sm">{popupTrack.album}</p>
            {popupTrack.previewUrl && (
              <audio controls className="mt-4 w-full">
                <source src={popupTrack.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
