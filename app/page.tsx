import PlaylistForm from "./components/PlaylistForm";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-[#282828] shadow-xl rounded-lg max-w-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-[#1DB954]">Spotify Moodboard</h1>
        <p className="text-gray-300 mt-4">
          Enter a Spotify Playlist ID to generate a moodboard that matches the
          vibe of your playlist.
        </p>
        <PlaylistForm />
      </div>
    </div>
  );
}
