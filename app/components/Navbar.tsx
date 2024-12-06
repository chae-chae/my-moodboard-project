"use client";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-teal-500 py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Spotify Moodboard</h1>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}
