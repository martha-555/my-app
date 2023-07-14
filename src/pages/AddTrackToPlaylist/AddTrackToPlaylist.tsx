import { useEffect, useState } from "react";
import useFetchUsersPlaylists from "../../feautures/api/hooks/deezer/useFetchUsersPlaylists";
import { Playlist } from "../../types/deezer";


type Props ={
    trackId:any 
}

const AddTrackToPlaylist = ({trackId}:Props) => {
const [isClicked, setIsClicked] = useState<boolean>(false);
const [selectedTrack, setSelectedTrack] = useState<number>(0)
const playlists:Playlist[] = useFetchUsersPlaylists();

useEffect(() => {

const handleClick = (e:Event) => {
    const target = (e.target as HTMLButtonElement);
    selectedTrack === trackId?  setIsClicked(!isClicked):setIsClicked(true);
  setSelectedTrack(+target.id); 
}
  
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

},[isClicked,selectedTrack])

    return(
        <div>  
            <button id={trackId}  >Додати в плейлист</button>
          { selectedTrack === trackId && isClicked ? <div>kkkkkkkkk</div>: false } 
        </div>
    )
}
export default AddTrackToPlaylist;