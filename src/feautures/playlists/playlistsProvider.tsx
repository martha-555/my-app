/** @format */

import {
  ReactElement,
  createContext,
  useEffect,
  useState,
} from "react";
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
  getInitialTracks: (currentPlaylist: number) => void;
  getNextTracks: (currentPlaylist: number, indexForRequest: number) => void;

  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  removePlaylist: (id: number) => void;
  addToPlaylist: (
    track: number,
    currentPlaylist: number
  ) => Promise<errorResponse | boolean>;
  deleteFromPlaylist: (
    track: TrackData,
    currentPlaylist: number | null
  ) => void;
  trackList: TrackData[] | null;
  isLoading: boolean;
  isLoadingResponse: boolean;
};

export const PlaylistsContext = createContext<PlaylistsType>({
  playlists: [],
  createPlaylist: (name) => {},
  removePlaylist: (id) => {},
  getInitialTracks: async (currentPlaylist) => {},
  getNextTracks: async (currentPlaylist, indexForRequest) => {},

  addToPlaylist: async (track, currentPlaylist) => false,
  deleteFromPlaylist: (track, currentPlaylist) => {},
  trackList: null,
  isLoading: false,
  isLoadingResponse: true,
});

const PlaylistsProvider = (props: { children: ReactElement }) => {
  const [deezerRequest] = useDeezerRequest<Playlist[]>();
  const [actionRequest, state] = useDeezerRequest();
  const [retutnTracks] = useDeezerRequest<TrackData[]>();
  const [returnResponse, isLoadingResponse] = useDeezerRequest<
    errorResponse | boolean
  >();

  const [responseId] = useDeezerRequest<number>();
  const [trackList, setTrackList] = useState<TrackData[] | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [nextTracksURL, setNextTracksURL] = useState<boolean>(false);

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
        playlistsResponse?.filter((item) => item.is_loved_track === false)
      );
    };
    fetchRequest();
  }, [deezerRequest]);

  const fetchRequest = async (
    currentPlaylist: number,
    indexForRequest?: number
  ) => {
    const tracks = await retutnTracks({
      path: `/playlist/${currentPlaylist}/tracks${
        indexForRequest ? `&index=${indexForRequest}` : ""
      }`,
      parser: async (response) => {
        const json = await response.json();
        setNextTracksURL(!!json.next)
        return json?.data?.map(parseDeezerTrack);
      },
    });
    return tracks;
  };

  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        isLoadingResponse: isLoadingResponse.isLoading,
        isLoading: state.isLoading,

        getInitialTracks: (currentPlaylist) => {
    if (trackList) setTrackList(null);

          if (currentPlaylist) {
            const getTracks = async () => {
              const response = await fetchRequest(currentPlaylist);
              setTrackList(response.reverse());
            };
            getTracks();
          }
        },

        getNextTracks: (currentPlaylist, indexForRequest) => {
          if (currentPlaylist && nextTracksURL) {
            const getTracks = async () => {
              const response = await fetchRequest(
                currentPlaylist,
                indexForRequest
              );
              if (trackList)
                setTrackList(connectWithoutDuplicates(trackList, response));
            };
            getTracks();
          }
        },

        trackList,
        addToPlaylist: (track, currentPlaylist) => {
          const request = async () =>
            await returnResponse({
              path: `/playlist/${currentPlaylist}/tracks&songs=${track}`,
              method: HttpMethod.POST,
              parser: async (response) => {
                const code = await response.json();
                return code;
              },
            });
          return request();
        },

        deleteFromPlaylist: (track, currentPlaylist) => {
          if (currentPlaylist) {
            actionRequest({
              path: `/playlist/${currentPlaylist}/tracks&songs=${track.id}`,
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
          const updatePlaylists = playlists.filter(
            (item) => +item.id !== id);
            setPlaylists(updatePlaylists)
        },
      }}
    >
      {props.children}
    </PlaylistsContext.Provider>
  );
};

export default PlaylistsProvider;
