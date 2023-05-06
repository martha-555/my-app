/** @format */

import { TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
type Props = {
  tracks: TrackData[];
};

const Tracklist = ({ tracks }: Props) => {
  return (
    <div className={classes.container}>
      {tracks.map((item) => (
        <Track track={item} key={item.id} />
      ))}
    </div>
  );
};

export default Tracklist;
