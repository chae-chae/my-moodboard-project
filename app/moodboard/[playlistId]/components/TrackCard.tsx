interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  previewUrl: string;
}

export default function TrackCard({ track }: { track: Track }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <img
        src={track.imageUrl}
        alt={track.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-4">
        <h2 className="text-lg font-bold">{track.name}</h2>
        <p className="text-gray-400">
          {track.artist} - <span>{track.album}</span>
        </p>
        {track.previewUrl && (
          <audio controls src={track.previewUrl} className="mt-2 w-full">
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
}
