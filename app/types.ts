// app/types.ts
export interface Playlist {
  id: string;
  name: string;
  tracks: {
    items: {
      track: {
        id: string;
        name: string;
        artists: { name: string }[];
        album: {
          images: { url: string }[];
        };
      };
    }[];
  };
}

export interface AudioFeatures {
  [trackId: string]: {
    valence: number;
    energy: number;
  };
}
