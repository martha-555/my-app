/** @format */

import { useContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import classes from "./styles.module.scss";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";
import CreatePlaylists from "./CreatePlaylists";
import Tracklist from "../../components/Tracklist/Tracklist";
import { compileFunction } from "vm";

const Playlists = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const { playlists, getTracks, isLoading, trackList } =
    useContext(PlaylistsContext);

  const currentPlaylist = Number(searchParams.get("playlist"));

  const clickedPlaylist = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const playlistId = target.id;
    if (target.className.includes("optionButton") === false)
      setSearchParams({ playlist: playlistId });
  };

  
  useEffect(() => {
    getTracks(currentPlaylist);
  }, [currentPlaylist]);


  const nextTracksRequest = () => {
 if (trackList) getTracks(currentPlaylist,trackList.length)
  }

  return (
    <PageWrapper>
      <CreatePlaylists />
      <div className={classes.playlistsContainer}>
        {isLoading ? 
          <div>Loading...</div> : null
        }
        {currentPlaylist && trackList? <Tracklist
            nextTracks={nextTracksRequest}
              emptyState="Плейлист пустий"
               tracks={trackList}
            />:     playlists?.map((item) => (
                   <div
                     id={item.id.toString()}
                     className={classes.playlists}
                     key={item.id}
                    onClick={clickedPlaylist}
                   >
                    <div id={item.id.toString()}>{item.title}</div>
                  </div>
                 ))}
      </div>
    </PageWrapper>
  );
};

export default Playlists;
