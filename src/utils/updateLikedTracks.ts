import { TrackData } from "../types/deezer";
import { parseDeezerTrack } from "./deezer";

type Props = {
    updateState:React.Dispatch<React.SetStateAction<number[]>>,
    request:Function
}

export const updateLikedTracks =({updateState,request}:Props) => {
    const updateLikedTracks = async () => {
        const response = await request(`/user/me/tracks`);
        const trackList = await response.json();
        const parsed:TrackData[] = trackList.data.length >0? trackList.data.map(parseDeezerTrack):[];
        const id = parsed.map((item) => item.id);
      updateState(id);
      };
updateLikedTracks()
}