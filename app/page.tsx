// app/page.tsx
import PlaylistMoodboard from "./components/PlaylistMoodboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-center text-4xl font-bold py-10">
        My Spotify Moodboard
      </h1>
      <PlaylistMoodboard />
    </main>
  );
}
