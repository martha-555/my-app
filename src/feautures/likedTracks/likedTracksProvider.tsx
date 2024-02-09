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
import { LOCAL_STORAGE_AUTH_KEY } from "../auth/constants";
import { authContext } from "../auth/authProvider";
import connectWithoutDuplicates from "../../utils/connectWithoutDuplicates";

type LikedTracksType = {
  favoriteTracks: TrackData[] | null;
  isLoading: boolean;
  addTrack: (id: number, track: TrackData) => void;
  removeTrack: (id: number, track: TrackData) => void;
  getNextTracks: () => void;
};

export const LikedTracksContext = createContext<LikedTracksType>({
  favoriteTracks: null,
  isLoading: false,
  addTrack: (id: number, track: TrackData) => {},
  removeTrack: (id: number, track: TrackData) => {},
  getNextTracks: () => {},
});

const LikedTracksProvider = (props: { children: ReactElement }) => {
  const [favoriteTracks, setFavoriteTracks] = useState<TrackData[] | null>(
    null
  );
  const [favoriteTracksRequest, state] = useDeezerRequest<TrackData[]>();
  const [requestAction, stateAction] = useDeezerRequest();
  const [nextTracksURL, setNextTracksURL] = useState<boolean>(false);
  const [tracksLength, setTracksLength] = useState<number>();
  const { authKey } = useContext(authContext);

  const fetchRequest = async (path: string) => {
    const tracks = await favoriteTracksRequest({
      path: path,
      parser: async (response) => {
        const json = await response.json();
        setNextTracksURL(!!json.next);
        return json.data?.map(parseDeezerTrack);
      },
    });
    return tracks;
  };

  const getOpeningTracks = async () => {
  const tracklist = await fetchRequest(`/user/me/tracks`);
  if (tracklist) setFavoriteTracks(tracklist);
 } 
  useEffect(() => {
    getOpeningTracks();
  }, [authKey]);

  useEffect(() => {
    setTracksLength(favoriteTracks?.length);
  }, [favoriteTracks]);
  return (
    <LikedTracksContext.Provider
      value={{
        favoriteTracks,
        isLoading: state.isLoading,

        addTrack: (id, track) => {
          requestAction({
            path: `/user/me/tracks?track_id=${id}`,
            method: HttpMethod.POST,
            parser: async () => null,
          });
          const upd: TrackData[] = [];
          if (favoriteTracks) upd.push(track,...favoriteTracks);
          setFavoriteTracks(upd);
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
            console.log("delete");
            setFavoriteTracks(upd);
          }
        },

        getNextTracks: () => {
   console.log('next tracks in provider',favoriteTracks?.length)
        if ( nextTracksURL && favoriteTracks) {
        const getTracks = async () => {
         const nextTracks = await fetchRequest(`/user/me/tracks&index=${favoriteTracks.length}`);
         console.log('nextTracks url', nextTracks)
         setFavoriteTracks([...favoriteTracks, ...nextTracks])
        }
        getTracks()
        }  
        }}}
    >
      {props.children}
    </LikedTracksContext.Provider>
  );
};

export default LikedTracksProvider;
