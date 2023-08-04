import { useEffect, useState } from "react";
import classes from './styles.module.scss'
import { type } from "os";

type Props = {
    playlistId:number
}

const DeletePlaylist = ({playlistId}:Props) => {
    const [onClick, setOnClick] = useState<boolean>(false);
    const [checkedPlaylist, setcheckedPlaylist] = useState<number>(0)
    const [className, setClassName] = useState<boolean>(false)

    useEffect(() => {
    const handleClick = (e:Event) => {
    const target = e.target as HTMLButtonElement
    setcheckedPlaylist(+target.id);
   checkedPlaylist === playlistId? setOnClick(!onClick): setOnClick(true);
   target.className.includes('optionButton')? setClassName(true): setClassName(false)
    }
    
    document.addEventListener('click',handleClick);
return () => document.removeEventListener('click',handleClick)
},[onClick,playlistId,checkedPlaylist])
    

    return (
        <div   className={classes.deleteContainer}>
        {onClick && className && checkedPlaylist === playlistId? <div className={classes.delete}>Видалити плейлист</div>: null }
        <div className={classes.deleteButtonContainer} >
        <button id={playlistId.toString()} className={classes.optionButton} >...</button>
        </div>
        </div>
    )
}

export default DeletePlaylist;