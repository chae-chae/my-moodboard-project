// components/TrackPopup.tsx
interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  previewUrl: string;
}

interface TrackPopupProps {
  track: Track | null;
  onClose: () => void;
}

const TrackPopup: React.FC<TrackPopupProps> = ({ track, onClose }) => {
  if (!track) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()} // 부모 클릭 이벤트 막기
      >
        <button
          className="text-red-500 font-bold text-right w-full"
          onClick={onClose}
        >
          Close
        </button>
        <img
          src={track.imageUrl}
          alt={track.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h2 className="text-lg font-bold">{track.name}</h2>
        <p className="text-sm">{track.artist}</p>
        <p className="text-sm">{track.album}</p>
        {track.previewUrl && (
          <audio controls className="mt-4 w-full">
            <source src={track.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default TrackPopup;
