/** @format */

import Track from "../../components/Track";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { TrackData } from "../../types/deezer";
import  {  useEffect,useState } from "react";
import classes from './styles.module.scss'
import LikeButton from "./LikeButton";
import { updateLikedTracks } from "../../utils/updateLikedTracks";


type Props = {
  tracks: TrackData[];
  error: string;
};

// /user/me/playlists&title=namr
const AddTrackToFavorite = ({ tracks, error }: Props) => {
  
const [onClick, setOnClick] = useState<boolean> (false)
const [selectedTrack, setSelectedTrack] = useState(0)
const [idLikedList, setidLikedList] = useState<number[]>([])
const request = useDeezerRequest();
   
    useEffect(() => {
      updateLikedTracks({updateState:setidLikedList, request})
    },[])


const selectPlaylist = (e:any) => {
setOnClick(!onClick)
 setSelectedTrack(e.target.id);
}

  return (
    <div>
      {tracks && tracks.length > 0 ? (
        tracks.map((item) => (
          <Track track={item} key={item.id}> 
          <LikeButton selectedTrack={+item.id} likedList={idLikedList} />
          <button  id={item.id.toString()} onClick={selectPlaylist} >Додати в плейлист</button>
        {+item.id === +selectedTrack   ? <div  id={item.id.toString()} className={  classes.showList } > </div>:null }
          </Track>
        ))
      ) : (
        <div>{error} </div>
      )}
    </div>
  );
};
export default AddTrackToFavorite;
