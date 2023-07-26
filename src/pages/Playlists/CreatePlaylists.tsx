import { useEffect, useState } from "react";
import useFetchUsersPlaylists from "../../feautures/api/hooks/deezer/useFetchUsersPlaylists"
import PageWrapper from "../../layout/PageWrapper/PageWrapper"
import useCreatePlaylist from "../../feautures/api/hooks/deezer/useCreatePlaylist";
import { updateUsersPlaylists } from "../../utils/updateUsersPlaylists";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { Playlist, TrackData } from "../../types/deezer";
import classes from './styles.module.scss'
import useFetchTrackList from "../../feautures/api/hooks/deezer/useFetchTrackList";
import { parseDeezerTrack } from "../../utils/deezer";
import Tracklist from "../../components/Tracklist/Tracklist";
import { useSearchParams } from "react-router-dom";

const CreatePlaylists = () => {
    const deezerRequest = useDeezerRequest()
    const [create,setCreate] = useState<string>('')
    const [name,setName] = useState<string>('')
    const [selectedPlaylist, setSelectedPlaylist] = useState<number>(0);
    // const [playlists,setPlaylists] = useState<Playlist[]>([])
    const request =  useCreatePlaylist()
    const playlists:Playlist[] = useFetchUsersPlaylists();
    const [tracks, setTracks] = useState<TrackData[]>([]);
    const [searchParams, setSearchParams] = useSearchParams({});

const handleClick = () => {
    console.log(name)
    request(name); 
    // updateUsersPlaylists({updateState: setPlaylists,request: deezerRequest})
}

const clickedPlaylist = (e:React.MouseEvent<HTMLElement>) => {
const playlistId = (e.target as HTMLDivElement).id;
setSelectedPlaylist(+playlistId)
} 
useEffect(() => {
    setSearchParams( {'playlist': selectedPlaylist? selectedPlaylist.toString(): '' })
},[selectedPlaylist])

const trackList = useFetchTrackList({path:`/playlist/${selectedPlaylist}`})

console.log({trackList})

    return(
        <div>
            <PageWrapper>
                <div className={trackList?.length > 0 && searchParams.get('playlist') ? classes.hide : ''}>
<input type="text" onInput={(e) => {setName((e.target as HTMLInputElement).value)}} />
<button onClick={handleClick}>create playlist</button>
<div className={classes.playlistsContainer}>
                </div>

    { playlists?.map((item) =><div id={item.id.toString()} className={classes.playlists} key={item.id} onClick={clickedPlaylist}>{item.title} </div> )}
</div>
 {trackList && searchParams.get('playlist') ?
 <div>
    
    <Tracklist tracks={trackList} error=""/>
 </div>  : null  }
            </PageWrapper>
        </div>
    )
}
export default CreatePlaylists