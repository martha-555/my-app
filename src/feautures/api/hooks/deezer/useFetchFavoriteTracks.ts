/** @format */

import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../auth/authProvider";
import useDeezerRequest from "./useDeezerRequest";
import { TrackData } from "../../../../types/deezer";
import { parseDeezerTrack } from "../../../../utils/deezer";

const useFetchFavoriteTracks = () => {

  const { authKey } = useContext(authContext);
  const request = useDeezerRequest();
  const [tracks, setTracks] = useState<TrackData[]>([]);
  useEffect(() => {
    const fetchRequest = async () => {
      const response = await request(`/user/me/tracks`);
      const trackList = await response.json();
      setTracks(trackList.data.map(parseDeezerTrack));
    };

    fetchRequest();
  }, [authKey, request]);
  return tracks;
};
export default useFetchFavoriteTracks;
