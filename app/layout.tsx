import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Moodboard",
  description: "Generate moodboards for Spotify playlists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#121212] text-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-[#1DB954] text-black p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <a href="/" className="hover:text-black">
                Spotify Moodboard
              </a>
            </h1>
            <nav>
              <a
                href="/"
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                aria-label="Go to home"
              >
                Home
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-8">{children}</main>

        {/* Footer */}
        <footer className="bg-[#1DB954] py-4 text-center">
          <p className="text-black text-sm font-medium">
            © 2024 Spotify Moodboard. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
