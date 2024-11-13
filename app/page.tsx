// app/page.tsx
"use client";

import SpotifyLoginButton from "./components/SpotifyLoginButton";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <SpotifyLoginButton />
    </div>
  );
}
