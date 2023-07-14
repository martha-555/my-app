/** @format */

import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../auth/authProvider";
import useDeezerRequest from "./useDeezerRequest";
import { TrackData } from "../../../../types/deezer";
import { parseDeezerTrack } from "../../../../utils/deezer";

const useFetchUsersPlaylists = () => {

  const { authKey } = useContext(authContext);
  const request = useDeezerRequest();
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    const fetchRequest = async () => {
      const response = await request(`/user/me/playlists`);
      const playlistsResponse = await response.json();
//   console.log(playlistsResponse)
      setPlaylists(playlistsResponse?.data.map((item:any) => ({id: item.id, title: item.title}) ));
    };

    fetchRequest();
  }, [authKey, request]);
  return playlists
};
export default useFetchUsersPlaylists;