/** @format */

import { createContext } from "react";
import { Playlist } from "../../types/deezer";
import useDeezerRequest from "../api/hooks/deezer/useDeezerRequest";

type PlaylistsType = {
  playlists: Playlist[];
  createPlaylist: () => void;
  removePlaylist: () => void;
};

export const PlaylistsContext = createContext<PlaylistsType>({
  playlists: [],
  createPlaylist: () => {},
  removePlaylist: () => {},
});

const PlaylistsProvider = () => {
  const [deezerRequest] = useDeezerRequest();
};

export default PlaylistsProvider;
