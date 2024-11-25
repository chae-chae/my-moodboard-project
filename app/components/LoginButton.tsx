"use client";

const LoginButton = () => {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const redirectUri = "http://localhost:3000/callback"; // 클라이언트 라우트로 변경
    const scopes = [
      "playlist-read-private",
      "playlist-read-collaborative",
    ].join(" ");

    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = spotifyAuthUrl; // Spotify 로그인 페이지로 리디렉션
  };

  return <button onClick={handleLogin}>Login with Spotify</button>;
};

export default LoginButton;
