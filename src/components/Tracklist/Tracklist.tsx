/** @format */

import { ReactNode, useContext, useEffect, useRef } from "react";
import { TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { useInView } from "react-intersection-observer";
import { PlayerContext } from "../../feautures/player/playerProvider";

type Props = {
  tracks: TrackData[];
  nextTracks: Function;
  emptyState: ReactNode;
};

const Tracklist = ({ tracks, nextTracks, emptyState }: Props) => {

  const { setTracklist } = useContext(PlayerContext);

  useEffect(() => {
    setTracklist(tracks);
  }, [tracks]);

  const [ ref, inView ] = useInView({
    threshold: 1.0,
    // triggerOnce: true,
  });

  const  [ref2, inView2]  = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView || inView2) nextTracks();
  }, [inView, inView2]);


  return (
    <div ref={ref} className={classes.tracklistContainer}>
      {tracks?.map((item) => (
      <Track ref={ref2} key={item.id}  track={item} />))}
      {tracks?.length == 0 ? emptyState : null}
    </div>
  );
};

export default Tracklist;
