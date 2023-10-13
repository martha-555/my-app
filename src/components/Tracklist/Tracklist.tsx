/** @format */

import { useContext, useEffect, useState } from "react";
import { ResponseTrackData, TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";
import { TracksContext } from "../../feautures/Tracks/TracksProvider";
import { getSplicedTracks } from "../../utils/splicedTracks";
import { useSearchParams } from "react-router-dom";
import useNextTracksRequest from "../../feautures/api/hooks/deezer/useNextTracksRequest";

type Props = {
  tracks: TrackData[] ;
  next?: Function
};

const Tracklist = ({ tracks,next }: Props) => {
  const { setTracklist } = useContext(PlayerContext);
  const {getSelectedPage} = useContext(TracksContext)
  const [splicedTracks, setSplicedTracks] = useState<TrackData[][]>([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [clicked, setClicked] = useState<boolean>(false)
  const [arrIndex, setArrIndex] = useState<number>(0);
  const [nextData, setNextData] = useState<TrackData[]>([])
  const [request] = useNextTracksRequest<ResponseTrackData>()
  const page = Number (searchParams?.get('page'))

  useEffect(() => {
    setTracklist(tracks);
   if (tracks) {
    const copyTracks = [...tracks];
    const spliced = getSplicedTracks(copyTracks);
    setSplicedTracks(spliced);
  }
}, [tracks]);

useEffect(() => {
    if (splicedTracks[page-1]?.length === undefined && splicedTracks?.length > 0 ) {
   page > 0?  searchParams.set('page',(page-1).toString()) :  searchParams.set('page',(page+1).toString());
    }
    setSearchParams(searchParams)
  },[splicedTracks[page-1]?.length])

  
  const asyncFunc = async () => { 
  if (next) {
    const nextList = await next();
     // console.log({nextList});
   setNextData(nextList.data)
   return nextList;
  } 
  
 }

 const showPage = (e: React.MouseEvent<HTMLElement>) => {
    return asyncFunc();
 
    setClicked(true)
    const target = e.target as HTMLDivElement;
    searchParams.set('page',(+target.id+ 1).toString());
    setSearchParams(searchParams);

    // setArrIndex(+target.id)
 const index = getSelectedPage(+target.id)
   }

   useEffect(() => {
  console.log(nextData)
},[nextData])

  return (
    <div className={classes.container}>
      { splicedTracks[ page-1 > 0?page -1: 0]?.map((item) => (
        <div key={item.id}>
          <Track track={item}  />
        </div>
      ))}
      <div className={classes.flexPages}>
       {splicedTracks.length > 1? splicedTracks?.map((item,index) =>  <div className={page - 1 === index || (page === 0 && page === index) ? classes.clickedPage: ''}  key={index} id={index.toString()} onClick={showPage} >{index + 1} </div>  ): null}
      </div>
    </div>
  );
};

export default Tracklist;
