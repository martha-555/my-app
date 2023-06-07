/** @format */

import { ReactElement, createContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import useGetMp3 from "../api/hooks/youtube/useGetMp3";
import { formatSeconds } from "../../utils/time";


type PlayerContextType = {
  play: (id: number) => void;
  pause: () => void;
  next: () => void;
  back: () => void;
  rewind: () => number | void;
  setTracklist: (tracks: TrackData[]) => void;
  currentTrack: TrackData | null;
  togglePlay: () => void;
  paused: boolean;
  currentTime: () => any;
  subtractTime: string|null;
};

export const PlayerContext = createContext<PlayerContextType>({
  play: () => {},
  pause: () => {},
  next: () => {},
  back: () => {},
  rewind: () => {},
  setTracklist: () => {},
  currentTrack: null,
  togglePlay: () => {},
  paused: true,
  currentTime: () => {},
  subtractTime:''
});

const audio:any = new Audio();

const PlayerProvider = (props: { children: ReactElement }) => {
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [currentTrack, setCurrentTrack] = useState<TrackData | null>(null);
  const [paused, setPaused] = useState(true);
  const getMp3 = useGetMp3();
  const [currentTime, setCurrentTime] = useState<string>(
    formatSeconds(audio.currentTime)
  );
  const [subtractTime, setSubtractTime] = useState('');

  useEffect((()=> {
   if (currentTrack) setSubtractTime ( formatSeconds(currentTrack.duration - audio.currentTime));
  }),[audio.currentTime])

 
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

 
  useEffect(() => {
    audio.onpause = () => setPaused(true);
    audio.onplay = () => setPaused(false);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        play: (id) => {
          setCurrentTrack(tracks.find((item) => item.id === id) || null);
        },
        pause: () => {
          audio.pause();
        },

        next: () => {
          let index =
            tracks.findIndex((item) => currentTrack?.id === item.id) + 1;
          if (index > tracks.length - 1) index = 0;
          setCurrentTrack(tracks[index]);
        },
        back: () => {
          let index =
            tracks.findIndex((item) => currentTrack?.id === item.id) - 1;
          index--;
          if (index < 0) index = tracks.length - 1;
          setCurrentTrack(tracks[index]);
        },
        rewind: () => {
          // audio.currentTime += 15;
        },
        subtractTime,

        setTracklist: (items) => {
          setTracks(items);
        },
        currentTrack,
        togglePlay: () => {
          if (currentTrack) {
            audio.paused ? audio.play() : audio.pause();
          }
        },
        paused,
        currentTime: () => {
          setInterval(() => {
            setCurrentTime(formatSeconds(audio.currentTime));
          }, 1000);
          return currentTime;
        },
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
