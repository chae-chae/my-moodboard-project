// app/components/SpotifyLoginButton.tsx
"use client";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const SCOPE = "user-library-read playlist-read-private";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI || ""
)}&scope=${encodeURIComponent(SCOPE)}`;

export default function SpotifyLoginButton() {
  return (
    <a
      href={AUTH_URL}
      className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-semibold shadow-lg hover:from-green-500 hover:to-green-700 transition-transform transform hover:scale-105"
    >
      Login with Spotify
    </a>
  );
}
