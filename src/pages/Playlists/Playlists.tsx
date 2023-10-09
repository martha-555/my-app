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
  const { playlists, getTracks, isLoading, trackList } =
    useContext(PlaylistsContext);
  const [empty, setEmpty] = useState<string>("");
  const currentPlaylist = Number(searchParams.get("playlist"));

  const clickedPlaylist = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const playlistId = target.id;
    if (target.className.includes("optionButton") === false)
      setSearchParams({ playlist: playlistId });
  };

  useEffect(() => {
    const trackslistRequest = async () => {
      const list = await getTracks(currentPlaylist);
      isLoading === false && currentPlaylist && list?.length === 0
        ? setEmpty("Цей плейлист пустий")
        : setEmpty("");
    };
    trackslistRequest();
 
  }, [searchParams, trackList[currentPlaylist]?.length]);

  return (
    <PageWrapper>
      <CreatePlaylists />
      <div className={classes.playlistsContainer}>
        {isLoading ? (
          <div>Loading...</div>
        ) : currentPlaylist ? (
          trackList[currentPlaylist]?.length > 0 && currentPlaylist ? (
            <Tracklist tracks={trackList[currentPlaylist]} />
          ) : (
            <div>{empty} </div>
          )
        ) : (
          playlists?.map((item) => (
            <div
              id={item.id.toString()}
              className={classes.playlists}
              key={item.id}
              onClick={clickedPlaylist}
            >
              <div id={item.id.toString()}>{item.title}</div>
            </div>
          ))
        )}
      </div>
    </PageWrapper>
  );
};

export default Playlists;
