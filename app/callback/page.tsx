// app/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "")).get(
      "access_token"
    );

    if (token) {
      sessionStorage.setItem("spotifyAccessToken", token);
      router.push("/"); // 인증 후 홈 화면으로 리디렉션
    } else {
      router.push("/"); // 토큰이 없으면 홈 화면으로 리디렉션
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Logging in...</p>
    </div>
  );
}
