/** @format */

import { useContext, useEffect, useState } from "react";
import { Playlist, TrackData } from "../../types/deezer";
import classes from './styles.module.scss'
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";
import CreatePlaylists from "./CreatePlaylists";
import Tracklist from "../../components/Tracklist/Tracklist";


const Playlists = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const {playlists,getTracks,isLoading} = useContext(PlaylistsContext);
  const [tracks, setTracks] = useState<TrackData[]>([]) 
  const [selectedPlaylist, setSelectedPlaylist] = useState<number>(0);
  const [empty, setEmpty] = useState<string>('')


  const clickedPlaylist = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const playlistId = target.id;
    setSelectedPlaylist(+playlistId)
    if (target.className.includes("optionButton") === false)
      setSearchParams({ playlist: playlistId });
  };

  useEffect(() => {
const trackslistRequest = async () => {
   const list =  await getTracks(searchParams?.get('playlist'));
    setTracks(list);
    if (isLoading === false && searchParams.get('playlist') && tracks?.length === 0) setEmpty('Цей плейлист пустий');
  }
  trackslistRequest()
  },[searchParams])

  const handleClick = (e:Event) => {

  }
  document.addEventListener('click', handleClick);

  return (
    <PageWrapper>
      <CreatePlaylists/>
      <div className={classes.playlistsContainer}>
      {isLoading? <div>Loading...</div>:
      
      searchParams.get('playlist') ? (tracks?.length > 0 && searchParams.get('playlist') ? <Tracklist tracks={tracks} />: <div>{empty} </div>) :playlists?.map((item) => (
        <div
          id={item.id.toString()}
          className={classes.playlists}
          key={item.id}
          onClick={clickedPlaylist}
        >
          <div id={item.id.toString()}>{item.title}
          </div>

        
          {/* <DeletePlaylist
                    playlistId={item.id}
                    setState={setAllPlaylists}
                  />{" "} */}
        </div>
      ))}
      </div>
    </PageWrapper>
  );
};

export default Playlists;
