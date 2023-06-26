/** @format */

import Track from "../../components/Track";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../../feautures/api/types";
import { TrackData } from "../../types/deezer";
import useFetchUsersPlaylists from "../../feautures/api/hooks/deezer/useFetchUsersPlaylists";
import useFetchFavoriteTracks from "../../feautures/api/hooks/deezer/useFetchFavoriteTracks";
import React, { useEffect, useRef, useState } from "react";
import classes from './styles.module.scss'


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
const [selectedTrack, setSelectedTrack] = useState(0)


const playlists:Playlist[] = useFetchUsersPlaylists()

const request = useDeezerRequest();
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>  ) => {
    const fetchRequest = async () => {
      await request(`/playlist/${lovedTracks}/tracks&songs=${(e.target as HTMLButtonElement).id}`, HttpMethod.POST);
    };
    fetchRequest();
  };



useEffect(() => {
 playlists.map((item)=> item.title == 'Loved Tracks'? setLovedTracks(item.id): null)
},[playlists])

const selectPlaylist = (e:any) => {
setOnClick(!onClick)
 setSelectedTrack(e.target.id);

}
console.log(onClick)
  return (
    <div>
      {tracks && tracks.length > 0 ? (
        tracks.map((item) => (
          <Track track={item} key={item.id}>
            <button id={item.id.toString()} onClick={handleClick}>
          	&#10084;
            </button>
          <button  id={item.id.toString()} onClick={selectPlaylist} >Додати в плейлист</button>
          {}
      
          <div  id={item.id.toString()} className={ +item.id === +selectedTrack && onClick  ? classes.showList : classes.hideList} > </div>
       
          </Track>
        ))
      ) : (
        <div>{error} </div>
      )}
     
    </div>
  );
};
export default AddTrackToFavorite;
