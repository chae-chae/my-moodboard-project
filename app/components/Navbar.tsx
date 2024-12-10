import LoginButton from "./LoginButton";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-teal-500 py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Spotify Moodboard</h1>
        <div className="flex items-center space-x-4">
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}
