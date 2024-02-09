/** @format */

import { useContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import classes from "./styles.module.scss";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";
import CreatePlaylists from "./CreatePlaylists";
import Tracklist from "../../components/Tracklist/Tracklist";
import Logo  from '../../icons/deleteIcon.png'

const Playlists = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const { playlists, getInitialTracks, getNextTracks, isLoading, trackList, removePlaylist } =
    useContext(PlaylistsContext);
const [clickedDelete, setClickedDelete] = useState<boolean>(false)
  const currentPlaylist = Number(searchParams.get("playlist"));
  const [clickedPlaylist, setClickedPlaylist] = useState<number>();
  

  const handleClickedPlaylist = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const playlistId = target.id;
    setClickedPlaylist(+target.id)
    if (target.className.includes("optionContainer") === false && target.className.includes("isDelete") === false && target.localName !== 'img')
      setSearchParams({ playlist: playlistId });
  };

  useEffect(() => {
    getInitialTracks(currentPlaylist);
  }, [currentPlaylist]);

  const nextTracksRequest = () => {
    if (trackList) getNextTracks(currentPlaylist, trackList.length);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
+(target.id) == clickedPlaylist? setClickedDelete(!clickedDelete): setClickedDelete(true);
  }

  const deletePlaylist = (e:React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    removePlaylist(+target.id)
  }

  return (
    <PageWrapper>
      <CreatePlaylists />
      <div className={classes.playlistsContainer}>
        {isLoading ? <div>Loading...</div> : null}

        {currentPlaylist && trackList ? (
          <Tracklist
            nextTracks={nextTracksRequest}
            emptyState="Цей плейлист пустий"
            tracks={trackList}
          />
        ) : null}
        {!searchParams.get("playlist")
          ? playlists?.map((item) => (
              <div
                id={item.id.toString()}
                className={classes.playlists}
                key={item.id}
                onClick={handleClickedPlaylist}>
                <div id={item.id.toString()}>{item.title}</div>
                {clickedDelete && clickedPlaylist === +item.id? <div id={item.id.toString()} className={classes.isDelete} onClick={deletePlaylist} >Видалити плейлист?</div>: null }
                <div className={classes.optionContainer} id={item.id.toString()} onClick={handleDeleteClick}>  
                <img className={classes.deleteIcon} id={item.id.toString()} src={Logo} alt="" />
                </div>
              </div>
            ))
            : null}
      </div>
    </PageWrapper>
  );
};

export default Playlists;
