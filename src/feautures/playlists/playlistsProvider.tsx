/** @format */

import { ReactElement, createContext, useEffect, useState } from "react";
import { Playlist, TrackData } from "../../types/deezer";
import useDeezerRequest from "../api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../api/types";
import { parseDeezerTrack } from "../../utils/deezer";
import path from "path";

type PlaylistsType = {
  getTracks: (playlistId:number) => any;
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  removePlaylist: (name: string, playlist: Playlist) => void;
  addToPlaylist:( track: TrackData, currentPlaylist:number) => void;
  trackList:TrackData[]
  
};

export const PlaylistsContext = createContext<PlaylistsType>({
  playlists: [],
  createPlaylist: (name) => {},
  removePlaylist: (name, playlist) => {},
  getTracks: (playlistId) => {},
  addToPlaylist: (track, currentPlaylist) => {},
  trackList:[]
});

const PlaylistsProvider = (props:{children: ReactElement}) => {
  const [deezerRequest] = useDeezerRequest<Playlist[]>();
  const [actionRequest,state] = useDeezerRequest()
  const [responseId] = useDeezerRequest<number>()

  const [trackList, setTrackList] = useState<any>([])
  const [playlistsId, setPlaylistsId] = useState<number>(0)
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  // const [playlistId,setPlaylistId] = useState<number>(0)

  useEffect(() => {
    const fetchRequest = async() => {
      const playlistsResponse = await deezerRequest({path: `/user/me/playlists`,parser: async (response) => {const json = await response.json(); return json?.data?.map((item:any) => ({id: item.id, title: item.title, is_loved_track: item.is_loved_track}) )}})
      setPlaylists(playlistsResponse?.filter(item => item.is_loved_track === false));
    }
    fetchRequest();
  },[])


  useEffect(() => {
    // console.log(playlistsId)
    //  if (playlistsId) { const fetchRequest = async () => {
    //       const tracks = await actionRequest({path:`/playlist/${playlistsId}/tracks`,parser: async (response) =>{const json = await response.json(); return json?.data?.map(parseDeezerTrack) } });
          
    //      setTrackList({...trackList,[playlistsId]: tracks});
    //     }
    //     fetchRequest()}
        
  },[playlistsId,trackList])


  return(
    <PlaylistsContext.Provider value={{
      playlists,
   
      getTracks:(currentPlaylist) =>  {
        setPlaylistsId(currentPlaylist)
        const fetchRequest = async () => {
          const tracks = await actionRequest({path:`/playlist/${currentPlaylist}/tracks`,parser: async (response) =>{ const json = await response.json(); return json.next || json?.data?.map(parseDeezerTrack) } });
        setTrackList({...trackList,[currentPlaylist]:tracks });

if (typeof tracks === 'string') {
  const nextTracks = await actionRequest({path: tracks, parser: async (res) => {const allTracks = await res.json(); return allTracks?.data.map(parseDeezerTrack)} });
  console.log(nextTracks)
  return nextTracks;
}

        return tracks
        }
     
        return fetchRequest();
    }, trackList,

    addToPlaylist:(track,currentPlaylist) => {
      actionRequest({path:`/playlist/${currentPlaylist}/tracks&songs=${track.id}`,method:HttpMethod.POST,parser: async () => null});
      const upd:any = [];
      upd[currentPlaylist] ??= []
       upd.push(trackList[currentPlaylist]);
   
    
       
 
       
      // setTrackList({...trackList,...upd[currentPlaylist]})
              },
   

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
        removePlaylist: () => {},
    
      }
    }>
      {props.children}
    </PlaylistsContext.Provider>
  )
};

export default PlaylistsProvider;
