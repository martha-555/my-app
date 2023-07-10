/** @format */

import { useContext, useEffect } from "react";
import { TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";
type Props = {
  tracks: TrackData[];
  error: string;
};

const Tracklist = ({  tracks, error }: Props) => {
  const { setTracklist } = useContext(PlayerContext);
  useEffect(() => {
    setTracklist(tracks);
  }, [tracks]);
  return (
    <div className={classes.container}>
      {/* {tracks.map((item) => (
        <Track track={item} key={item.id} />
      ))} */}
          {tracks.length  > 0 ? (
        tracks?.map((item) => (
          <Track track={item} key={item.id}/> 
        ))
      ) : (
        <div>{error} </div>
      )}
    </div>
  );
};

export default Tracklist;
