/** @format */

import { TrackData } from "../../types/deezer";
import { formatSeconds } from "../../utils/time";
import classes from "./styles.module.scss";

type Props = {
  track: TrackData;
};

const Track = ({ track }: Props) => {
  return (
    <div className={classes.container}>
      <img className={classes.cover} src={track.album.cover} />
      <div className={classes.mainInfo}>
        <span>{track.title}</span>
        <span>{track.artist.name}</span>
      </div>
      <div className={classes.duration}>{formatSeconds(track.duration)}</div>
    </div>
  );
};

export default Track;
