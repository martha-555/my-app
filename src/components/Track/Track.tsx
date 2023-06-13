/** @format */

import { useContext } from "react";
import { TrackData } from "../../types/deezer";

import { formatSeconds } from "../../utils/time";
import PlayButton from "../PlayButton/PlayButton";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";

type Props = {
  track: TrackData;
};

const Track = ({ track }: Props) => {
  const { play, currentTrack, pause, togglePlay } = useContext(PlayerContext);

  return (
    <div
      className={classes.container}
      onClick={() =>
        currentTrack?.id === track.id ? togglePlay() : play(track.id)
      }
    >
      <img className={classes.cover} src={track.album.cover} />
      <div className={classes.mainInfo}>
        <span>{track.title}</span>
        <span>{track.artist.name}</span>
      </div>
      <div className={classes.duration}>{formatSeconds(track.duration)}</div>
      {/* <PlayButton atr={`${track.title} ${track.artist.name}`} /> */}
    </div>
  );
};

export default Track;
