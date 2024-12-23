import React, { useState, useEffect } from "react";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 500); // 애니메이션 후 모달 제거
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`relative w-80 h-80 md:w-96 md:h-96 bg-cover bg-center rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 ease-out ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        style={{
          backgroundImage: `url(${track?.imageUrl})`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 반투명 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-between p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl"
          >
            ✕
          </button>

          {/* 콘텐츠 */}
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <h2 className="text-xl md:text-2xl font-bold">{track?.name}</h2>
            <p className="text-sm md:text-base text-gray-300 mt-2">
              {track?.artist}
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              {track?.album}
            </p>
          </div>

          {/* 오디오 프리뷰 */}
          {track?.previewUrl ? (
            <audio controls className="w-full mt-4">
              <source src={track.previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p className="text-gray-400 text-center mt-4">
              No preview available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
