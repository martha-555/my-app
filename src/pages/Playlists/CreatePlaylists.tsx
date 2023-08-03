import { useCallback, useEffect, useState } from "react";
import fetchUsersPlaylists from "../../feautures/api/hooks/deezer/fetchUsersPlaylists";
import PageWrapper from "../../layout/PageWrapper/PageWrapper"
import createPlaylist from "../../utils/createPlaylist";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { Playlist, TrackData } from "../../types/deezer";
import classes from './styles.module.scss'
import useFetchTrackList from "../../feautures/api/hooks/deezer/useFetchTrackList";
import Tracklist from "../../components/Tracklist/Tracklist";
import { useSearchParams } from "react-router-dom";

const CreatePlaylists = () => {
    const deezerRequest = useDeezerRequest()
    const [empty,setEmpty] = useState<string>('')
    const [name,setName] = useState<string>('')
    const [idNewPlaylist, setIdNewPlaylist] = useState<number>(0)
    const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([])
    // const [selectedPlaylist, setSelectedPlaylist] = useState<number>(0);
    // const [playlists,setPlaylists] = useState<Playlist[]>([])
    const [tracks, setTracks] = useState<TrackData[]>([]);
    const [searchParams, setSearchParams] = useSearchParams({});
    


    const handleClick =() => {
        createPlaylist({name,setState:setIdNewPlaylist,request:deezerRequest}); 
        
}

    
const clickedPlaylist = (e:React.MouseEvent<HTMLElement>) => {
const playlistId = (e.target as HTMLDivElement).id;
setSearchParams( {'playlist': playlistId })
}

const trackList =  useFetchTrackList({path:`/playlist/${searchParams.get('playlist')}`});

useEffect(() => {
    if (idNewPlaylist) setSearchParams({'playlist': idNewPlaylist.toString()});
},[idNewPlaylist])

useEffect(() => {
    fetchUsersPlaylists({request:deezerRequest,setState:setAllPlaylists});

   searchParams.get('playlist') && trackList?.length === 0? setEmpty('Цей плейлист пустий'): setEmpty('')
},[trackList,idNewPlaylist])
    
    return(
        <div className={classes.container}>
            <PageWrapper>
                <div className={(trackList?.length > 0 && searchParams.get('playlist')) || empty ? classes.hide : ''}>
<input type="text" onChange={(e) => {setName((e.target as HTMLInputElement).value)}} />
<button onClick={handleClick}>create playlist</button>
<div className={classes.playlistsContainer}>
                </div>

    { allPlaylists?.map((item) =><div id={item.id.toString()} className={classes.playlists} key={item.id} onClick={clickedPlaylist}>{item.title} </div> )}
</div>
 {trackList?
 <div>
    
    <Tracklist tracks={trackList} error=""/>
 </div>  : null }
 {/* {searchParams.get('playlist') && trackList.length === 0? <div>Плейлист пустий</div>: null } */}
 {empty? <div>{empty} </div>: null }
            </PageWrapper>
        </div>
    )
}
export default CreatePlaylists