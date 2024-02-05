/** @format */

import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { useInView } from "react-intersection-observer";
import { PlayerContext } from "../../feautures/player/playerProvider";

type Props = {
  tracks: TrackData[];
  nextTracks: () => void;
  emptyState: ReactNode;
};

const Tracklist = ({ tracks, nextTracks, emptyState }: Props) => {
  const { setTracklist } = useContext(PlayerContext);
  const [isVisible, setIsvisible] = useState<boolean>(false);
  const rootRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    setTracklist(tracks);
  }, [tracks]);

  // const { ref, inView } = useInView({
  //   threshold: 1.0,
  //   root: rootRef.current
  //   // triggerOnce: true,
  // });

  // const  [ref2, inView2]  = useInView({
  //   threshold: 1.0,
  // });

  // console.log(inView)
  // useEffect(() => {
  //   if (inView)
  // }, [inView]);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };
  const callback = (entries: any) => {
    const [entry] = entries;
    // console.log(entry.isIntersecting)
    setIsvisible(entry.isIntersecting);
    //  if (entry.isIntersecting) nextTracks();
  };

  useEffect(() => {
    var observer = new IntersectionObserver(callback, options);
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref.current, options, isVisible]);

  useEffect(() => {
    console.log("useEffect", tracks.length);
    if (isVisible) nextTracks();
  }, [isVisible]);

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
