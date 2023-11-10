/** @format */

import { useContext, useEffect, useState } from "react";
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
  tracks: TrackData[] ;
  nextTracks?: Function;
  total?: number
};

const Tracklist = ({ tracks,nextTracks, total }: Props) => {
  const { setTracklist } = useContext(PlayerContext);
  const {getSelectedPage} = useContext(TracksContext)
  const [splicedTracks, setSplicedTracks] = useState<TrackData[][]>([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [clicked, setClicked] = useState<boolean>(false)
  const [arrIndex, setArrIndex] = useState<number>(0);
  const [nextData, setNextData] = useState<TrackData[]>([])
  const [request] = useNextTracksRequest<ResponseTrackData>();
  const [backendRequest] = useBackendRequest()
  const [pageList, setPageList] = useState<number[]>([])
  const page = Number (searchParams?.get('page'));
  // const {getPages} = useContext(PagesContext);

  useEffect(() => {
    // console.log({total})
if (total) {
  const ceilPages = Math.ceil(total/25);
const pages = [];
let i = 1;
while(i <= ceilPages) {
  pages.push(i);
  i++
}
setPageList(pages)
}
  },[total])

  useEffect(() => {
    setTracklist(tracks);
   if (tracks) {
    // const copyTracks = [...tracks];
    // const spliced = getPages(tracks)
    // setSplicedTracks(spliced);
  }
}, [tracks]);

// useEffect(() => {
//     if (splicedTracks[page-1]?.length === undefined && splicedTracks?.length > 0 ) {
//    page > 0?  searchParams.set('page',(page).toString()) :  searchParams.set('page',(page+1).toString());
//     }
   
//     setSearchParams(searchParams)
//   },[splicedTracks[page]?.length])

  

//  const showPage = (e: React.MouseEvent<HTMLElement>) => {
//    const target = e.target as HTMLDivElement;
//  if (nextTracks) nextTracks(+target.id);

//     setClicked(true)
//     searchParams.set('page',(+target.id).toString());
//     setSearchParams(searchParams);

//     // setArrIndex(+target.id)
//  const index = getSelectedPage(+target.id);
//   // asyncFunc();
//    }

   useEffect(() => {

},[])

const scrollFunc = (e:any) => {
  // console.log('повна висота документа', e.target.scrollHeight);
  // console.log('висота док. мінус прокрутка',e.target.clientHeight)
  // console.log('к-сть пікселів, прокручених від верху', e.target.scrollTop);
  const allHeight = e.target.scrollHeight;
  const availableHeight = e.target.clientHeight;
  const scrollTop = e.target.scrollTop;
  const scrollBottom = allHeight - availableHeight - scrollTop;
  let percent: number = Math.round(Number(((scrollBottom * 100) / allHeight).toFixed(2)));

  if (percent == 5  && nextTracks ) {
    nextTracks();
    e.target.scrollTo({top:10})
  }
  // console.log(((scrollBottom * 100) / allHeight).toFixed(2) + '%')
}

  return (
    <div className={classes.tracklistContainer} onScroll={scrollFunc}  >
      { tracks?.map((item) => (
        <div key={item.id}>
          <Track track={item}  />
        </div>
      ))}
      {/* <div className={classes.flexPages}>
       {pageList.map((item, index) => <div className={page === index+1 || (page === 0 && page === index) ? classes.clickedPage: ''} key={index} onClick={showPage} id={(index + 1).toString()}>{item} </div> )}
      </div> */}
    </div>
  );
};

export default Tracklist;
