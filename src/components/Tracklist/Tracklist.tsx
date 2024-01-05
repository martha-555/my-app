/** @format */

import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { useInView } from "react-intersection-observer";

type Props = {
  tracks: TrackData[] | null;
  nextTracks?: Function;
  emptyState: ReactNode;
  isLoading?: boolean;
};

const Tracklist = ({ tracks, nextTracks, emptyState, isLoading }: Props) => {
  const { ref, inView } = useInView({
    threshold: 1.0,
    // triggerOnce: true,
  });

  useEffect(() => {
    if (inView && nextTracks) nextTracks();
  }, [inView]);

  return (
    <div className={classes.tracklistContainer}>
      { tracks?.map((item) => (
        <Track key={item.id} ref={ref} track={item} />
      ))}
      {tracks?.length == 0  ? emptyState : null}
    </div>
  );
};

export default Tracklist;
