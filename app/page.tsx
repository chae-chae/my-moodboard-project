// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PlaylistMoodboard from "./components/PlaylistMoodboard";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    // 로그인이 안 되어 있으면 로그인 페이지로 리디렉션
    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);

  // 로그인 후에만 Moodboard 페이지 표시
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <PlaylistMoodboard />
    </main>
  );
}
