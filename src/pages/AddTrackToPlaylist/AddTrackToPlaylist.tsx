import { useCallback, useEffect, useState } from "react";
import useFetchUsersPlaylists from "../../feautures/api/hooks/deezer/useFetchUsersPlaylists";
import { Playlist, TrackData } from "../../types/deezer";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../../feautures/api/types";
import { parseDeezerTrack } from "../../utils/deezer";

type Props ={
    trackId:number 
}

const AddTrackToPlaylist = ({trackId}:Props) => {
const [isClicked, setIsClicked] = useState<boolean>(false);
const [selectedTrack, setSelectedTrack] = useState<number>(0)
const playlists:Playlist[] = useFetchUsersPlaylists();
const [message, setMessage] = useState<string>('')
const [show, setShow] = useState(true)
const [clickedOption, setclickedOption] = useState<boolean>(false)
const [clickedPlaylists, setclickedPlaylists] = useState<boolean>(false);

const playlistsWithoutLiked = playlists?.filter(item => item.is_loved_track === false )
const request = useDeezerRequest();

useEffect(() => {
const handleClick = (e:Event) => {
    const target = (e.target as HTMLButtonElement);
    setSelectedTrack(+target.id); 
    selectedTrack === trackId?  setIsClicked(!isClicked) :setIsClicked(true);
    selectedTrack === trackId? setclickedOption(!clickedOption) : setIsClicked(true)
    
}
  
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

},[isClicked,selectedTrack])

const addSongToPlaylist = useCallback(async (e:React.MouseEvent<HTMLElement>) => {
  setShow(true)
        const target = e.target as HTMLElement;

        const response = await request( `/playlist/${target.id}/tracks`);
        const tracks = await response.json();
        const parsed:TrackData[] = tracks?.data?.map(parseDeezerTrack); 
        const idInPlaylist = parsed.filter(item => item.id === trackId);

       idInPlaylist?.length > 0?  setMessage('Вже є у плейлисті'): await request( `/playlist/${target.id}/tracks&songs=${trackId}`, HttpMethod.POST) &&  setMessage('Трек додано');

       
},[trackId,message,show]) 
useEffect(() => {
    const timeId = setTimeout(() => {
        setShow(false)
      }, 3000)
    
      return () => {
        clearTimeout(timeId)
      }
},[addSongToPlaylist])

    return(
        <div >  
           {show? <div>{message} </div>: null }
           <button id={trackId.toString()} >...</button>
          { selectedTrack === trackId && isClicked?  <div onClick={() => {setclickedPlaylists(!clickedPlaylists)}} id={trackId.toString()}  >Додати в плейлист
          </div>:null }
          
          {  clickedPlaylists  ? <div> {playlistsWithoutLiked.map((item) => 
            <div id={item.id.toString()} onClick={addSongToPlaylist} key={item.id} >{item.title}</div>
           )} </div>: false }
        </div>
    )
}
export default AddTrackToPlaylist;