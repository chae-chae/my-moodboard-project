// components/TrackList.tsx
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  previewUrl: string;
}

interface TrackListProps {
  tracks: Track[];
  theme: {
    card: string;
    text: string;
  };
  onDragEnd: (result: any) => void;
  onTrackClick: (track: Track) => void;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  theme,
  onDragEnd,
  onTrackClick,
}) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="tracks">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {tracks.map((track, index) => (
            <Draggable key={track.id} draggableId={track.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  onClick={() => onTrackClick(track)}
                  className="p-4 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
                  style={{
                    backgroundColor: theme.card,
                    color: theme.text,
                  }}
                >
                  {track.imageUrl && (
                    <img
                      src={track.imageUrl}
                      alt={track.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h2 className="text-lg font-bold">{track.name}</h2>
                  <p className="text-sm">{track.artist}</p>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

export default TrackList;
