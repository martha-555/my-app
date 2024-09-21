/** @format */

import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TrackData } from "../../types/deezer";
import useDeezerRequest from "../api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../api/types";
import { parseDeezerTrack } from "../../utils/deezer";
import { authContext } from "../auth/authProvider";

type errorResponse = {
  [key: string]: {
    code: number;
    message: string;
    type: string;
  };
};

type LikedTracksType = {
  favoriteTracks: TrackData[] | null;
  isLoading: boolean;
  addTrack: (
    id: number,
    track: TrackData
  ) => Promise<errorResponse | boolean | null>;
  removeTrack: (id: number, track: TrackData) => void;
  getNextTracks: () => void;
};

export const LikedTracksContext = createContext<LikedTracksType>({
  favoriteTracks: null,
  isLoading: false,
  addTrack: async (id: number, track: TrackData) => false,
  removeTrack: (id: number, track: TrackData) => {},
  getNextTracks: () => {},
});

const LikedTracksProvider = (props: { children: ReactElement }) => {
  const [favoriteTracks, setFavoriteTracks] = useState<TrackData[] | null>(
    null
  );

  const [favoriteTracksRequest, state] = useDeezerRequest<TrackData[]>();
  const [requestAction, stateAction] = useDeezerRequest();
  const [requestAddAction] = useDeezerRequest<errorResponse | boolean>();

  const [nextTracksURL, setNextTracksURL] = useState<boolean>(false);
  const { authKey } = useContext(authContext);

  const fetchRequest = async (path: string) => {
    const tracks = await favoriteTracksRequest({
      path: path,
      parser: async (response) => {
        const json = await response.json();
        // console.log(json?.error)
        setNextTracksURL(!!json.next);
        return json.data?.map(parseDeezerTrack);
      },
    });
    return tracks;
  };

  const getOpeningTracks = async () => {
    const tracklist = await fetchRequest(
      `/user/me/tracks&offset=0&limit=${Number.MAX_SAFE_INTEGER}&order=time_add`
    );
    if (tracklist) setFavoriteTracks(tracklist);
  };

  useEffect(() => {
    getOpeningTracks();
  }, [authKey]);

  // useEffect(() => {
  //   if (nextTracksURL) {
  //     const getTracks = async () => {
  //       const tracklist = await fetchRequest(
  //         `/user/me/tracks&offset=0&limit=${Number.MAX_SAFE_INTEGER}&order=time_add`
  //       );
  //       const allTracks: TrackData[] = [];
  //       if (initialTracks && tracklist)
  //         allTracks.push(...initialTracks, ...tracklist);
  //       setFavoriteTracks(allTracks);
  //     };
  //     getTracks();
  //   }
  // }, [favoriteTracks?.length]);

  return (
    <LikedTracksContext.Provider
      value={{
        favoriteTracks,
        isLoading: state.isLoading,

        addTrack: (id, track) => {
          const request = async () =>
            await requestAddAction({
              path: `/user/me/tracks?track_id=${id}&order=time_add`,
              method: HttpMethod.POST,
              parser: async (response) => {
                const code = await response.json();
                return code;
              },
            });
          const upd: TrackData[] = [];
          if (favoriteTracks) upd.push(track, ...favoriteTracks);
          setFavoriteTracks(upd);
          return request();
        },

        removeTrack: (id, track) => {
          requestAction({
            path: `/user/me/tracks?track_id=${id}`,
            method: HttpMethod.DELETE,
            parser: async () => null,
          });
          if (favoriteTracks) {
            const upd: TrackData[] = favoriteTracks?.filter(
              (item) => item.id !== track.id
            );
            setFavoriteTracks(upd);
          }
        },

        getNextTracks: () => {
          if (nextTracksURL && favoriteTracks) {
            const getTracks = async () => {
              const nextTracks = await fetchRequest(
                `/user/me/tracks&index=${favoriteTracks.length}`
              );
              console.log("nextTracks url", nextTracks);
              if (nextTracks)
                setFavoriteTracks([...favoriteTracks, ...nextTracks]);
            };
            getTracks();
          }
        },
      }}
    >
      {props.children}
    </LikedTracksContext.Provider>
  );
};

export default LikedTracksProvider;
