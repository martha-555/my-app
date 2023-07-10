import { useContext, useEffect, useState } from "react";
import classes from './styles.module.scss'
import { TrackData } from "../../types/deezer";
import { PlayerContext } from "../../feautures/player/playerProvider";

type Props ={
    currentTrack:TrackData  
}

const AddTrackToPlaylist = () => {
const [isClicked, setIsClicked] = useState<boolean>(false);
const [selectedTrack, setSelectedTrack] = useState<number>(0)
const {currentTrack} = useContext(PlayerContext)
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
   
        setIsClicked(!isClicked)
    const target = (e.target as HTMLButtonElement);
 setSelectedTrack(+target.id);


}
useEffect(() => {

// console.log(currentTrack?.id === selectedTrack)

},[isClicked,selectedTrack])


    return(
        <div>
            <button id={currentTrack?.id.toString()} onClick={handleClick}>Додати в плейлист</button>
          { currentTrack?.id === selectedTrack? <div>kkkkkkkkk</div>:'' }
         
        </div>
    )
}
export default AddTrackToPlaylist;