import React from "react";

interface ModalProps {
  isOpen: boolean;
  track: {
    id: string;
    name: string;
    artist: string;
    album: string;
    imageUrl: string;
    previewUrl: string;
  } | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, track, onClose }) => {
  if (!isOpen || !track) return null; // 모달이 닫혀있거나 트랙 정보가 없으면 렌더링하지 않음

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div
        className="bg-gray-900 text-white p-8 rounded-lg shadow-lg relative max-w-lg w-full"
        style={{
          background: `url(${track.imageUrl}) center/cover`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold">{track.name}</h2>
        <p className="text-lg">{track.artist}</p>
        <p className="text-sm text-gray-400 mb-4">{track.album}</p>
        {track.previewUrl ? (
          <audio controls className="w-full mt-4">
            <source src={track.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p className="text-gray-500 mt-4">No preview available</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
