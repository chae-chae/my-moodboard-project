"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    // URL에서 Access Token 파싱
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // '#' 뒤의 값 처리
    const accessToken = params.get("access_token");

    if (accessToken) {
      // Access Token을 쿠키에 저장
      document.cookie = `spotifyAccessToken=${accessToken}; path=/; max-age=3600`;

      // Moodboard 페이지로 이동
      router.push("/moodboard");
    } else {
      console.error("Access token is missing");
    }
  }, [router]);

  return <div>Processing authentication...</div>;
};

export default CallbackPage;
