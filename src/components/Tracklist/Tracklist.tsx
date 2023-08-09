/** @format */

import { useContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";
type Props = {
  tracks: TrackData[];
};

const Tracklist = ({ tracks }: Props) => {
  const { setTracklist } = useContext(PlayerContext);
  useEffect(() => {
    setTracklist(tracks);
  }, [tracks]);

  return (
    <div className={classes.container}>
      {tracks?.map((item) => (
        <Track track={item} key={item.id} />
      ))}
    </div>
  );
};

export default Tracklist;
