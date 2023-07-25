
import { useCallback, useContext, useEffect, useState } from "react"
import { authContext } from "../../feautures/auth/authProvider"
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest"
import classes from './styles.module.scss'
import { HttpMethod } from "../../feautures/api/types"
import { updateLikedTracks } from "../../utils/updateLikedTracks"


// `/playlist/${lovedTracks}/tracks&songs=${selectedTrack}`
type Props ={
    selectedTrack:number,
}


const LikeButton = ({selectedTrack}:Props) =>{
const [idLikedList, setidLikedList] = useState<number[]>([])
const [idLiked,setIdLiked] = useState<number>(0)

const { authKey } = useContext(authContext);
const request = useDeezerRequest();

  useEffect(() => {
    updateLikedTracks({updateState:setidLikedList, request});
  },[request])

  const handleClick = useCallback( () => {
    setIdLiked(selectedTrack); 
    const fetchRequest = async () => {
      await request(`/user/me/tracks?track_id=${selectedTrack}`, idLikedList.includes(selectedTrack) && idLikedList? HttpMethod.DELETE: HttpMethod.POST );
      updateLikedTracks({updateState:setidLikedList, request})
    };
    fetchRequest(); 

    },[selectedTrack,request,idLikedList,idLiked,HttpMethod,authKey]
  ) 

return(
    <>
     <div  onClick={handleClick} className={ idLikedList?.includes(+selectedTrack)?classes.isLiked:classes.notClicked}>
          	&#10084;  
            </div>      
    </>
)

}
export default LikeButton