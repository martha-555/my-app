/** @format */

import { useContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import Track from "../Track/Track";
import classes from "./styles.module.scss";
import { PlayerContext } from "../../feautures/player/playerProvider";
import { TracksContext } from "../../feautures/Tracks/TracksProvider";

type Props = {
  tracks: TrackData[] ;
};

const Tracklist = ({ tracks }: Props) => {
  const { setTracklist } = useContext(PlayerContext);
  const [page, setPage] = useState<number>(0)
  const {getSelectedPage} = useContext(TracksContext)

  useEffect(() => {
    setTracklist(tracks);
  }, [tracks]);

  const showPage = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
 setPage(+target.id);
 const index = getSelectedPage(+target.id)

   }

  return (
    <div className={classes.container}>
      {tracks?.map((item) => (
        <div key={item.id}>
          <Track track={item}  />
        </div>
      ))}
       {tracks.map((item,index) =>  <div className={page === index? classes.clickedPage: ''} key={index} id={index.toString()} onClick={showPage} >{index + 1} </div>  )}
    </div>
  );
};

export default Tracklist;
