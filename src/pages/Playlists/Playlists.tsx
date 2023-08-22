/** @format */

import { useContext, useEffect, useState } from "react";
import { Playlist } from "../../types/deezer";
import classes from './styles.module.scss'
import DeletePlaylist from "./DeletePlaylist";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";
import CreatePlaylists from "./CreatePlaylists";
import TracksOptions from "../AddAndDeleteTracksFromPlaylist/TracksOptions";

const Playlists = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const {playlists} = useContext(PlaylistsContext);

  const clickedPlaylist = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const playlistId = target.id;
    if (target.className.includes("optionButton") === false)
      setSearchParams({ playlist: playlistId });
  };

  return (
    <PageWrapper>
      <CreatePlaylists/>
      <div className={classes.playlistsContainer}>
      {playlists?.map((item) => (
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
