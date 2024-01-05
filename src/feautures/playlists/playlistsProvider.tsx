/** @format */

import { ReactElement, createContext, useEffect, useState } from "react";
import { Playlist, TrackData } from "../../types/deezer";
import useDeezerRequest from "../api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../api/types";
import { parseDeezerTrack } from "../../utils/deezer";
import { useLocation, useSearchParams } from "react-router-dom";
import connectWithoutDuplicates from "../../utils/connectWithoutDuplicates";
import { error } from "console";

type UpdateTracklist = {
  [key: number]: TrackData[];
};
type errorResponse = {
  [key:string]: {
    code: number;
    message: string;
    type: string
  }
}

type PlaylistsType = {
  getTracks: (currentPlaylist: number, indexForRequest?:number) => void;
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  removePlaylist: (name: string, playlist: Playlist) => void;
  addToPlaylist: (track: number, currentPlaylist: number) => Promise<errorResponse | boolean>;
  deleteFromPlaylist: (
    track: TrackData,
    currentPlaylist: number | null
  ) => void;
  trackList: TrackData[];
  isLoading: boolean;
  isLoadingResponse: boolean
};

export const PlaylistsContext = createContext<PlaylistsType>({
  playlists: [],
  createPlaylist: (name) => {},
  removePlaylist: (name, playlist) => {},
  getTracks: async (currentPlaylist,indexForRequest) => [],
  addToPlaylist: async (track, currentPlaylist) => false,
  deleteFromPlaylist: (track, currentPlaylist) => {},
  trackList: [],
  isLoading: false,
  isLoadingResponse: true
  });

const PlaylistsProvider = (props: { children: ReactElement }) => {
  const [deezerRequest] = useDeezerRequest<Playlist[]>();
  const [actionRequest, state] = useDeezerRequest();
  const [retutnTracks] = useDeezerRequest<TrackData[]>();
  const [returnResponse, isLoadingResponse] = useDeezerRequest<errorResponse | boolean>();

  const [responseId] = useDeezerRequest<number>();
  const [trackList, setTrackList] = useState<TrackData[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistsId, setPlaylistsId] = useState<number>(0);
  const [test, settest] = useState<string>("");

  useEffect(() => {
    const fetchRequest = async () => {
      const playlistsResponse = await deezerRequest({
        path: `/user/me/playlists`,
        parser: async (response) => {
          const json = await response.json();
          return json?.data?.map((item: any) => ({
            id: item.id,
            title: item.title,
            is_loved_track: item.is_loved_track,
          }));
        },
      });
      setPlaylists(
        playlistsResponse?.filter(
          (item) => item.is_loved_track === false
        )
      );
    };
    fetchRequest();
  }, []);

  useEffect(() => {
    //     const fetchRequest = async () => {
    //     if (playlistsId) { const tracks = await actionRequest({
    //         path: `/playlist/${playlistsId}/tracks`,
    //         parser: async (response) => {
    //           const json = await response.json();
    //           return json?.data?.map(parseDeezerTrack);
    //         },
    //       })
    //       const upd:any = [];
    //       upd[playlistsId] ??=[];
    //       upd[playlistsId] = (tracks)
    //      setTrackList({ ...trackList, ...upd} );
    // }
    //     };
    //      fetchRequest();
  }, [playlistsId]);
  // console.log({trackList})
 
  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        isLoadingResponse:isLoadingResponse.isLoading,
        isLoading: state.isLoading,
        getTracks: (currentPlaylist,indexForRequest) => {
          if (currentPlaylist) {

            const fetchRequest = async () => {
              const tracks = await retutnTracks({
                path: `/playlist/${currentPlaylist}/tracks${indexForRequest? `&index=${indexForRequest}`: '' }`,
                parser: async (response) => {
                  const json = await response.json();
                  return json?.data?.map(parseDeezerTrack);
                },
              
              });
              // console.log(tracks)
              if (currentPlaylist) {
            
              }
              setTrackList( connectWithoutDuplicates(trackList,tracks) );
              // setTrackList({ ...trackList, [currentPlaylist]: tracks });
              
              
              return tracks;
            };
            
            return fetchRequest();
          }
        },
        
        
        trackList,
        addToPlaylist: (track, currentPlaylist) => {
       const a = async () => await returnResponse({
            path: `/playlist/${currentPlaylist}/tracks&songs=${track}`,
            method: HttpMethod.POST,
            parser: async (response) => {const code = await response.json(); return code},
            
          });
         return a()
        },

        deleteFromPlaylist: (track, currentPlaylist) => {
          if (currentPlaylist) {
            actionRequest({
              path: `/playlist/${currentPlaylist}/tracks&songs=${track.id}`,
              method: HttpMethod.DELETE,
              parser: async () => null,
            });
                if (trackList) {
                 const upd = trackList;
             const updateTracks = trackList.filter((item) => +item.id !== +track.id);
              setTrackList( updateTracks);
                  }
          }
        },
        createPlaylist: (name) => {
          const requestFunction = async () => {
            const response = await responseId({
              path: `/user/me/playlists&title=${name}`,
              parser: async (response) => {
                const id = await response.json();
                return id.id;
              },
              method: HttpMethod.POST,
            });
            const upd: Playlist[] = [];
            upd.push(...playlists, {
              id: response,
              title: name,
              is_loved_track: false,
            });
            setPlaylists(upd);
          };
          requestFunction();
        },
        removePlaylist: () => {},
      }}
    >
      {props.children}
    </PlaylistsContext.Provider>
  );
};

export default PlaylistsProvider;
