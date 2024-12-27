// components/PlayButton.tsx

import React, { useEffect, useState } from "react";

interface PlayButtonProps {
  playlistId: string;
}

interface Device {
  id: string;
  name: string;
  is_active: boolean;
}

const PlayButton: React.FC<PlayButtonProps> = ({ playlistId }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch the list of devices
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`/api/spotify/devices`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
        const data = await response.json();
        setDevices(data.devices);
      } catch (error) {
        console.error("Error fetching devices:", error);
        alert("Failed to load devices. Please make sure Spotify is running.");
      }
    };

    fetchDevices();
  }, []);

  const playPlaylist = async () => {
    if (!playlistId || !selectedDevice) {
      alert("Please select a device first!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/spotify/play`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context_uri: `spotify:playlist:${playlistId}`,
          device_id: selectedDevice,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to play the playlist");
      }

      alert("Playlist started playing!");
    } catch (error) {
      console.error("Error playing playlist:", error);
      alert("Failed to start playing the playlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {/* Device Selection Dropdown */}
      {devices.length > 0 && (
        <select
          className="border border-gray-300 rounded px-4 py-2 mb-4"
          value={selectedDevice || ""}
          onChange={(e) => setSelectedDevice(e.target.value)}
        >
          <option value="" disabled>
            Select a device
          </option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.name} {device.is_active ? "(Active)" : ""}
            </option>
          ))}
        </select>
      )}

      {/* Play Button */}
      <button
        onClick={playPlaylist}
        disabled={loading || !selectedDevice}
        className={`${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-400"
        } text-white font-bold py-2 px-4 rounded transition`}
      >
        {loading ? "Loading..." : "Play Playlist"}
      </button>
    </div>
  );
};

export default PlayButton;
