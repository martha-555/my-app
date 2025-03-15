/** @format */

import { useContext, useState } from "react";
import classes from "./styles.module.scss";
import { PlaylistsContext } from "../../feautures/playlists/playlistsProvider";

const CreatePlaylists = () => {
  const [name, setName] = useState<string>("");
  const { createPlaylist } = useContext(PlaylistsContext);

  const handleClick = () => {
    createPlaylist(name);
    setName("");
  };

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
      <button className={classes.createButton} onClick={handleClick}>
        Create a new playlist
      </button>
      <div></div>
    </div>
  );
};
export default CreatePlaylists;
