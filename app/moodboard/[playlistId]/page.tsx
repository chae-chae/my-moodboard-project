"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { themes } from "../../../lib/themes";

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
  const [newTheme, setNewTheme] = useState<Theme>({
    background: "#ffffff",
    text: "#000000",
    card: "#f5f5f5",
    highlight: "#6200ee",
  });
  const [customThemeName, setCustomThemeName] = useState("");
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

  // 드래그 앤 드롭 핸들러
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedTracks = Array.from(playlistData?.tracks || []);
    const [reorderedItem] = updatedTracks.splice(result.source.index, 1);
    updatedTracks.splice(result.destination.index, 0, reorderedItem);

    setPlaylistData((prev) =>
      prev ? { ...prev, tracks: updatedTracks } : prev
    );
  };

  const handleCustomThemeChange = (key: keyof Theme, value: string) => {
    setNewTheme((prev) => ({ ...prev, [key]: value }));
  };

  const addCustomTheme = () => {
    if (!customThemeName.trim()) {
      alert("Please enter a theme name!");
      return;
    }
    setCustomThemes((prev) => ({
      ...prev,
      [customThemeName]: newTheme,
    }));
    setCustomThemeName("");
    setNewTheme({
      background: "#ffffff",
      text: "#000000",
      card: "#f5f5f5",
      highlight: "#6200ee",
    });
    alert(`Custom theme "${customThemeName}" added!`);
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
        <div className="mt-4">
          {Object.keys({ ...themes, ...customThemes }).map((theme) => (
            <button
              key={theme}
              onClick={() => setThemeName(theme as keyof typeof themes)}
              className="mx-2 px-4 py-2 rounded"
              style={{
                backgroundColor:
                  themeName === theme
                    ? currentTheme.highlight
                    : currentTheme.card,
                color:
                  themeName === theme
                    ? currentTheme.text
                    : currentTheme.background,
              }}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-8 text-left">
          <h2 className="text-lg font-bold">Create Custom Theme</h2>
          <input
            type="text"
            placeholder="Theme Name"
            value={customThemeName}
            onChange={(e) => setCustomThemeName(e.target.value)}
            className="block p-2 rounded border border-gray-300 mt-2"
          />
          {["background", "text", "card", "highlight"].map((key) => (
            <div key={key} className="mt-4">
              <label className="block mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                type="color"
                value={(newTheme as any)[key]}
                onChange={(e) =>
                  handleCustomThemeChange(key as keyof Theme, e.target.value)
                }
                className="w-full"
              />
            </div>
          ))}
          <button
            onClick={addCustomTheme}
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
          >
            Add Theme
          </button>
        </div>
      </header>
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
                      className="p-4 rounded-lg shadow-lg hover:shadow-xl transition"
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
    </div>
  );
}
