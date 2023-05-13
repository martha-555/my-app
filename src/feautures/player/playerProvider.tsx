/** @format */

import { ReactElement, createContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import useGetMp3 from "../api/hooks/youtube/useGetMp3";

type PlayerContextType = {
  play: (id: number) => void;
  pause: () => void;
  next: () => void;
  setTracklist: (tracks: TrackData[]) => void;
  currentTrack: TrackData | null;
  togglePlay: () => void;
};

export const PlayerContext = createContext<PlayerContextType>({
  play: () => {},
  pause: () => {},
  next: () => {},
  setTracklist: () => {},
  currentTrack: null,
  togglePlay: () => {},
});

const audio = new Audio();

const PlayerProvider = (props: { children: ReactElement }) => {
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [currentTrack, setCurrentTrack] = useState<TrackData | null>(null);
  const getMp3 = useGetMp3();

  useEffect(() => {
    const callBack = async () => {
      const response = await getMp3(
        `${currentTrack?.artist.name} ${currentTrack?.title}`
      );
      const json = await response.json();
      audio.src = json.data.mp3;
      audio.play();
    };
    currentTrack && callBack();
  }, [currentTrack]);

  return (
    <PlayerContext.Provider
      value={{
        play: (id) => {
          setCurrentTrack(tracks.find((item) => item.id === id) || null);
        },
        pause: () => {
          audio.pause();
        },
        next: () => {},
        setTracklist: (items) => {
          setTracks(items);
        },
        currentTrack,
        togglePlay: () => {
          audio.paused ? audio.play() : audio.pause();
        },
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
