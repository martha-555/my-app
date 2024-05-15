/** @format */

import { useContext, useEffect, useState } from "react";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import createPlaylist from "../../utils/createPlaylist";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { Playlist, TrackData } from "../../types/deezer";
import classes from "./styles.module.scss";
import Tracklist from "../../components/Tracklist/Tracklist";
import { useSearchParams } from "react-router-dom";
import DeletePlaylist from "./DeletePlaylist";
import SearchTracks from "../Search/SearchTracks";
import { HttpMethod } from "../../feautures/api/types";
import { async } from "q";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";

type Props = {
  trackList: TrackData[];
  empty: string;
};

const CreatePlaylists = () => {
  const [name, setName] = useState<string>("");
  const [idNewPlaylist, setIdNewPlaylist] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams({});
  const {createPlaylist} = useContext(PlaylistsContext)


  const handleClick = () => {
   createPlaylist(name);
   setName('')
  };

  // const clickedPlaylist = (e: React.MouseEvent<HTMLElement>) => {
  //   const target = e.target as HTMLDivElement;
  //   const playlistId = target.id;
  //   if (target.className.includes("optionButton") === false)
  //     setSearchParams({ playlist: playlistId });
  // };

  useEffect(() => {
    // trackList?.length === 0 && searchParams.get("playlist")? setEmpty("Цей плейлист пустий") : setEmpty('');
  }, [searchParams]);

  if (idNewPlaylist) setSearchParams({ playlist: idNewPlaylist.toString() });
  //   useEffect(() => {
  //     // fetchUsersPlaylists({ request: deezerRequest, setState: setAllPlaylists });
  //     searchParams.get("playlist") && trackList?.length === 0
  //       ? setEmpty("Цей плейлист пустий")
  //       : setEmpty("");
  //   }, [trackList, idNewPlaylist]);

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

  return (
    <div className={classes.container}>
            <input
            className={classes.createInput}
              value={name}
              type="text"
              placeholder="Playlist name"
              onKeyUp={(e) => {
                if (e.key === "Enter") handleClick();
              }}
              onInput={(e) => {
                setName((e.target as HTMLInputElement).value);
              }}
            />
            <button className={classes.createButton} onClick={handleClick}>Create a new playlist</button>
            <div >
          </div>
    </div>
  );
};
export default CreatePlaylists;
