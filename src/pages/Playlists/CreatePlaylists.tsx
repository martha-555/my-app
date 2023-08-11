import { useEffect, useState } from "react";
import fetchUsersPlaylists from "../../feautures/api/hooks/deezer/fetchUsersPlaylists";
import PageWrapper from "../../layout/PageWrapper/PageWrapper"
import createPlaylist from "../../utils/createPlaylist";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { Playlist, TrackData } from "../../types/deezer";
import classes from './styles.module.scss'
import useFetchTrackList from "../../feautures/api/hooks/deezer/useFetchTrackList";
import Tracklist from "../../components/Tracklist/Tracklist";
import { useSearchParams } from "react-router-dom";
import DeletePlaylist from "./DeletePlaylist";
import SearchTracks from "../Search/SearchTracks";

type Props = {
    trackList: TrackData[];
    empty:string
}

const CreatePlaylists = () => {
    const deezerRequest = useDeezerRequest()
    const [empty,setEmpty] = useState<string>('')
    const [name,setName] = useState<string>('')
    const [idNewPlaylist, setIdNewPlaylist] = useState<number>(0)
    const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([])
    const [searchParams, setSearchParams] = useSearchParams({});
    // const [trackList, settracklist] = useState<TrackData[]>([])
    const trackList =  useFetchTrackList({path:`/playlist/${searchParams.get('playlist')}`});
    const request = useDeezerRequest();

    const handleClick =() => {
        createPlaylist({name,setState:setIdNewPlaylist,request:deezerRequest}); 
        setName('')     
}
  
const clickedPlaylist = (e:React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
const playlistId = target.id;
if (target.className.includes('optionButton') === false) setSearchParams( {'playlist': playlistId })
}


useEffect(() => {
    // trackList?.length === 0 && searchParams.get("playlist")? setEmpty("Цей плейлист пустий") : setEmpty('');
},[searchParams,request])

if (idNewPlaylist) setSearchParams({'playlist': idNewPlaylist.toString()});
useEffect(() => {
    fetchUsersPlaylists({request:deezerRequest,setState:setAllPlaylists});
   searchParams.get('playlist') && trackList?.length === 0? setEmpty('Цей плейлист пустий'): setEmpty('');
},[trackList,idNewPlaylist])


// useEffect(() => {
//       const requestFetch = async () => {
//       const response = await request(
//       (`/playlist/${searchParams.get('playlist')}`)
//           );
//           const list = await response.json();
//       list?.tracks?.data?.length === 0 && searchParams.get("playlist")? setEmpty("Цей плейлист пустий") : setEmpty('');
//     settracklist(list?.tracks?.data);
//       };
//       requestFetch()
//   },[searchParams,request])

    return(
        <div className={classes.container}>
            <PageWrapper>
                <div className={(trackList?.length > 0 && searchParams.get('playlist')) || empty ? classes.hide : ''}>
                    <div><input value={name} type="text" onKeyUp={(e) =>{ if (e.key === "Enter") handleClick() }} onInput={(e) => {setName((e.target as HTMLInputElement).value)}} />
<button onClick={handleClick}>create playlist</button><div className={classes.playlistsContainer}>
    { allPlaylists?.map((item) =><div id={item.id.toString()} className={classes.playlists} key={item.id} onClick={clickedPlaylist}><div id={item.id.toString()}>{item.title}</div><DeletePlaylist playlistId={item.id} setState={setAllPlaylists}/> </div> )}
    </div></div> :<div>
 </div>   
   


</div>

<Tracklist tracks={trackList} error={empty}/>
 {/* {empty? <div>{empty} </div>: null } */}
            </PageWrapper>
        </div>
    )
}
export default CreatePlaylists