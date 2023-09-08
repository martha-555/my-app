/** @format */

import { useContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";
import { useSearchParams } from "react-router-dom";
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
        <div key={item.id}>
          <Track track={item}  />
        </div>

      ))}
    </div>
  );
};

export default Tracklist;
