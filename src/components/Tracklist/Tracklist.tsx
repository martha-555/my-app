/** @format */

import { ReactNode, useContext, useEffect } from "react";
import { TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { useInView } from "react-intersection-observer";
import { PlayerContext } from "../../feautures/player/playerProvider";

type Props = {
  tracks: TrackData[];
  nextTracks?: Function;
  emptyState: ReactNode;
};

const Tracklist = ({ tracks, nextTracks, emptyState }: Props) => {
  const { ref, inView } = useInView({
    threshold: 1.0,
    // triggerOnce: true,
  });

  const { setTracklist } = useContext(PlayerContext);
  useEffect(() => {
    setTracklist(tracks);
  }, [tracks]);

  useEffect(() => {
    if (inView && nextTracks) nextTracks();
  }, [inView]);

  useEffect(() => {
    // console.log({ tracks });
  }, []);

  return (
    <div className={classes.tracklistContainer}>
      {tracks?.map((item) => (
        <Track key={item.id} ref={ref} track={item} />
      ))}
      {tracks?.length == 0 ? emptyState : null}
    </div>
  );
};

export default Tracklist;
