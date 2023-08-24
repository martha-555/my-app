/** @format */

import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../auth/authProvider";
import useDeezerRequest from "./useDeezerRequest";
import { Playlist, TrackData } from "../../../../types/deezer";
import { parseDeezerTrack } from "../../../../utils/deezer";
import { type } from "os";
import { HttpMethod } from "../../types";

type Props = {
  request: Function;
  setState: any
}

const useAddSongToPlaylist = () => {

  const [request] = useDeezerRequest<TrackData[]>();
  const [requestAction] = useDeezerRequest();

  const [inTracklist, setInTracklist] = useState<TrackData[]>([]);
  const [message, setMessage] = useState<string>("");
  
    const returnTracklist = async (playlistId:number, trackId:number) => {
    const tracksInPlaylist = await request({path:`/playlist/${playlistId}/tracks`,parser: async (response) =>{const json = await response.json();return json.data.map(parseDeezerTrack) } });
    const track = tracksInPlaylist.filter((item) => item.id === trackId)
    setInTracklist(track);
    track?.length > 0
    ? setMessage("Вже є у плейлисті")
    : requestAction({path:`/playlist/${playlistId}/tracks&songs=${trackId}`,method:HttpMethod.POST,parser: async () => null});setMessage("Трек додано");
  }

};
export default useAddSongToPlaylist;