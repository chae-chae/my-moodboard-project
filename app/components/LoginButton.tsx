"use client";

export default function LoginButton() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scope = encodeURIComponent(
      "playlist-read-private playlist-read-collaborative"
    );

    if (!clientId || !redirectUri) {
      console.error("Missing Spotify Client ID or Redirect URI");
      return;
    }

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}`;

    window.location.href = authUrl; // Spotify 인증 URL로 이동
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-[#1DB954] text-black px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#1ED760] transition"
    >
      Log in with Spotify
    </button>
  );
}
