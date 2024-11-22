"use client";

export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  return <button onClick={handleLogin}>Log in with Spotify</button>;
}
