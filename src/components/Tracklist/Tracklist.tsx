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
import nextTracksRequest from "../../utils/nextTracksRequest";
import useBackendRequest from "../../feautures/api/hooks/useBackendRequest";

type Props = {
  tracks: TrackData[] ;
  nextTracks?: Function
};

const Tracklist = ({ tracks,nextTracks }: Props) => {
  const { setTracklist } = useContext(PlayerContext);
  const {getSelectedPage} = useContext(TracksContext)
  const [splicedTracks, setSplicedTracks] = useState<TrackData[][]>([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [clicked, setClicked] = useState<boolean>(false)
  const [arrIndex, setArrIndex] = useState<number>(0);
  const [nextData, setNextData] = useState<TrackData[]>([])
  const [request] = useNextTracksRequest<ResponseTrackData>();
  const [backendRequest] = useBackendRequest()
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

  

 const showPage = (e: React.MouseEvent<HTMLElement>) => {
   const target = e.target as HTMLDivElement;
 if (nextTracks) nextTracks()

    setClicked(true)
    searchParams.set('page',(+target.id+ 1).toString());
    setSearchParams(searchParams);

    // setArrIndex(+target.id)
 const index = getSelectedPage(+target.id);
  // asyncFunc();
   }

   useEffect(() => {
    console.log(splicedTracks)
  // console.log(nextData)
},[splicedTracks])

// const getNextTracks = async () => {
//   if (nextTracks) {
//     const tracklist = await nextTracksRequest({path: nextTracksUrl, parser: async(res:any) => {const json = res.json();return json},request:backendRequest});
// console.log({tracklist})
//       return tracklist
//     }
// }

  return (
    <div className={classes.container}>
      { splicedTracks[ page-1 > 0?page -1: 0]?.map((item) => (
        <div key={item.id}>
          <Track track={item}  />
        </div>
      ))}
      <div className={classes.flexPages}>
       {splicedTracks.length > 1 ? splicedTracks?.map((item,index) =>  <div className={page - 1 === index || (page === 0 && page === index) ? classes.clickedPage: ''}  key={index} id={index.toString()} onClick={showPage} >{index + 1} </div>  ): null }
      </div>
    </div>
  );
};

export default Tracklist;
