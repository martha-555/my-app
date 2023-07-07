
import { useCallback, useContext, useEffect, useState } from "react"
import useFetchUsersPlaylists from "../../feautures/api/hooks/deezer/useFetchUsersPlaylists"
import { authContext } from "../../feautures/auth/authProvider"
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest"
import classes from './styles.module.scss'
import { HttpMethod } from "../../feautures/api/types"
import { updateLikedTracks } from "../../utils/updateLikedTracks"
import AddTrackToPlaylist from "../AddTrackToPlaylist/AddTrackToPlaylist"
import { useSearchParams } from "react-router-dom"


type Props ={
    selectedTrack:number,
}

type Playlist = {
    id: number;
    title:string
  }
const LikeButton = ({selectedTrack}:Props) =>{
const [idLikedList, setidLikedList] = useState<number[]>([])
const [idLiked,setIdLiked] = useState<number>(0)
const [lovedTracks, setLovedTracks] = useState<number>()
let [searchParams] = useSearchParams();
const { authKey } = useContext(authContext);
const request = useDeezerRequest();
const playlists:Playlist[] = useFetchUsersPlaylists();

useEffect(() => {
  playlists.map((item)=> item.title == 'Loved Tracks'? setLovedTracks( item.id):0 );
},[playlists])

  useEffect(() => {
    updateLikedTracks({updateState:setidLikedList, request});
  },[request])

  const handleClick = useCallback( () => {
    setIdLiked(selectedTrack); 
    const fetchRequest = async () => {
      await request(`/playlist/${lovedTracks}/tracks&songs=${selectedTrack}`, idLikedList.includes(selectedTrack) && idLikedList? HttpMethod.DELETE: HttpMethod.POST );
      updateLikedTracks({updateState:setidLikedList, request})
    };
    fetchRequest(); 

    },[selectedTrack,request,lovedTracks,idLikedList,idLiked,HttpMethod,authKey]
  ) 

return(
    <>
     <button id={selectedTrack.toString()} onClick={handleClick} className={ idLikedList.includes(+selectedTrack)?classes.isLiked:''}>
          	&#10084;  
            </button>
            {searchParams.get("q")?<AddTrackToPlaylist currentTrack={selectedTrack}/>:'' }
    </>
)

}
export default LikeButton