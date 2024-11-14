// app/login/page.tsx
"use client";

import SpotifyLoginButton from "../components/SpotifyLoginButton";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 to-blue-500">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to Moodboard
        </h1>
        <p className="text-white mb-10">
          Sign in to view your personalized playlist moodboard.
        </p>
        <SpotifyLoginButton />
      </div>
    </div>
  );
}
