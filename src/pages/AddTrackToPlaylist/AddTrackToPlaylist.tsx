import { useCallback, useContext, useEffect, useState } from "react";
import classes from './styles.module.scss'
import { TrackData } from "../../types/deezer";
import { PlayerContext } from "../../feautures/player/playerProvider";

type Props ={
    trackId:any 
}

const AddTrackToPlaylist = ({trackId}:Props) => {
const [isClicked, setIsClicked] = useState<boolean>(false);
const [selectedTrack, setSelectedTrack] = useState<number>(0)





useEffect(() => {
// setSelectedTrack(+trackId)
},[selectedTrack])


useEffect(() => {
    document.addEventListener('click', (e) => {
        setIsClicked(!isClicked)
       const target = (e.target as HTMLButtonElement);
     setSelectedTrack(+target.id); 
//  if (target.localName === 'button') setIsClicked(!isClicked);  
 
})   
},[])



const handleClick =((e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(!isClicked);
})

    return(
        <div>  
            <button   id={trackId}  >Додати в плейлист</button>
          { selectedTrack === trackId && isClicked ? <div>kkkkkkkkk</div>: false } 
        </div>
    )
}
export default AddTrackToPlaylist;