/** @format */

import { useEffect } from "react";
import useDeezerRequest from "./useDeezerRequest";
import { TrackData } from "../../../../types/deezer";
import { parseDeezerTrack } from "../../../../utils/deezer";
import {BackendRequestState} from "../useBackendRequest";

const useFetchFavoriteTracks = (): BackendRequestState<TrackData[]> => {
  const [makeDeezerRequest, state] = useDeezerRequest<TrackData[]>();

  useEffect(() => {
    makeDeezerRequest({path: `/user/me/tracks`, parser: async (response) => {
        const trackList = await response.json();
        return trackList.data.map(parseDeezerTrack);
      }})
  }, [ makeDeezerRequest]);

  return state;
};
export default useFetchFavoriteTracks;
