/** @format */

import { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import useDeezerRequest from "../../feautures/api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../../feautures/api/types";


type Props = {
  playlistId: number;
  reFreshPlaylists: Function;
};
//`/user/me/playlists&playlist_id=${target.id}`
const DeletePlaylist = ({ playlistId, reFreshPlaylists }: Props) => {
  const [onClick, setOnClick] = useState<boolean>(false);
  const [checkedPlaylist, setcheckedPlaylist] = useState<number>(0);
  const [className, setClassName] = useState<boolean>(false);
  const [makeRequest] = useDeezerRequest<null>();

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLButtonElement;
      setcheckedPlaylist(+target.id);
      checkedPlaylist === playlistId ? setOnClick(!onClick) : setOnClick(true);
      target.className.includes("optionButton")
        ? setClassName(true)
        : setClassName(false);
      //    request( `/playlist/${encodeURIComponent(playlistId)}&output=jsonp`, HttpMethod.DELETE);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [onClick, playlistId, checkedPlaylist]);

  const deletePlaylist = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    await makeRequest({
      path: `/playlist/${target.id}`,
      method: HttpMethod.DELETE,
      parser: async () => null,
    });
    reFreshPlaylists();
  };
  return (
    <div className={classes.deleteContainer}>
      {onClick && className && checkedPlaylist === playlistId ? (
        <div
          id={playlistId.toString()}
          onClick={deletePlaylist}
          className={classes.delete}
        >
          Видалити плейлист
        </div>
      ) : null}
      <div className={classes.deleteButtonContainer}>
        <button id={playlistId.toString()} className={classes.optionButton}>
          ...
        </button>
      </div>
    </div>
  );
};

export default DeletePlaylist;
