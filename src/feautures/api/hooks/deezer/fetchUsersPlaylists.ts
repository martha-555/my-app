/** @format */

import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../auth/authProvider";
import useDeezerRequest from "./useDeezerRequest";
import { Playlist, TrackData } from "../../../../types/deezer";
import { parseDeezerTrack } from "../../../../utils/deezer";
import { type } from "os";

type Props = {
  request: Function;
  setState: any
}

const fetchUsersPlaylists = ({request,setState}:Props) => {
//fri9guEe6AohBeWqM0rH3jQEN6rz22T9dyAHPT3wpBpQvU3FaV5
//fr0IMSBKXJJnnMQ8EOdcCsmByk6NyDMR3SaP69wnxlx3UGIDCJX
//fr0IMSBKXJJnnMQ8EOdcCsmByk6NyDMR3SaP69wnxlx3UGIDCJX
//frkIG9p0kZd5Q0JoiNxBkvxR37qkMxXq5QbjFxrBwXmiluQL2A8
    const fetchRequest = async () => {
      const response = await request(`/user/me/playlists`);
      const playlistsResponse = await response.json();
      const parsed:Playlist[] = playlistsResponse?.data?.map((item:any) => ({id: item.id, title: item.title, is_loved_track: item.is_loved_track}));
      const withoutLikedTracks = parsed?.filter(item => item.is_loved_track === false)
      setState(withoutLikedTracks);
      // console.log({playlistsResponse})
    };

    fetchRequest();
};
export default fetchUsersPlaylists;