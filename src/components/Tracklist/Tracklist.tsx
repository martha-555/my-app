/** @format */

import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";

type Props = {
  tracks: TrackData[];
  nextTracks: () => void;
  emptyState: ReactNode;
};

const Tracklist = ({ tracks, nextTracks, emptyState }: Props) => {
  const { setTracklist } = useContext(PlayerContext);
  const [isVisible, setIsvisible] = useState<boolean>(false);
  const ref = useRef(null);

  useEffect(() => {
    setTracklist(tracks);
  }, [tracks]);


  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };
  const callback = (entries: any) => {
    const [entry] = entries;
    // console.log(entry.isIntersecting)
    setIsvisible(entry.isIntersecting)
  };

  useEffect(() => {
    var observer = new IntersectionObserver(callback, options);
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  },[ref.current,options,isVisible])

useEffect(() => {
// console.log(isVisible)
  if (isVisible) nextTracks()
},[isVisible])

  return (
    <div className={classes.tracklistContainer}>
      <div className={classes.allTracks}>
        {tracks?.map((item) => (
          <Track ref={ref} key={item.id} track={item} />
        ))}
        {tracks?.length == 0 ? emptyState : null}
      </div>
    </div>
  );
};

export default Tracklist;
