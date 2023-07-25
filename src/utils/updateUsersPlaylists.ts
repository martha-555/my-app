import { Playlist, TrackData } from "../types/deezer";
import { parseDeezerTrack } from "./deezer";

type Props = {
    updateState:React.Dispatch<React.SetStateAction<Playlist[]>>,
    request:Function,
}

export const updateUsersPlaylists =({updateState,request}:Props) => {
    const updatePlaylists = async () => {
        const response = await request(`/user/me/playlists`);
      const playlistsResponse = await response.json();
      const parsed:Playlist[] = playlistsResponse?.data?.map((item:any) => ({id: item.id, title: item.title, is_loved_track: item.is_loved_track}) );
      const withoutLikedTracks = parsed.filter(item => item.is_loved_track === false)
      updateState(withoutLikedTracks);
      };
      updatePlaylists()
}