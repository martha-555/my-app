/** @format */

import { useEffect } from "react";
import useDeezerRequest from "./useDeezerRequest";
import { TrackData } from "../../../../types/deezer";
import { parseDeezerTrack } from "../../../../utils/deezer";
import {
  BackendRequestState,
  UseBackendRequestReturn,
} from "../useBackendRequest";

type TrackListId = "me" | string;
type ReturnType = [
  (id: TrackListId) => Promise<TrackData[]>,
  BackendRequestState<TrackData[]>
];

const useFetchTracklist = (): ReturnType => {
  const [makeDeezerRequest, state] = useDeezerRequest<TrackData[]>();

  const makeTracklistRequest = (id: TrackListId) =>
    makeDeezerRequest({
      path: id === "me" ? `/user/me/tracks` : `/playlist/${id}`,

      // path: `/user/me/tracks`,
      parser: async (response) => {
        const trackList = await response.json();
        return trackList.data.map(parseDeezerTrack);
      },
    });

  return [makeTracklistRequest, state];
};
export default useFetchTracklist;
