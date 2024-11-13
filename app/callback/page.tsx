// app/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "?")).get(
      "access_token"
    );

    if (token) {
      localStorage.setItem("spotify_access_token", token); // 토큰을 저장
      router.push("/moodboard"); // 무드보드 페이지로 이동
    }
  }, [router]);

  return <p>Loading...</p>;
}
