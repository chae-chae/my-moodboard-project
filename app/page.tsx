"use client";

import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  const fetchToken = async () => {
    const response = await fetch("/api/spotify-token");
    const data = await response.json();
    setToken(data.access_token);
  };
  console.log("token: ", token);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={fetchToken}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        Get Spotify Token
      </button>
      {token && <p className="mt-4">Token: {token}</p>}
    </div>
  );
}
