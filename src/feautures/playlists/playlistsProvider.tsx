/** @format */

import { ReactElement, createContext, useEffect, useState } from "react";
import { Playlist, TrackData } from "../../types/deezer";
import useDeezerRequest from "../api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../api/types";
import { parseDeezerTrack } from "../../utils/deezer";
import { useLocation, useSearchParams } from "react-router-dom";

type UpdateTracklist = {
  [key: number]: TrackData[];
};

type PlaylistsType = {
  getTracks: (currentPlaylist: number) => Promise<TrackData[]>;
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  removePlaylist: (name: string, playlist: Playlist) => void;
  addToPlaylist: (track: TrackData, currentPlaylist: number) => void;
  deleteFromPlaylist: (
    track: TrackData,
    currentPlaylist: number | null
  ) => void;
  trackList: UpdateTracklist;
  isLoading: boolean;
  test: string;
};

export const PlaylistsContext = createContext<PlaylistsType>({
  playlists: [],
  createPlaylist: (name) => {},
  removePlaylist: (name, playlist) => {},
  getTracks: async (currentPlaylist) => [],
  addToPlaylist: (track, currentPlaylist) => {},
  deleteFromPlaylist: (track, currentPlaylist) => {},
  trackList: [],
  isLoading: false,
  test: "",
});

const PlaylistsProvider = (props: { children: ReactElement }) => {
  const [deezerRequest] = useDeezerRequest<Playlist[]>();
  const [actionRequest, state] = useDeezerRequest();
  const [returnResponse] = useDeezerRequest<TrackData[]>();
  const [responseId] = useDeezerRequest<number>();
  const [trackList, setTrackList] = useState<UpdateTracklist>([]);
  const [playlistsId, setPlaylistsId] = useState<number>(0);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
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
          (item) => item.is_loved_track === false && item.id !== playlistsId
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
  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        isLoading: state.isLoading,
        getTracks: (currentPlaylist) => {
          const fetchRequest = async () => {
            const tracks = await returnResponse({
              path: `/playlist/${currentPlaylist}/tracks`,
              parser: async (response) => {
                const json = await response.json();
                return json?.data?.map(parseDeezerTrack);
              },
            });
            if (currentPlaylist)
              setTrackList({ ...trackList, [currentPlaylist]: tracks });

            return tracks;
          };

          return fetchRequest();
        },

        trackList,
        test,
        addToPlaylist: (track, currentPlaylist) => {
          settest("test");
          console.log(trackList);
          // const isInPlaylist = tracks?.find((item) => item.id === track.id);
          actionRequest({
            path: `/playlist/${currentPlaylist}/tracks&songs=${track.id}`,
            method: HttpMethod.POST,
            parser: async () => null,
          });
        },

        deleteFromPlaylist: (track, currentPlaylist) => {
          if (currentPlaylist) {
            actionRequest({
              path: `/playlist/${currentPlaylist}/tracks&songs=${track.id}`,
              method: HttpMethod.DELETE,
              parser: async () => null,
            });

            const upd = trackList[currentPlaylist];
            // let a = [];
            const updateTracks = upd.filter((item) => +item.id !== +track.id);

            setTrackList({ ...trackList, [currentPlaylist]: updateTracks });
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
