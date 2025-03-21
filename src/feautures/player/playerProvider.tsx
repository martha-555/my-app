/** @format */

import { ReactElement, createContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import { getFormattedTime } from "../../utils/getFormattedTime";
import useGetMp3 from "../../apiHooks/hooks/youtube/useGetMp3";

type PlayerContextType = {
  play: (id: number) => void;
  pause: () => void;
  next: () => void;
  back: () => void;
  rewind: (eventValue: number) => void;
  setTracklist: (tracks: TrackData[]) => void;
  currentTrack: TrackData | null;
  currentInputValue: number;
  togglePlay: () => void;
  paused: boolean;
  currentTime: () => number | string;
  subtractTime: string | null;
};

export const PlayerContext = createContext<PlayerContextType>({
  play: () => {},
  pause: () => {},
  next: () => {},
  back: () => {},
  rewind: () => {},
  setTracklist: () => {},
  currentTrack: null,
  currentInputValue: 0,
  togglePlay: () => {},
  paused: true,
  currentTime: () => {
    return "";
  },

  subtractTime: "",
});

const audio: HTMLAudioElement = new Audio();

const PlayerProvider = (props: { children: ReactElement }) => {
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [currentTrack, setCurrentTrack] = useState<TrackData | null>(null);
  const [paused, setPaused] = useState(true);
  const [getMp3] = useGetMp3();
  const [currentTime, setCurrentTime] = useState<string | number>(
    audio.currentTime
  );
  const [subtractTime, setSubtractTime] = useState("");
  const [currentInputValue, setCurrentInputValue] = useState(0);

  useEffect(() => {
    if (currentTrack) {
      setSubtractTime(
        getFormattedTime(currentTrack.duration - audio.currentTime)
      );
      setCurrentInputValue((audio.currentTime / currentTrack.duration) * 100);
    }
  }, [audio.currentTime]);

  useEffect(() => {
    const callBack = async () => {
      const response = await getMp3(
        `${currentTrack?.artist.name} ${currentTrack?.title}`
      );

      if (response) audio.src = response;
      const playPromise = audio.play();

      if (playPromise !== undefined || null) {
        playPromise
          .then((_) => {
            audio.play();
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
          if (currentTrack && audio.readyState === 4) audio.pause();
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
          if (index < 0) index = tracks.length - 1;
          setCurrentTrack(tracks[index]);
        },
        rewind: (eventValue) => {
          if (currentTrack)
            audio.currentTime = (currentTrack?.duration * eventValue) / 100;
        },
        subtractTime,

        setTracklist: (items) => {
          setTracks(items);
        },
        currentTrack,
        togglePlay: () => {
          if (currentTrack && audio.readyState === 4) {
            audio.paused ? audio.play() : audio.pause();
          }
        },
        paused,
        currentInputValue,
        currentTime: () => {
          setInterval(() => {
            setCurrentTime(getFormattedTime(audio.currentTime));
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
