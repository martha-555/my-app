/** @format */

import Track from "../../components/Track";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../../feautures/api/types";
import { TrackData } from "../../types/deezer";
import useFetchUsersPlaylists from "../../feautures/api/hooks/deezer/useFetchUsersPlaylists";
import useFetchFavoriteTracks from "../../feautures/api/hooks/deezer/useFetchFavoriteTracks";
import React, { useContext, useEffect, useRef, useState } from "react";
import classes from './styles.module.scss'
import { parseDeezerTrack } from "../../utils/deezer";
import { authContext } from "../../feautures/auth/authProvider";


type Playlist = {
  id: number;
  title:string
}

type Props = {
  tracks: TrackData[];
  error: string;
};
//   `/playlist/11185422824/tracks&songs=${e.target.id}`,
// /user/me/playlists&title=namr
const AddTrackToFavorite = ({ tracks, error }: Props) => {
const [lovedTracks, setLovedTracks] = useState<number>()
const [onClick, setOnClick] = useState<boolean> (false)
const [clickLike, setClickLike] = useState<boolean>(false)
const [selectedTrack, setSelectedTrack] = useState(0)
const [idLikedList, setidLikedList] = useState<number[]>([])
const [idLiked,setIdLiked] = useState<number>(0)

const playlists:Playlist[] = useFetchUsersPlaylists()
const { authKey } = useContext(authContext);
const request = useDeezerRequest();


  const handleClick = (e:React.MouseEvent<HTMLButtonElement>  ) => {
    const target = e.target as HTMLButtonElement;
    setIdLiked(+target.id)

    const fetchRequest = async () => {
      await request(`/playlist/${lovedTracks}/tracks&songs=${target.id}`, idLikedList.includes(+target.id)? HttpMethod.DELETE: HttpMethod.POST );
    };
    fetchRequest();
    +target.id === +idLiked? setClickLike(!clickLike): setClickLike(true)
  };

// useEffect(() => {setClickLike(true)},[idLiked])

useEffect(() => {
 playlists.map((item)=> item.title == 'Loved Tracks'? setLovedTracks(item.id): null)
},[playlists])

const selectPlaylist = (e:any) => {
setOnClick(!onClick)
 setSelectedTrack(e.target.id);

}

  useEffect(() => {
    const fetchRequest = async () => {
      const response = await request(`/user/me/tracks`);
      const trackList = await response.json();
      const parsed:TrackData[] = (trackList.data.map(parseDeezerTrack));
      const id = parsed.map((item) => item.id);

      setidLikedList(id)
    };

    fetchRequest();
  }, [authKey, request,idLiked]);

  return (
    <div>
      {tracks && tracks.length > 0 ? (
        tracks.map((item) => (
          <Track track={item} key={item.id}> 

            <button id={item.id.toString()} onClick={handleClick} className={(+idLiked === +item.id && clickLike) || idLikedList.includes(+item.id)  ?classes.isLiked:''}>
          	&#10084;  
            </button>
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
