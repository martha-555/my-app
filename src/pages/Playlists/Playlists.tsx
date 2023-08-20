/** @format */

import { useState } from "react";
import { Playlist } from "../../types/deezer";
import classes from "./styles.module.scss";
import DeletePlaylist from "./DeletePlaylist";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";

const Playlists = () => {
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({});

  const clickedPlaylist = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    const playlistId = target.id;
    if (target.className.includes("optionButton") === false)
      setSearchParams({ playlist: playlistId });
  };

  return (
    <PageWrapper>
      {allPlaylists?.map((item) => (
        <div
          id={item.id.toString()}
          className={classes.playlists}
          key={item.id}
          onClick={clickedPlaylist}
        >
          <div id={item.id.toString()}>{item.title}</div>
          {/* <DeletePlaylist
                    playlistId={item.id}
                    setState={setAllPlaylists}
                  />{" "} */}
        </div>
      ))}
    </PageWrapper>
  );
};

export default Playlists;
