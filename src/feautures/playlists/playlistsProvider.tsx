/** @format */

import { ReactElement, createContext, useEffect, useState } from "react";
import { Playlist, TrackData } from "../../types/deezer";
import useDeezerRequest from "../api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../api/types";
import { parseDeezerTrack } from "../../utils/deezer";
import connectWithoutDuplicates from "../../utils/connectWithoutDuplicates";

type errorResponse = {
  [key: string]: {
    code: number;
    message: string;
    type: string;
  };
};

type PlaylistsType = {
  getCurrentPlaylist: (currentPlaylist: number) => void;
  // getNextTracks: (currentPlaylist: number, indexForRequest: number) => void;

  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  removePlaylist: (id: number) => void;
  addToPlaylist: (
    track: TrackData,
    currentPlaylist: number
  ) => Promise<errorResponse | boolean | null>;
  deleteFromPlaylist: (
    track: TrackData,
    currentPlaylist: number | null
  ) => void;
  allTracks: TrackData[] | null;
  isLoading: boolean;
  isLoadingResponse: boolean;
};

export const PlaylistsContext = createContext<PlaylistsType>({
  playlists: [],
  createPlaylist: (name) => {},
  removePlaylist: (id) => {},
  getCurrentPlaylist: async (currentPlaylist) => {},
  // getNextTracks: async (currentPlaylist, indexForRequest) => {},

  addToPlaylist: async (track, currentPlaylist) => false,
  deleteFromPlaylist: (track, currentPlaylist) => {},
  allTracks: null,
  isLoading: false,
  isLoadingResponse: true,
});

const PlaylistsProvider = (props: { children: ReactElement }) => {
  const [deezerRequest] = useDeezerRequest<Playlist[]>();
  const [actionRequest, state] = useDeezerRequest();
  const [retutnTracks, load] = useDeezerRequest<TrackData[]>();
  const [returnResponse, isLoadingResponse] = useDeezerRequest<
    errorResponse | boolean
  >();

  const [responseId] = useDeezerRequest<number>();
  const [trackList, setTrackList] = useState<TrackData[] | null>(null);
  const [allTracks, setAllTracks] = useState<TrackData[] | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<number>(0);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

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
      if (playlistsResponse)
        setPlaylists(
          playlistsResponse?.filter((item) => item.is_loved_track === false)
        );
    };
    fetchRequest();
  }, [deezerRequest]);

  const fetchRequest = async (currentPlaylist: number) => {
    const tracks = await retutnTracks({
      path: `/playlist/${currentPlaylist}/tracks&offset=0&limit=${Number.MAX_SAFE_INTEGER}`,
      parser: async (response) => {
        const json = await response.json();
        console.log(json);
        return json?.data?.map(parseDeezerTrack);
      },
    });

    return tracks;
  };

  useEffect(() => {
    const getNextTracks = () => {
      if (currentPlaylist) {
        const getTracks = async () => {
          const response = await fetchRequest(currentPlaylist);
          trackList && response
            ? setTrackList(connectWithoutDuplicates(trackList, response))
            : setTrackList(response);
        };
        getTracks();
      }
    };
    getNextTracks();
  }, [currentPlaylist]);

  useEffect(() => {
    if (trackList) {
      setAllTracks(trackList.sort((a, b) => b.time_add - a.time_add));
    }
  }, [trackList]);

  useEffect(() => {}, [allTracks]);

  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        isLoadingResponse: isLoadingResponse.isLoading,
        isLoading: state.isLoading,

        getCurrentPlaylist: (currentPlaylist) => {
          if (trackList) setTrackList(null);
          if (currentPlaylist) {
            setCurrentPlaylist(currentPlaylist);
            // const getTracks = async () => {
            //   const response = await fetchRequest(currentPlaylist);
            //   console.log(nextTracksURL)
            //       if (response)  setTrackList(response);
            //       };
            //       getTracks();
          }
        },

        allTracks,
        addToPlaylist: (track, playlistId) => {
          const request = async () =>
            await returnResponse({
              path: `/playlist/${playlistId}/tracks&songs=${track.id}`,
              method: HttpMethod.POST,
              parser: async (response) => {
                const code = await response.json();
                return code;
              },
            });
          if (currentPlaylist == playlistId && allTracks) {
            const addTrack: TrackData[] = allTracks;
            addTrack.unshift(track);
            setAllTracks(addTrack);
          }

          return request();
        },

        deleteFromPlaylist: (track, playlistsId) => {
          if (currentPlaylist) {
            actionRequest({
              path: `/playlist/${playlistsId}/tracks&songs=${track.id}`,
              method: HttpMethod.DELETE,
              parser: async () => null,
            });
            if (trackList) {
              const updateTracks = trackList.filter(
                (item) => +item.id !== +track.id
              );
              setTrackList(updateTracks);
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
            if (response)
              upd.push(...playlists, {
                id: response,
                title: name,
                is_loved_track: false,
              });
            setPlaylists(upd);
          };
          requestFunction();
        },
        removePlaylist: (id) => {
          actionRequest({
            path: `/playlist/${id}`,
            method: HttpMethod.DELETE,
            parser: async () => null,
          });
          const updatePlaylists = playlists.filter((item) => +item.id !== id);
          setPlaylists(updatePlaylists);
        },
      }}
    >
      {props.children}
    </PlaylistsContext.Provider>
  );
};

export default PlaylistsProvider;
