import { useEffect, useState } from "react";
import classes from './styles.module.scss'

type Props ={
    currentTrack:number  
}

const AddTrackToPlaylist = ({currentTrack}:Props) => {
const [isClicked, setIsClicked] = useState<boolean>(false);
const [selectedTrack, setSelectedTrack] = useState<number>(0)

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
   
        setIsClicked(!isClicked)
    const target = (e.target as HTMLButtonElement);
 setSelectedTrack(+target.id);
    console.log(+selectedTrack === +currentTrack)

}
useEffect(() => {


},[isClicked,selectedTrack])


    return(
        <div>
            <button id={currentTrack.toString()} onClick={handleClick}>Додати в плейлист</button>
          { isClicked? <div>kkkkkkkkk</div>:'' }
         
        </div>
    )
}
export default AddTrackToPlaylist;