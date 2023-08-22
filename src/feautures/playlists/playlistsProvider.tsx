/** @format */

import { ReactElement, createContext, useEffect, useState } from "react";
import { Playlist } from "../../types/deezer";
import useDeezerRequest from "../api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../api/types";

type PlaylistsType = {
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  removePlaylist: (name: string, playlist: Playlist) => void;
};

export const PlaylistsContext = createContext<PlaylistsType>({
  playlists: [],
  createPlaylist: (name) => {},
  removePlaylist: (name, playlist) => {},
});

const PlaylistsProvider = (props:{children: ReactElement}) => {
  const [deezerRequest] = useDeezerRequest<Playlist[]>();
  const [deezerRequestAction] = useDeezerRequest()
  const [responseId] = useDeezerRequest<number>()
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [playlistId,setPlaylistId] = useState<number>(0)

  useEffect(() => {
    const fetchRequest = async() => {
      const playlistsResponse = await deezerRequest({path: `/user/me/playlists`,parser: async (response) => {const json = await response.json(); return json?.data?.map((item:any) => ({id: item.id, title: item.title, is_loved_track: item.is_loved_track}) )}})
      setPlaylists(playlistsResponse.filter(item => item.is_loved_track === false));
    }
    fetchRequest()
  },[])

  return(
    <PlaylistsContext.Provider value={{
      playlists,
        createPlaylist: (name) => {
          const requestFunction = async () => {
            const response = await responseId({
                path: `/user/me/playlists&title=${name}`,
                parser: async (response) =>{const id = await response.json();return id.id},
                method: HttpMethod.POST,
              });
              const upd:Playlist[] = [];
          upd.push(...playlists,{id: response, title: name, is_loved_track: false});
          setPlaylists(upd)
          }
          requestFunction()
        
        },
        removePlaylist: () => {}
      }
    }>
      {props.children}
    </PlaylistsContext.Provider>
  )
};

export default PlaylistsProvider;
