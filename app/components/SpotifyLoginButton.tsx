// app/components/SpotifyLoginButton.tsx
"use client"; // 클라이언트 전용 컴포넌트로 지정

import React from "react";

const SpotifyLoginButton: React.FC = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI =
    process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ||
    "http://localhost:3000/callback";
  const SCOPE =
    process.env.NEXT_PUBLIC_SPOTIFY_SCOPE ||
    "user-read-private user-read-email playlist-read-private";

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPE)}`;

  return (
    <div className="flex justify-center items-center h-screen">
      <a
        href={AUTH_URL}
        className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition"
      >
        Login with Spotify
      </a>
    </div>
  );
};

export default SpotifyLoginButton;
