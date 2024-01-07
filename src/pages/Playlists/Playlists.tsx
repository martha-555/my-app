/** @format */

import { useContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import classes from "./styles.module.scss";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";
import CreatePlaylists from "./CreatePlaylists";
import Tracklist from "../../components/Tracklist/Tracklist";

const Playlists = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const { playlists, getInitialTracks, getNextTracks, isLoading, trackList } =
    useContext(PlaylistsContext);

  const currentPlaylist = Number(searchParams.get("playlist"));

  const clickedPlaylist = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const playlistId = target.id;
    if (target.className.includes("optionButton") === false)
      setSearchParams({ playlist: playlistId });
  };

  useEffect(() => {
    getInitialTracks(currentPlaylist);
  }, [currentPlaylist]);

  const nextTracksRequest = () => {
    if (trackList) getNextTracks(currentPlaylist, trackList.length);
  };
  useEffect(() => {
    console.log({ trackList });
  }, [trackList]);
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
                onClick={clickedPlaylist}
              >
                <div id={item.id.toString()}>{item.title}</div>
              </div>
            ))
          : null}
      </div>
    </PageWrapper>
  );
};

export default Playlists;
