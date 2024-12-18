import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        console.error("Authorization code not found.");
        return;
      }

      try {
        const response = await fetch("/api/auth/spotify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Access Token:", data.access_token);
          // 성공 시 홈으로 리다이렉트
          router.push("/");
        } else {
          console.error("Failed to fetch tokens.");
        }
      } catch (error) {
        console.error("Error during callback:", error);
      }
    };

    handleCallback();
  }, [router]);

  return <div>Processing Spotify login...</div>;
};

export default CallbackPage;
