
import { TrackData } from "../../types/deezer"
import { useCallback, useContext, useEffect, useState } from "react"
import useFetchUsersPlaylists from "../../feautures/api/hooks/deezer/useFetchUsersPlaylists"
import { authContext } from "../../feautures/auth/authProvider"
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest"
import { parseDeezerTrack } from "../../utils/deezer"
import classes from './styles.module.scss'
import { HttpMethod } from "../../feautures/api/types"

type Props ={
    selectedTrack:number
}

type Playlist = {
    id: number;
    title:string
  }
const LikeButton = ({selectedTrack}:Props) =>{

const [idLikedList, setidLikedList] = useState<number[]>([])
const [idLiked,setIdLiked] = useState<number>(0)
const [booleanClick,setBooleanClick] = useState<boolean>(false)
const [lovedTracks, setLovedTracks] = useState<number>()

const { authKey } = useContext(authContext);
const request = useDeezerRequest();

const playlists:Playlist[] = useFetchUsersPlaylists();

useEffect(() => {
  playlists.map((item)=> item.title == 'Loved Tracks'? setLovedTracks( item.id):0 );
},[playlists])

  // console.log(lovedTracks)


  
  // const handleClick = () => {
   
  //     setIdLiked(selectedTrack); 
  //     const fetchRequest = async () => {
  //       await request(`/playlist/${lovedTracks}/tracks&songs=${selectedTrack}`, idLikedList.includes(selectedTrack) && idLikedList? HttpMethod.DELETE: HttpMethod.POST );
  //     };
  //       fetchRequest(); 
     
  //     }
  
  const handleClick = useCallback( ( ) => {
    setIdLiked(selectedTrack); 
    const fetchRequest = async () => {
      await request(`/playlist/${lovedTracks}/tracks&songs=${selectedTrack}`, idLikedList.includes(selectedTrack) && idLikedList? HttpMethod.DELETE: HttpMethod.POST );
      update()
    };
    fetchRequest(); 

    },[selectedTrack,request,lovedTracks,idLikedList,idLiked,HttpMethod]
 
  ) 
  
   
  const update = async () => {
    const response = await request(`/user/me/tracks`);
    const trackList = await response.json();
 console.log('lovedTracks')
    const parsed:TrackData[] = trackList.data.length >0? trackList.data.map(parseDeezerTrack):[];
    const id = parsed.map((item) => item.id);
console.log('lovedTracks')
    setidLikedList(id);
 
  };
     
      useEffect(() => {
        update() 

      },[])

return(
    <>
   
     <button id={selectedTrack.toString()} onClick={handleClick} className={ idLikedList.includes(+selectedTrack)?classes.isLiked:''}>
          	&#10084;  
            </button>
    </>
)

}
export default LikeButton