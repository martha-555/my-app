/** @format */

import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../auth/authProvider";
import useDeezerRequest from "./useDeezerRequest";
import { Playlist, TrackData } from "../../../../types/deezer";
import { parseDeezerTrack } from "../../../../utils/deezer";

const useFetchUsersPlaylists = () => {

  const { authKey } = useContext(authContext);
  const request = useDeezerRequest();
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  useEffect(() => {
    const fetchRequest = async () => {
      const response = await request(`/user/me/playlists`);
      const playlistsResponse = await response.json();
      const parsed:Playlist[] = playlistsResponse?.data?.map((item:any) => ({id: item.id, title: item.title, is_loved_track: item.is_loved_track}));
      const withoutLikedTracks = parsed?.filter(item => item.is_loved_track === false)
      setPlaylists(withoutLikedTracks);
      // console.log({playlistsResponse})
    };

    fetchRequest();
  }, [authKey, request]);
  return playlists
};
export default useFetchUsersPlaylists;