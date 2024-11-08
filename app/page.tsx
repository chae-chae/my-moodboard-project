// app/page.tsx
import PlaylistMoodboard from "./components/PlaylistMoodboard";
import CreatePlaylistForm from "./components/CreatePlaylistForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-center text-4xl font-bold py-10">
        My Spotify Moodboard
      </h1>
      <div className="container mx-auto px-4">
        <CreatePlaylistForm />
        <PlaylistMoodboard />
      </div>
    </main>
  );
}
