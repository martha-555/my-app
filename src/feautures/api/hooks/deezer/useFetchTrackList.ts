/** @format */

import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../auth/authProvider";
import useDeezerRequest from "./useDeezerRequest";
import { TrackData } from "../../../../types/deezer";
import { parseDeezerTrack } from "../../../../utils/deezer";

type Props = {
  path: number|string
}
const useFetchTrackList = ({path}:Props) => {
///user/me/tracks
  const { authKey } = useContext(authContext);
  const request = useDeezerRequest();
  const [tracks, setTracks] = useState<TrackData[]>([]);
  useEffect(() => {
    const fetchRequest = async ({path}:Props) => {
      const response = await request(`${path}`);
      const trackList = await response.json();
     trackList.tracks? setTracks( trackList?.tracks?.data?.map(parseDeezerTrack)) : setTracks(trackList?.data?.map(parseDeezerTrack))
    };
    
    fetchRequest({path});
  }, [authKey, request,path]);
  return tracks;
};
export default useFetchTrackList;
