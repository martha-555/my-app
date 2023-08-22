/** @format */

import React, { ReactElement, createContext, useEffect, useState } from "react";
import { TrackData } from "../../types/deezer";
import useDeezerRequest from "../api/hooks/deezer/useDeezerRequest";
import { HttpMethod } from "../api/types";
import { parseDeezerTrack } from "../../utils/deezer";

type LikedTracksType = {
  favoriteTracks: TrackData[];
  isLoading: boolean;
  addTrack: (id: number, track: TrackData) => void;
  removeTrack: (id: number, track: TrackData) => void;
};

export const LikedTracksContext = createContext<LikedTracksType>({
  favoriteTracks: [],
  isLoading: false,
  addTrack: (id: number, track: TrackData) => {},
  removeTrack: (id: number, track: TrackData) => {},
});

const LikedTracksProvider = (props: { children: ReactElement }) => {
  const [favoriteTracks, setFavoriteTracks] = useState<TrackData[]>([]);
  const [favoriteTracksRequest, state] = useDeezerRequest<TrackData[]>();
  const [requestAction, stateAction] = useDeezerRequest();

  useEffect(() => {
    const fetchRequest = async () => {
      const tracks = await favoriteTracksRequest({
        path: `/user/me/tracks`,
        parser: async (response) => {
          const json = await response.json();
          return json.data.map(parseDeezerTrack);
        },
      });
      setFavoriteTracks(tracks);
    };
    fetchRequest();
  }, []);

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
          upd.push(...favoriteTracks, track);
          setFavoriteTracks(upd);
        },

        removeTrack: (id, track) => {
          requestAction({
            path: `/user/me/tracks?track_id=${id}`,
            method: HttpMethod.DELETE,
            parser: async () => null,
          });
          const upd: TrackData[] = favoriteTracks.filter(
            (item) => item.id !== track.id
          );
          setFavoriteTracks(upd);
        },
      }}
    >
      {props.children}
    </LikedTracksContext.Provider>
  );
};

export default LikedTracksProvider;
