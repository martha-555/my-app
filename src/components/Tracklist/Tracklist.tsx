/** @format */

import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { ResponseTrackData, TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";
import { TracksContext } from "../../feautures/Tracks/TracksProvider";
import { useSearchParams } from "react-router-dom";
import useNextTracksRequest from "../../feautures/api/hooks/deezer/useNextTracksRequest";
import nextTracksRequest from "../../utils/nextTracksRequest";
import useBackendRequest from "../../feautures/api/hooks/useBackendRequest";
import { PagesContext } from "../../feautures/pages/pagesProvider";

type Props = {
  tracks: TrackData[];
  nextTracks?: IntersectionObserverCallback;
  emptyState: ReactNode;
  isLoading?: boolean
};

const Tracklist = ({ tracks, nextTracks, emptyState, isLoading }: Props) => {
const ref = useRef(null)
  const scrollFunc: React.UIEventHandler<HTMLDivElement> = (e) => {
    // console.log('повна висота документа', e.target.scrollHeight);
    // console.log('висота док. мінус прокрутка',e.target.clientHeight)
    // console.log('к-сть пікселів, прокручених від верху', e.target.scrollTop);
    const target = e.target as HTMLDivElement;
    const allHeight = target.scrollHeight;
    const availableHeight = target.clientHeight;
    const scrollTop = target.scrollTop;
    const scrollBottom = allHeight - availableHeight - scrollTop;
    let percent = Math.round(
      Number(((scrollBottom * 100) / allHeight).toFixed(2))
    );
    if (percent <= 2 && nextTracks) {
      // nextTracks();
    }
  };

  
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    const callBack = () => {
      console.log(5);
   
    }
    
    useEffect(() => {
   if (nextTracks)  { const observer = new IntersectionObserver(nextTracks,options);
      if (ref.current) observer.observe(ref.current);
      return () => {
        if(ref.current) observer.unobserve(ref.current);
      }}

  },[ref,options])


  return (
    <div ref={ref} className={classes.tracklistContainer} >
      {tracks?.map((item) => (
        <Track key={item.id} track={item} />
      ))}
      {tracks?.length == 0 && !isLoading? emptyState: null}
    </div>
  );
};

export default Tracklist;
