/** @format */

import { useContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";
import { TracksContext } from "../../feautures/Tracks/TracksProvider";
import { getSplicedTracks } from "../../utils/splicedTracks";
import { useSearchParams } from "react-router-dom";

type Props = {
  tracks: TrackData[] ;
};

const Tracklist = ({ tracks }: Props) => {
  const { setTracklist } = useContext(PlayerContext);
  const [page, setPage] = useState<number>(0)
  const {getSelectedPage} = useContext(TracksContext)
  const [splicedTracks, setSplicedTracks] = useState<TrackData[][]>([])
  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    setTracklist(tracks);
   if (tracks) {
    const copyTracks = [...tracks];
    const spliced = getSplicedTracks(copyTracks);
    setSplicedTracks(spliced);
  }
  }, [tracks]);

  useEffect(() => {
if (splicedTracks[page]?.length === 0) setPage(page - 1)
  },[splicedTracks[page]?.length])

  useEffect(() => {
  //  if (page)  setSearchParams({ page: page.toString()})
  },[page])

  const showPage = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
 setPage(+target.id);
 const index = getSelectedPage(+target.id)
   }
   
  return (
    <div className={classes.container}>
      {(splicedTracks[page]?.length > 0? splicedTracks[page]: splicedTracks[page-1])?.map((item) => (
        <div key={item.id}>
          <Track track={item}  />
        </div>
      ))}
      <div className={classes.flexPages}>
       {splicedTracks.length > 1? splicedTracks?.map((item,index) =>  <div className={page === index? classes.clickedPage: ''}  key={index} id={index.toString()} onClick={showPage} >{index + 1} </div>  ): null}
      </div>
    </div>
  );
};

export default Tracklist;
