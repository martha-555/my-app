/** @format */

import {
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
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
  const ref = useRef(null);

  useEffect(() => {
    setTracklist(tracks);
  }, [tracks]);

  const options = {
    threshold: 1.0,
  };

  useLayoutEffect(() => {
    const callback = (entries: any) => {
      const [entry] = entries;
      if (entry.isIntersecting) nextTracks();
    };

    if (!ref.current) return;

    var observer = new IntersectionObserver(callback);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  useEffect(() => {}, []);

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
