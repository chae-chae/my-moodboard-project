// app/components/SpotifyLoginButton.tsx
import React from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const SCOPE = "user-library-read playlist-read-private";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI || ""
)}&scope=${encodeURIComponent(SCOPE)}`;

const SpotifyLoginButton: React.FC = () => {
  return (
    <a
      href={AUTH_URL}
      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
    >
      Login with Spotify
    </a>
  );
};

export default SpotifyLoginButton;
